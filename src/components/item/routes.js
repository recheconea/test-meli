const express = require('express');
const router = express.Router();
const ItemService = require('./services');
const itemService = new ItemService();

// returns a query
router.get('/', async function (req, res) {
  var result = await itemService.getItems(req.query.q)
    res.send(result);
});

// returns a detailed item
router.get('/:id', function (req, res) {
  res.send('item detail endpoint!');
});

module.exports = router;