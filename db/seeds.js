const { exec } = require('child_process');

exec(
  'mongoimport --db 531 --collection templates --file ./db/templates.json --jsonArray',
  (err, stdout, stderr) => {
    if (err) console.log(err);

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  }
);
