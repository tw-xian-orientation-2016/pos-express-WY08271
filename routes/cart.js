var express = require('express');
var Item = require('../model/Item');
var ReceiptItem = require('../model/ReceiptItem');
var TempReceipt = require('../model/TempReceipt');
var ReceiptList = require('../model/receiptList');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('cart');
});

module.exports = router;
