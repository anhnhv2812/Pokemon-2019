const express = require('express');
const pokemonController = require('../../controllers/pokemon');
const { MESSAGE } = require('./../../configs/constants');
const router = express.Router();

router.get('/list', (req, res, next) => {
  if (!req.user) {
    next({ message: MESSAGE.PERMISSION_DENIED });
  }

  pokemonController.getList(req.user._id.toString())
    .then(response => res.send(response))
    .catch(error => next(error));
});

module.exports = router