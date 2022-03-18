const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API Store demo',
    description: 'Building a demo store portfolio',
    contact: {
      name: 'Enderson Omana',
      email: 'omana.endersonj@gmail.com',
    },
  },
  host: 'localhost:3000',
  schemes: ['http'],
  basePath: '/api/v1',
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      in: 'header', // can be "header", "query" or "cookie"
      name: 'Authorization', // name of the header, query parameter or cookie
      description: 'Please enter a valid token to test the requests below...',
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = './routes/index.js';

swaggerAutogen(outputFile, [endpointsFiles], doc).then(async () => {
  await require(endpointsFiles); // Your project's root file
});
