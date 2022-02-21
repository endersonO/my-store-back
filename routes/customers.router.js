const CustomerServices = require('../services/customer.services');
const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();
const service = new CustomerServices();
const { getCustomerSchema, createCustomerSchema, updateCustomerSchema } = require('../schemas/customers.schema')

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
});

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json( await service.findOne(id) )
    } catch(error){
      next(error)
    }
  }
)

router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.json( await service.update(id, body) )
    } catch(error){
      next(error)
    }
  }
)


module.exports = router;
