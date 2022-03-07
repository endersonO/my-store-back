const boom = require('@hapi/boom')
const { models } = require('./../libs/sequelize')

class CategoriesServices {
  constructor() {}

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }


  async find() {
    const categories = await models.Category.findAll();
    return categories
  }

  async findOne(id){
    const category = await models.Category.findByPk(id,{
      include: ['products']
    });
    if (!category) {
      throw boom.notFound('Customer not found');
    }
    return category
  }

  async update(id, changes) {
    const category = await models.Category.findByPk(id);
    if(!category){
      throw boom.notFound('User not found');
    }
    return await category.update(changes)
  }

  async delete(id){
    const category = await models.Category.findByPk(id);
    category.destroy()
    return { id }
  }
}

module.exports = CategoriesServices
