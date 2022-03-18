const express = require('express');
const passport = require('passport');

const router = express.Router();

const OrderService = require('../services/order.services')
const service = new OrderService();

router.get('/my-orders',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    // #swagger.tags = ['profile']
    // #swagger.description = "this method get all orders user information require Json Web Token"
    /* #swagger.security = [{
               "bearerAuth": []
        }] */
    /* #swagger.parameters['Authorization'] = {
        in: 'header',
        description: 'token header',
        required: true
      } */
    try{
      const user = req.user;
      const orders = await service.findByUser(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
