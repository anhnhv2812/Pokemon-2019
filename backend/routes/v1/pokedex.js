const express = require('express');
const pokedexController = require('./../../controllers/pokedex');
const { MESSAGE } = require('./../../configs/constants');
const router = express.Router();

router.get('/list', (req, res, next) => {
  if (!req.user) {
    next({ message: MESSAGE.PERMISSION_DENIED });
  }

  pokedexController.getList(req.user)
    .then(response => res.send(response))
    .catch(error => next(error));
});

router.get('/:userId', (req, res, next) => {
  if (!req.user) {
    next({ message: MESSAGE.PERMISSION_DENIED });
  }
  const { userId } = req.params;

  pokedexController.getDetail(userId, req.user._id.toString())
    .then(response => res.send(response))
    .catch(error => next(error));
});

router.post('/', (req, res, next) => {
  if (!req.user) {
    next({ message: MESSAGE.PERMISSION_DENIED });
  }

  pokedexController.addPokemon(req.body, req.user._id.toString())
    .then(response => res.send(response))
    .catch(error => next(error));
});

module.exports = router