const { account } = require('pg');

const account = new account({
  host: 'localhost',
  user: 'postgres',
  password: 'refuGio4', 
  database: 'infoWorker',
  port: 5432 
});

module.exports = account;
