const app = require('../app');
const request = require('supertest');

const api = request(app);

const url_base = '/api/v1/'

describe('Sample Test', () => {
  test('Escribir un test', () => {
    expect(true).toBe(true);
  })
})

describe('return status 200',() => {
  test('consulta api nueva', async () => {
    const res = await api.get('/home');

    expect(res.statusCode).toBe(200);
  })
})
