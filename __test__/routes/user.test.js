
const app = require('../../app');
const request = require('supertest');

const api = request(app);
const url_base = '/api/v1/';

const { models } = require('../../libs/sequelize');
const bcrypt = require('bcrypt');

async function createData() {
  const password = await bcrypt.hash('admin123456',10);

  await models.User.create({
    email: "testing@test.com",
    password: password,
    role: "admin"
  });
}

beforeAll(async () => {
  await models.User.destroy({ where: { }, force: true})
  await createData();
});

afterAll(async () => {
  console.log("despues de todo")
});

describe('user test', () => {
  let userId;
  const data = {
    "email": "test2@test.com",
    "password": "passwordSuperSecurity123",
    "role": "customer"
  }
  const dataUpdate = {
    "email": "test3@test.com",
    "role": "admin"
  }
  test('Create New User', async () => {
    const res = await api
      .post(url_base + 'users/')
      .send(data);

    expect(res.statusCode).toBe(201);
    expect(res.body).toStrictEqual({
      "email": data.email,
      "role": data.role,
      "id": expect.any(Number)
    });

    userId = res.body.id;
  })

  test('get User by Id', async () => {
    const res = await api.get(url_base + 'users/' + userId.toString())

    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({
      "email": data.email,
      "role": data.role,
      "id": userId
    });
  });

  test('get all users', async () => {
    const res = await api.get(url_base + 'users/');

    //console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toStrictEqual({
      "email": data.email,
      "role": data.role,
      "id": userId,
      "customer": null
    });
  });

  test('update user field', async () => {
    const res = await api.patch(url_base + 'users/' + userId.toString())
      .send(dataUpdate);

    console.log(res.statusCode)
    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({
      "email": dataUpdate.email,
      "role": dataUpdate.role,
      "id": userId
    });
  })

  test('User delete', async() => {
    const res = await api.delete(url_base + 'users/' + userId.toString());

    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({"id": userId.toString()});

    const res2 = await api.get(url_base + 'users/');

    expect(res2.statusCode).toBe(200);
    expect(res2.body).toHaveLength(1);
  })
});
