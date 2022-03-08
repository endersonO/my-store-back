const express = require('express');
const ProductService = require('./../services/product.services');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
  queryProductSchema
} = require('./../schemas/products.schema');

const router = express.Router();
const service = new ProductService();

router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res,) => {
    const products = await service.find(req.query);
    res.json(products);
  }
);

router.get('/filter', async (req, res) => {
  await res.send('Yo soy un filter');
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try{
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json({ newProduct });
    } catch (error) {
      next(error)
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateProduct = await service.update(id, body);
      res.json(updateProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = await req.params;
  const deleteProduct = service.delete(id);
  res.json(deleteProduct);
});

module.exports = router;
