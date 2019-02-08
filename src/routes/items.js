var express = require('express')
var router = express.Router()
var axios = require('axios');

// returns a query
router.get('/', function (req, res) {
  res.send('items list endpoint!')
})
// returns a detailed item
router.get('/:id', function (req, res) {
  res.send('item detail endpoint!')
})

module.exports = router