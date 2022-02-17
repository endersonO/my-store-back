const boom = require('@hapi/boom');

//const getConnection = require('../libs/postgres');
const pool = require('../libs/postgres.pool');
const { models } = require('./../libs/sequelize')


class UserServices {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.log(err));
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll();
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('User not found');
    }
    return { user };
    /* const query = 'SELECT * FROM tasks WHERE id = ' + id.toString();
    const rta = await this.pool.query(query);
    if (!rta.rowCount) {
      throw boom.notFound('User not found');
    }
    if (rta.isBlock) {
      throw boom.conflict('User is block');
    }
    return rta.rows; */
  }

  async update(id, changes) {
    const user = await models.User.findByPk(id);
    //const user = await this.findOne(id);
    if(!user){
      throw boom.notFound('User not found');
    }
    const rta = await user.update(changes);
    //const user = await models.User.update(user);
    return { rta };
  }

  async delete(id) {
    const user = await models.User.findByPk(id);
    //const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserServices;
