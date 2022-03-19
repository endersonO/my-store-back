const express = require('express');
const passport = require('passport');

const router = express.Router();

const AuthService = require('./../services/auth.service')
const service = new AuthService();

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    /* // #swagger.tags = ['Auth']
    #swagger.description = "this method permit to user log"
    /* #swagger.parameters['Access Information'] = {
        in: 'body',
        description: 'this required email and password',
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
          }
        }
      } */
    try {
      console.log("router login");
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
  async (req, res, next) => {
    /* // #swagger.tags = ['Auth']
    #swagger.description = "this method permit to user reset password, sending an email with recovery link"
    /* #swagger.parameters['User email'] = {
        in: 'body',
        description: 'this required User email',
        '@schema': {
          "required": ["User"],
          "properties": {
            "email": {
              "type": "string",
              "example": "example@mail.com"
            }
          }
        }
      } */
    try{
      const { email } = req.body;
      const rta = await service.sendRecovery(email);
      res.json(rta);
    } catch (error) {
      next(error)
    }
  }
)

router.post('/change-password',
  async (req, res, next) => {
    /* // #swagger.tags = ['Auth']
    #swagger.description = "this method changed user password"
    /* #swagger.parameters['Password Information'] = {
        in: 'body',
        description: 'required temporal and unique use bearer token and new password',
        '@schema': {
            "required": ["User"],
            "properties": {
                "newPassword":  {
                    "type": "string",
                    "example": "ax12XSA&ads"
                },
                "token": {
                  "type": "string",
                  "example": "aisdiuadsunu9da.d9ina9ndasnd.u21be7dass"
                }
            }
        }
      } */
    try {
      const { token, newPassword } = req.body;
      const rta = await service.changePassword(token, newPassword);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
