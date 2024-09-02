const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'team_members',
  password: 'refuGio4',
  port: 5432,
});

module.exports = pool;
