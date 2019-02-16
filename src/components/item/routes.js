const express = require('express');
const router = express.Router();
const ItemService = require('./services');
const itemService = new ItemService();

// returns a query
router.get('/', async function (req, res) {
  var result = await itemService.getItems(req.query.q);
  // TODO: move this to the propper place...
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept")
  res.send(result);
});

// returns a detailed item
router.get('/:id', async function (req, res) {
  var result = await itemService.getItem(req.params.id);
  res.send(result);
});

module.exports = router;