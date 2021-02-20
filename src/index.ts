#!/usr/bin/env node
import { program } from 'commander';

import { cat } from './cat/Cat';
program
  .option('-t, --torrent <t>', 'torrent path')
  .option('-d, --dir <d>', 'torrent dir path');
program.parse(process.argv);
const options = program.opts();
if (options.torrent) {
  cat.downloadByFilePath(options.torrent).catch((e) => {
    console.error(e);
  });
} else if (options.dir) {
  cat.downloadByFolder(options.dir).catch((e) => {
    console.error(e);
  });
} else {
  console.log('invalid args');
}
