import Client from 'utorrent-api';

class TorrentClient {
  utorrent: any;
  constructor() {
    this.utorrent = new Client('localhost', '8100');
    this.utorrent.setCredentials('admin', '123');
  }
  download(buffer: Buffer) {
    return new Promise((resolve, reject) => {
      this.utorrent.call(
        'add-file',
        { torrent_file: buffer, download_dir: 1 },
        function (err, data) {
          if (err) {
            console.log('error : ');
            console.log(err);
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }
}

export const torrentClient = new TorrentClient();
