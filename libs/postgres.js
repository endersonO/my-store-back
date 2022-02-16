const { Client } = require('pg');

async function getConnection() {
  console.log('get connection')
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'end',
    password: 'admin123',
    database: 'my_store',
  });

  await client.connect();
  return client;
}

module.exports = getConnection;
