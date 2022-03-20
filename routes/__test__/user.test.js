
const app = require('../../app');
const request = require('supertest');

const api = request(app);
const url_base = '/api/v1/';

const { models } = require('../../libs/sequelize');
const bcrypt = require('bcrypt');

async function createData() {
  const password = await bcrypt.hash('admin123456',10);

  models.User.create({
    email: "test@test.com",
    password: password,
    role: "admin"
  });
}

beforeAll(async () => {
  createData();
});

afterAll(async () => {
  models.User.destroy({ where: {} })
});

describe('user test', () => {
  test('consulta get all users', async () => {
    const res = await api.get(url_base + 'users/');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
  });
});
