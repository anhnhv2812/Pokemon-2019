const express = require('express');
const router = express.Router();

router.use(require('./user'));
router.use('/pokedex', require('./pokedex'));
router.use('/pokemon', require('./pokemon'));

module.exports = router