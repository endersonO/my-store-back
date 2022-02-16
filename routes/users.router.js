const UserServices = require('./../services/user.services');
const express = require('express');
const validatorHandler = require('./../middlewares/validator.handler');

const router = express.Router();
const service = new UserServices();
const { createUserSchema, getUserSchema,updateUserSchema  } = require('../schemas/users.schema');

router.get('/', async (req, res, next) => {
  console.log('users find')
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    console.log('find user unique')
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    console.log('crear user')
    try {
      const body = req.body;
      const newUser = await service.create(body)
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  //validatorHandler(getUserSchema, 'params'),
  //validatorHandler(updateUserSchema, 'params'),
  async (req, res, next) => {
    console.log('actualizar')
    try {
      const { id } = req.params;
      const body = req.body;
      console.log('id:',id,' cuerpo:',body)
      const updateUser = await service.update(id,body);
      res.json(updateUser);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.delete(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
