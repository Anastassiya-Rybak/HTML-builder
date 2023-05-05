const fs = require('fs');
const path = require('path');
const { stdout } = process;
const strim = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf8');

strim.on('data', data => {
  stdout.write(data);
});