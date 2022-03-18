const UserServices = require('./../services/user.services');
const express = require('express');
const validatorHandler = require('./../middlewares/validator.handler');

const router = express.Router();
const service = new UserServices();
const {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
} = require('../schemas/users.schema');

router.get('/', async (req, res, next) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint to get all users.'
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
    // #swagger.tags = ['User']
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
    // #swagger.tags = ['User']
    // #swagger.description: "This route permit create a new user",
    /* #swagger.parameters['User Information'] = {
        in: 'body',
        description: '',
        '@schema': {
            "required": ["User"],
            "properties": {
                "email": {
                    "type": "string",
                    "example": "example@mail.com"
                },
                "password":  {
                    "type": "string",
                    "example": "ax12XSA&ads"
                },
                "role": {
                  "type": "string",
                  "example": "customer"
                }
            }
        }
      } */
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      // #swagger.tags = ['User']
      // #swagger.description = "This route permit update information about users, every field is optional"
      /* #swagger.parameters['User Information'] = {
        in: 'body',
        description: '',
        '@schema': {
          "required": ["User"],
          "properties": {
            "email": {
              "type": "string",
              "example": "example@mail.com"
            },
            "role": {
              "type": "string",
              "example": "customer"
            }
          }
        }
      } */
      const { id } = req.params;
      const body = req.body;
      const updateUser = await service.update(id, body);
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
    // #swagger.tags = ['User']
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
