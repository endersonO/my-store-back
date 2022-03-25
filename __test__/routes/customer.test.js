const app = require('../../app');
const request = require('supertest');

const api = request(app);
const url_base = '/api/v1/';

const { models } = require('../../libs/sequelize');
const bcrypt = require('bcrypt');

beforeAll(async () => {
  await models.Customer.destroy({ where: { }, force: true});
  await models.User.destroy({ where: { }, force: true});
});

describe('Customer Test', ()=> {
  const data = {
    "name": "test1",
    "lastName": "lastNameTest",
    "phone" : '+5841287313690',
    "user" : {
      "password" : "1234567889",
      "email": "subject1@testolco.com"
    }
  }

  const data2 = {
    "name": "test1",
    "lastName": "lastNameTest",
    "phone" : '+58412873130',
    "user" : {
      "password" : "1234567889",
      "email": "subject2@testolco.com"
    }
  }

  let customerId;

  test('Create Customer', async ()=>{
    const res = await api.post(url_base + 'customers/')
      .send(data);

    let dataTest = data;
    delete dataTest.user.password;

    expect(res.statusCode).toBe(201);
    expect(res.body).toStrictEqual({
      "id": expect.any(Number),
      "name": data.name,
      "lastName": data.lastName,
      "phone": data.phone,
      "user":{
        "id": expect.any(Number),
        "email": data.user.email,
        "role": "customer"
      },
      "userId": expect.any(Number)
    })

    customerId = res.body.id;
  });

  test('get all customer', async ()=>{
    await api.post(url_base + 'customers/')
      .send(data2);
    const res = await api.get(url_base+ 'customers/');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toStrictEqual({
      "id": expect.any(Number),
      "userId": expect.any(Number),
      "name": expect.any(String),
      "lastName": expect.any(String),
      "phone": expect.any(String),
      "user": {
        "email" : expect.any(String),
        "id": expect.any(Number),
        "role": "customer"
      }
    });
  })

/*   test('get one customer', async () => {
    const res = await api.get(url_base+ 'customers/' + customerId.toString());


  }) */
})


/* "program": "${workspaceFolder}/index.js"
 */
