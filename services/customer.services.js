const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt')

class CustomerServices {
  constructor() {}

  async find() {
    const customers = await models.Customer.findAll({
      include: [{
        model:models.User,
        as:'user',
        attributes: {exclude: ['createdAt', 'password', 'recoveryToken']}
      }],
      attributes: {exclude: ['createdAt']},
      order: [['id','DESC']]
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
    delete newCustomers.dataValues.user.dataValues.recoveryToken;
    delete newCustomers.dataValues.user.dataValues.createdAt;
    delete newCustomers.dataValues.createdAt;
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
