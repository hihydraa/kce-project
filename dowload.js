const fs = require('fs');
const https = require('https');

const files = ['index.html', 'script.js', 'style.css'];
const base = 'https://raw.githubusercontent.com/hihydraa/kce-project/main/';

Promise.all(files.map(file => {
  return new Promise((resolve, reject) => {
    https.get(base + file, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        fs.writeFileSync(file, data);
        console.log(`Downloaded ${file}`);
        resolve();
      });
    }).on('error', reject);
  });
})).then(() => console.log('All done.'));
