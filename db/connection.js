const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'refuGio4', 
  database: 'employees',
  port: 5432 
});

module.exports = pool;
