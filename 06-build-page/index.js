const fs = require('fs');
const path = require('path');

fs.readdir(__dirname, (err, fills) => {
  if (err) throw err;

  if (fills.includes('project-dist')) { fs.rm(path.join(__dirname, 'project-dist'), {recursive:true}, err => {
    if (err) throw err;
    fs.mkdir(path.join(__dirname, 'project-dist'), err => {
      if(err) throw err;
      const html = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
      const style = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
    
      let template = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf8');
    
      fs.readdir(path.join(__dirname, 'components'), (err, components) => {
        if (err) throw err;

        let templateDubl = '';

        components.forEach(component => {
          const readComponent = fs.createReadStream(path.join(__dirname, 'components', component), 'utf8');
          const regStrComponent = `{{${component.slice(0, -5)}}}`;
          const regComponent = new RegExp(regStrComponent, 'g');

          template.on('data', templateInner => {
            templateDubl = templateInner.toString();

            readComponent.on('data', readComponentInner => {
              templateDubl = templateDubl.replace(regComponent, readComponentInner.toString());
              if (component === components[components.length-1]) {
                html.write(templateDubl);
              }

            })
          })
        });
      })
    
      fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
        if (err) throw err;
        for (let i=0; i < files.length; i++) {
          const fileInner = fs.createReadStream(path.join(__dirname, 'styles', files[i]), 'utf8');
          fileInner.on('data', data => {
            style.write(data);
          });  
        }
      })    
    
      fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), err => {
        if (err) throw err;
    
        fs.readdir(path.join(__dirname, 'assets'), (err, files) => {
          if (err) throw err;
    
          for (let i=0; i < files.length; i++) {
            fs.mkdir(path.join(__dirname, 'project-dist', 'assets', files[i]), err => {if (err) throw err;});
    
            fs.readdir(path.join(__dirname, 'assets', files[i]), (err, items) => {
              if (err) throw err;
              for (let idx = 0; idx < items.length; idx++){
                fs.copyFile(
                  path.join(__dirname, 'assets', files[i], items[idx]),
                  path.join(__dirname, 'project-dist', 'assets', files[i], items[idx]),
                  err => {if (err) throw err;}
                );
              }
            })
          }
        })
      })  
    })
  }) } else {
    fs.mkdir(path.join(__dirname, 'project-dist'), err => { 
      if(err) throw err;
      const html = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
      const style = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
    
      let template = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf8');
    
      fs.readdir(path.join(__dirname, 'components'), (err, components) => {
        if (err) throw err;

        let templateDubl = '';

        components.forEach(component => {
          const readComponent = fs.createReadStream(path.join(__dirname, 'components', component), 'utf8');
          const regStrComponent = `{{${component.slice(0, -5)}}}`;
          const regComponent = new RegExp(regStrComponent, 'g');

          template.on('data', templateInner => {
            templateDubl = templateInner.toString();

            readComponent.on('data', readComponentInner => {
              templateDubl = templateDubl.replace(regComponent, readComponentInner.toString());
              if (component === components[components.length-1]) {
                html.write(templateDubl);
              }

            })
          })
        });
      })
    
      fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
        if (err) throw err;
        for (let i=0; i < files.length; i++) {
          const fileInner = fs.createReadStream(path.join(__dirname, 'styles', files[i]), 'utf8');
          fileInner.on('data', data => {
            style.write(data);
          });  
        }
      })    
    
      fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), err => {
        if (err) throw err;
    
        fs.readdir(path.join(__dirname, 'assets'), (err, files) => {
          if (err) throw err;
    
          for (let i=0; i < files.length; i++) {
            fs.mkdir(path.join(__dirname, 'project-dist', 'assets', files[i]), err => {if (err) throw err;});
    
            fs.readdir(path.join(__dirname, 'assets', files[i]), (err, items) => {
              if (err) throw err;
              for (let idx = 0; idx < items.length; idx++){
                fs.copyFile(
                  path.join(__dirname, 'assets', files[i], items[idx]),
                  path.join(__dirname, 'project-dist', 'assets', files[i], items[idx]),
                  err => {if (err) throw err;}
                );
              }
            })
          }
        })
      })
    })
  }
})