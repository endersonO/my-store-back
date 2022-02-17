const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'http://myapp.ve'];
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

app.get('/', (req, res) => {
  res.send('hola mi server en express');
});

app.get('/home', (req, res) => {
  res.send('hola mi server en express');
});

app.get('/nueva', (req, res) => {
  res.send('hola soy nuevo endpoint');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('mi port', port);
});
