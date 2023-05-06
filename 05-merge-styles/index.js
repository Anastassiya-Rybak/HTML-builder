const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, 'project-dist'), (err, distfiles) => {
  if (err) throw err;
  if (distfiles.includes('bundle.css')) {
    fs.rm(path.join(__dirname, 'project-dist', 'bundle.css'), err => {
      if (err) throw err;
      fs.writeFile(
        path.join(__dirname, 'project-dist', 'bundle.css'),
        '',
        err => {
          if (err) throw err;
          fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
            if (err) throw err;
          
            for (let i=0; i < files.length; i++) {
              const {ext} = path.parse(path.join(__dirname, 'styles', files[i]));
              if (ext === '.css') {
                
              }
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
        }
      )      
    })
  } else {
    fs.writeFile(
      path.join(__dirname, 'project-dist', 'bundle.css'),
      '',
      err => {
        if (err) throw err;
        fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
          if (err) throw err;
          for (let i=0; i < files.length; i++) {
            const {ext} = path.parse(path.join(__dirname, 'styles', files[i]));
            if (ext === '.css') {
              const fileInner = fs.createReadStream(path.join(__dirname, 'styles', files[i]), 'utf8');
              fileInner.on('data', data => {
                fs.appendFile(
                  path.join(__dirname, 'project-dist', 'bundle.css'),
                  data,
                  (err) => {
                    if (err) throw err;
                  }
                )
              });  
            }
          }
        })    
      }
    )    
  }
})

