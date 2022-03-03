const CategoriesServices = require('../services/category.services')
const express = require('express');

const router = express.Router();
const service = new CategoriesServices();

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

module.exports = router;
