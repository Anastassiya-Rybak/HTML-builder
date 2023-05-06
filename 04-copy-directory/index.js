const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), err => {
  if (err) throw err;

  fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    if (err) throw err;

    for (let i=0; i < files.length; i++) {
      const {base} = path.parse(path.join(__dirname, 'files', files[i]));
      const fileInner = fs.createReadStream(path.join(__dirname, 'files', files[i]), 'utf8');

      fs.writeFile(
        path.join(__dirname, 'files-copy', base),
        '',
        (err) => {
          if (err) throw err;
          fileInner.on('data', data => {
            fs.appendFile(
              path.join(__dirname, 'files-copy', base),
              data.toString(),
              (err) => {
                if (err) throw err;
              }
            );
          });
        }
      );
    }
  })
})