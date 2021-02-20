import Client from 'utorrent-api';

const utorrent = new Client('localhost', '8100');
utorrent.setCredentials('admin', '123');

test('list task', (cb) => {
  utorrent.call('list', function (err, torrents_list) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(torrents_list);
    cb();
  });
});

test('list file', (cb) => {
  utorrent.call('list', function (err, torrents_list) {
    if (err) {
      console.log(err);
      return;
    }
    const torrent = torrents_list.torrents[0];
    const hash = torrent[0];
    console.log(hash);
    utorrent.call(
      'getfiles',
      {
        hash,
      },
      function (err, result) {
        console.log(JSON.stringify(result));
        cb();
      }
    );
  });
});

test('add magnet', (cb) => {
  utorrent.call(
    'add-url',
    {
      s:
        'magnet:?xt=urn:btih:36f3fa6d42cb279ccf9ed7bf15fef62fc7f5fc36&dn=Monster.Hunter.2020.1080p.AMZN.WEBRip.DDP5.1.x264-NTG&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2800&tr=udp%3A%2F%2F9.rarbg.to%3A2750',
    },
    function (err, data) {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log(data);
        cb();
      }
    }
  );
});
