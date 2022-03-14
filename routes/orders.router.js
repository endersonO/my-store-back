const express = require('express');
const passport = require('passport');

const OrderService = require('./../services/order.services');
const validatorHandler = require('../middlewares/validator.handler');
const { getOrderSchema, createOrderSchema, addItemSchema } = require('./../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.get('/',
  async (req, res, next) => {
    try{
      const orders = await service.find();
      res.json(orders)
    } catch (error) {
      next(error)
    }
  }
)

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try{
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/add-item',
  // validatorHandler(addItemSchema, 'body'),
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const body = req.body;
      await service.orderOwner(req);
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
})

router.post('/',
  //validatorHandler(createOrderSchema, 'body'),
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user
      const newOrder = await service.create(user);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
})

module.exports = router
