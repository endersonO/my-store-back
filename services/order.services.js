const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}

  async find() {
    const Orders = await models.Order.findAll({
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    return Orders;
  }

  async create(data) {
    const customer = await models.Customer.findOne({
      where: {
        '$user.id$': data.sub
      },
      include: ['user']
    });
    const newOrder =  await models.Order.create({customerId: customer.id});
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }
  async orderOwner(data){
    const customer = await models.Customer.findOne({
      where: {
        '$user.id$': data.user.sub
      },
      include: ['user']
    });
    const order = await models.Customer.findByPk(5);
    if(customer.dataValues.userId !== order.dataValues.userId){
      throw boom.unauthorized('User is not owner')
    }
    return
  }


  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
      ],
    });
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    return order;
  }
}

module.exports = OrderService;
