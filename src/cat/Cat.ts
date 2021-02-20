import * as path from 'path';

import globby from 'globby';
import normalize from 'normalize-path';

import { torrentClient } from '../lib/torrent/TorrentClient';
import { TorrentParser } from '../lib/torrent/TorrentParser';
import { tracker } from '../lib/tracker/Tracker';


const resolveCwd = (dir) => normalize(path.resolve(process.cwd(), dir));

class Cat {
  async downloadByFilePath(dir: string) {
    await tracker.init();
    const absDir = resolveCwd(dir);
    await this.downloadByAbsDir(absDir);
  }

  async downloadByFolder(folder: string) {
    await tracker.init();
    const absFolder = resolveCwd(folder);
    const paths = await globby(absFolder, {
      expandDirectories: {
        extensions: ['torrent'],
      },
    });
    for (const dir of paths) {
      await this.downloadByAbsDir(dir);
    }
  }

  private async downloadByTorrent(torrent: TorrentParser) {
    const buffer = torrent.buffer;
    await torrentClient.download(buffer);
    console.log(`add ${torrent.info.name}`);
  }

  private async downloadByAbsDir(dir: string) {
    const torrent = TorrentParser.createByFile(dir);
    await this.downloadByTorrent(torrent);
  }
}

export const cat = new Cat();
