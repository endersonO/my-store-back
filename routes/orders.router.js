const express = require('express');

const OrderService = require('./../services/order.services')
const validatorHandler = require('../middlewares/validator.handler')
const { getOrderSchema, createOrderSchema } = require('./../schemas/order.schema')

const router = express.Router();
const service = new OrderService

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

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
})

module.exports = router