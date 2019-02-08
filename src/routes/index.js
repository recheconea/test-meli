var express = require('express');
var router = express.Router();

const items = require('./items');

router.use('/api/items', items)

module.exports = router;