const boom = require('@hapi/boom')

const { models } = require('../libs/sequelize')

class OrderService {
  constructor() {}

  async find() {
    const Orders = await models.Order.findAll();
    return Orders
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async findOne(id){
    const order = await models.Order.findByPk(id, {
      include: [{
        association:'customer',
        include: ['user']
      }]
    });
    return order
  }
}

module.exports = OrderService
