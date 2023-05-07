const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), err => { 
  if(err) throw err;
  const html = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
  const style = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

  const header = fs.createReadStream(path.join(__dirname, 'components', 'header.html'), 'utf8');
  const articles = fs.createReadStream(path.join(__dirname, 'components', 'articles.html'), 'utf8');
  const footer = fs.createReadStream(path.join(__dirname, 'components', 'footer.html'), 'utf8');
  let template = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf8');

  header.on('data', headerInner => {
    template.on('data', templatInner => {
      const template2 = templatInner.toString().replace(/{{header}}/g, headerInner.toString());
      articles.on('data', articlesInner => {
        const template3 = template2.replace(/{{articles}}/g, articlesInner.toString());
        footer.on('data', footerInner => {
          const template4 = template3.replace(/{{footer}}/g, footerInner.toString());
          html.write(template4);
        })
      })
    })
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