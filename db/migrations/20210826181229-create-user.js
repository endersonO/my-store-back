'use strict';

const { USER_TABLE } = require('./../models/user.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(USER_TABLE,  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.DataTypes.INTEGER
    },
    email: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING
    },
    recoveryToken: {
      field: 'recovery_token',
      allowNull: true,
      type: Sequelize.DataTypes.STRING
    },
    role: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
      defaultValue: 'customer'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DataTypes.DATE,
      field: 'create_at',
      defaultValue: Sequelize.NOW
    }
  })

  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);
  }
};
