import { cat } from './Cat';

test('download by scan folder', async function () {
  await cat.downloadByFolder('data/torrent');
});

test('download by scan file', async function () {
  await cat.downloadByFilePath(
    'data/torrent/Blithe.Spirit.2020.1080p.WEB-DL.DD5.1.H264-FGT-[rarbg.to].torrent'
  );
});
