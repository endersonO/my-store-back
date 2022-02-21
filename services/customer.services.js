const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

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
    const newCustomers = await models.Customer.create(data, {
      include: ['user']
    });
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
