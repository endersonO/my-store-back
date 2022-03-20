require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.NODE_ENV === 'test' ? process.env.DB_NAME_TEST : process.env.DB_NAME,
  dbPort: process.env.NODE_ENV === 'test' ? process.env.DB_PORT_TEST : process.env.DB_PORT,
  dbUrl: process.env.DATABASE_URL,
  dbUrlTest: process.env.DATABASE_URL_TEST,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  smtpMail: process.env.SMTP_EMAIL,
  smtpPassword: process.env.SMTP_PASSWORD
};

module.exports = { config };
