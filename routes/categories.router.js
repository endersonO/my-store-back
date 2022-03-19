const CategoriesServices = require('../services/category.services')
const express = require('express');
const passport = require('passport');

const validatorHandler = require('./../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/category.schema');
const { checkRoles } = require('./../middlewares/auth.handler')

const router = express.Router();
const service = new CategoriesServices();

router.get('/', async (req, res, next) => {
  try {
    /* // #swagger.tags = ['Category']
    #swagger.description = "this method get all categories"
    */
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try{
      /* // #swagger.tags = ['Category']
      #swagger.description = "this method get one category with all product information"
      */
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    /*  #swagger.tags = ['Category']
    #swagger.description = "this method create new categories only admin can create"
    #swagger.parameters['Authorization'] = {
        in: 'header',
        description: 'token bearer in header',
        required: true
      } }
    #swagger.parameters['Category Information'] = {
        in: 'body',
        description: 'this required email and password',
        '@schema': {
          "required": ["category information"],
          "properties": {
            "name": {
              "type": "string",
              "example": "category 1"
            },
            "image":  {
                "type": "string",
                "example": "http://placeimg.com/640/480"
            },
          }
        }
      }
     */
    try{
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    /* #swagger.tags = ['Category']
    #swagger.description = "this method update fields categories only admin can update"
    #swagger.parameters['Authorization'] = {
        in: 'header',
        description: 'token bearer in header',
        required: true
      } }
    #swagger.parameters['Category Information'] = {
        in: 'body',
        description: 'this required optional fields like name or url',
        '@schema': {
          "required": ["category information"],
          "properties": {
            "name": {
              "type": "string",
              "example": "category 1"
            },
            "image":  {
                "type": "string",
                "example": "http://placeimg.com/640/480"
            },
          }
        }
      }
     */
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    /* #swagger.tags = ['Category']
    #swagger.description = "this method delete category field"
    #swagger.parameters['Authorization'] = {
        in: 'header',
        description: 'token bearer in header',
        required: true
      } }
    */
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
