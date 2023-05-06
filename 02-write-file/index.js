const { stdout, stdin } = process;
const path = require('path');
const fs = require('fs');

fs.writeFile(path.join(__dirname, 'text.txt'), '', () => {
  stdout.write('Приветствую Вас! Пожалуйста, введите Ваше имя ->   ');

  stdin.on('data', (data) => {
    fs.appendFile(
      path.join(__dirname, 'text.txt'),
      data.toString(),
      (err) => {
        if (err) throw err;
      }
    );
  })
});

process.on('SIGINT', ()=>{
  stdout.write('Благодарю за предоставленную информацию!');
  process.exit(0);
})
