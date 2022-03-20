const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const { checkApiKey } = require('./middlewares/auth.handler');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger-output.json');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler
} = require('./middlewares/error.handler');

const app = express();

app.use(express.json());

const whitelist = ['http://localhost:8080', 'http://myapp.ve', 'http://localhost:3000'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};
app.use(cors(options));

require('./utils/auth');
app.use('/v1/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs,{ swaggerOptions: { persistAuthorization: true } })
);

app.get('/', (req, res) => {
  res.send('hola mi server en express');
});

app.get('/home', (req, res) => {
  res.send('hola mi server en express');
});

app.get('/nueva', checkApiKey, (req, res) => {
  res.send('hola soy nuevo endpoint');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app
