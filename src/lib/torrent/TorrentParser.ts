import * as fs from 'fs';

import parseTorrent from 'parse-torrent';

import { tracker } from '../tracker/Tracker';

type Info = parseTorrent.Instance;
export class TorrentParser {
  info: Info;
  buffer: Buffer;

  static createByFile(dir: string) {
    const buffer = fs.readFileSync(dir);
    const info = parseTorrent(buffer) as Info;
    const torrent = new TorrentParser(info);
    torrent.process();
    return torrent;
  }

  constructor(info: Info) {
    this.info = info;
  }

  process() {
    this.appendTracker();
    this.buffer = parseTorrent.toTorrentFile(this.info);
  }

  private appendTracker() {
    const trackerList = tracker.getList();
    this.info.announce = [...this.info.announce, ...trackerList];
  }
}
