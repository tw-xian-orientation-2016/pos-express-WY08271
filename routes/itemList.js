var express = require('express');
var Item = require('../model/Item');
var ReceiptItem = require('../model/ReceiptItem');
var TempReceipt = require('../model/TempReceipt');
var ReceiptList = require('../model/receiptList');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('itemList');
});

router.post('/select', function(req, res) {
  var barcode = req.body.barcode;

  Item.getItem(barcode, function(item) {
    
    ReceiptItem.addReceiptItem(item.barcode, item.name, item.price, item.unit, function(length) {

      res.send(length);
    });
  });
});

router.get('/allItems', function(req, res) {
  Item.getAllItems(function(items) {
    var itemsHTML = '';
    items.forEach(function(item) {
      itemsHTML += '<tr barcode="' + item.barcode + '"><td class="goods"><span>' + item.name + '</span></td><td class="price">' + item.price + '/' + item.unit + '</td><td><button class="btn btn-default select-button" type="submit" data-barcode="' + item.barcode + '">选择</button></td>';
    });

    res.send(itemsHTML);
  });
});

module.exports = router;
