const fs = require('fs');
const path = require('path');

fs.readdir(__dirname, (err, files) => {
  if (err) throw err;
  if (files.includes('files-copy')) {
    fs.rm(path.join(__dirname, 'files-copy'), { recursive:true }, err => { 
      if(err) throw err;
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
    });

  } else {
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
  }
})