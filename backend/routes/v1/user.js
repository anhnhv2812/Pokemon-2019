const express = require('express');
const userController = require('./../../controllers/user');

const router = express.Router();

router.post('/login', (req, res, next) => {
  userController.login(req.body)
    .then(response => res.send(response))
    .catch(error => next(error));
});

router.post('/signup', (req, res, next) => {
  userController.signup(req.body)
    .then(response => res.send(response))
    .catch(error => next(error));
});

module.exports = router