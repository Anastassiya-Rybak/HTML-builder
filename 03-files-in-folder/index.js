const path = require('path');
const fs = require('fs');

const {stdout} = process;

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  if (err) throw err;

  for (let i=0; i<files.length; i++) {
    fs.stat(path.join(__dirname, 'secret-folder', files[i]), (err, stats) => {
      if (err) throw err;
      if (stats.isFile()){
        const {name, ext} = path.parse(path.join(__dirname, files[i]));
        stdout.write(`${name} - ${ext.substring(1)} - ${stats['size']}\n`);
      }
    });
}});
