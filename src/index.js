const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const app = require('express')();
const initDatabase = require('./config/database');

require('./config/express')(app);
require('./config/routes')(app);

initDatabase(config.DB_CONNECTION_STRING)
  .then(() => {
    app.listen(config.port, () =>
      console.log(`Listening on port http://localhost:${config.port}! Now its up to you...`));
  })
  .catch(err => {
    console.log('Application init failed: ', err);
  });
