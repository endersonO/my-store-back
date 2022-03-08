const { Pool } = require('pg');

const { config } = require('./../config/config');

let URI = '';
const options = {
  connectionString: URI
}

if (config.isProd) {
  options.connectionString = config.dbUrl;
  options.ssl = {rejectUnauthorized : false}
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  URI = `postgress://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
  options.connectionString = config.URI;
}

const pool = new Pool(options);

module.exports = pool;
