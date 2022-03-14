const boom = require('@hapi/boom')
const { models } = require('./../libs/sequelize')
const { Op } = require('sequelize')

class ProductServices {
  constructor() {
/*     this.products = [];
    this.generate(); */
  }

  /* async generate() {
    let limit = 100;

    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  } */

  async create(data) {
    const newProducts = await models.Product.create(data);
    return newProducts;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }
    const { limit, offset } = query;
    if(limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;
    if(price){
      options.where.price = price;
    }

    const { price_max, price_min } = query;
    if(price_min && price_max){
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      }
    }

    const products = await models.Product.findAll(options);
    console.log(products)
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    console.log(product)
    if (!product) {
      throw boom.notFound('Customer not found');
    }
    return product;
  }

  async update(id, changes) {
    /* const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw boom.notFound('product not found');
    }

    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index]; */
    const product = models.Product.findOne(id);
    const update = product.update(changes);
    return update;
  }

  async delete(id) {
    /* const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id }; */
  }
}

module.exports = ProductServices;
