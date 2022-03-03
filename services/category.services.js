const boom = require('@hapi/boom');
//const { models } = require('../libs/postgres');

class CategoriesServices {
  constructor() {}

  async create(data){
    return data
  }

  async find() {
    //const categories = await models.Category.findAll();
    //return categories
    return []
  }

  async findOne(id){
    return { id }
  }

  async update(id, changes) {
    return { id, changes }
  }

  async delete(id){
    return { id }
  }
}

module.exports = CategoriesServices
