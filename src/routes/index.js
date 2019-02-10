var express = require('express');
var router = express.Router();

const items = require('../components/item/routes');

router.use('/api/items', items)

module.exports = router;