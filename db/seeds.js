const { Template } = require('./models/template');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/531');

const templates = require('./templates.json');

const promises = templates.map(template =>
  new Template(template)
    .save()
    .then(() => console.log('success'))
    .catch(err => {
      // duplicate key
      if (err.code !== 11000) {
        throw err;
      }
    })
);

Promise.all(promises)
  .then(() => mongoose.connection.close())
  .catch(err => console.log(err));
