const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt')

class CustomerServices {
  constructor() {}

  async find() {
    const customers = await models.Customer.findAll({
      include: ['user']
    });
    return customers;
  }

  async findOne(id) {
    const customers = await models.Customer.findByPk(id);
    if (!customers) {
      throw boom.notFound('Customer not found');
    }
    return customers;
  }

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10)
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    }
    const newCustomers = await models.Customer.create(newData, {
      include: ['user']
    });
    delete newCustomers.dataValues.user.dataValues.password;
    return newCustomers;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }
}

module.exports = CustomerServices;
