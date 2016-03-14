var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var mongoose = require('mongoose');

var routes = require('./routes/itemList');
var cart = require('./routes/cart');
var receipt = require('./routes/receipt');
var receiptList = require('./routes/receiptList');

var Item = require('./model/Item');
var ReceiptItem = require('./model/ReceiptItem');
var TempReceipt = require('./model/TempReceipt');
var ReceiptList = require('./model/receiptList');

var app = express();

app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var opts = {
  server: {
    socketOptions: {
      keepAlive: 1
    }
  }
};

mongoose.connect("mongodb://localhost:27017", opts);

app.use('/', routes);
app.use('/cart', cart);
app.use('/receipt', receipt);
app.use('/receiptList', receiptList);
app.use('/allItems', routes);
app.use('/allReceipts', receiptList);

app.use('/updatecart', function(req, res) {
  ReceiptItem.getAllReceiptItems(function(receiptItems) {
    var receiptsHTML = '';
    receiptItems.forEach(function(receiptItem) {
      var item = receiptItem.item;
      receiptsHTML += '<tr barcode="' + item.barcode + '"><td class="goods">' + item.name + '</td><td class="price">' + item.price + '/' + item.unit + '</td><td class="count"><input class="count-input" type="text" value="' + receiptItem.count + '" data-barcode="' + item.barcode + '" data-price="' + item.price + '"/></td><td class="subTotal">' +
        item.price * receiptItem.count + '</td><td><button class="btn btn-default delete-button" type="submit" data-barcode="' + item.barcode + '">删除</button></td></tr>';
    });
    res.send(receiptsHTML);
  });
});

app.use('/updateselectcount', function(req, res) {
  ReceiptItem.getAllReceiptItems(function(receiptItems) {
    res.sendStatus(receiptItems.length);
  });
});

app.use('/updatepricetotal', function(req, res) {
  ReceiptItem.getAllReceiptItems(function(receiptItems) {
    var priceTotal = 0;

    receiptItems.forEach(function(receiptItem) {
      priceTotal += receiptItem.item.price * receiptItem.count;
    });
    res.send(priceTotal);
  });
});

app.use('/deletereceiptitem', function(req, res) {
  ReceiptItem.deleteReceiptItem(function(receiptItem) {
    res.send(receiptItem);
  });
});

app.use('/updatereceiptitem', function(req, res) {
  ReceiptItem.updaterRceiptItem(function(receiptItem) {
    res.send(receiptItem);
  });
});

app.use('/receiptlist', function(req, res) {
  ReceiptList.getReceiptList(function(receipts) {
    var receiptsHTML = '';

    receipts.forEach(function(printItem) {
      var date = new Date(printItem.date);
      receiptsHTML += '<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">' + date.toDateString() + '</h3></div><div class="panel-body row"><div class="panel-content col-md-4"> 总计:<span barcode="priceTotal">' + printItem.amount + '</span></div><div class="panel-content col-md-4"><button class="btn btn-default info-button" type="submit" data-date="' + printItem.date + '">查看详情</button></div><div class="panel-content col-md-4"><button class="btn btn-default delete-button" type="submit" data-date="' + printItem.date + '">删除</button></div></div></div>';
    });

    res.send(receiptsHTML);
  });
});

app.use('/findreceiptitem', function(req, res) {
  var date = req.body.date;

  ReceiptList.getReceipt(date, function(temp) {
    TempReceipt.addTempReceipt(temp.receiptItems, temp.date, temp.count, temp.amount, function(tempReceipt) {
      res.send(tempReceipt);
    });
  });
});

app.use('/deletereceiptitem', function(req, res) {
  var date = req.body.date;

  ReceiptList.deleteReceiptList(data, function(receiptlist) {
    res.send(receiptlist);
  });
});

app.use('/gettempreceipt', function(req, res) {
  TempReceipt.getTempReceipt(function(tempReceipt) {
    res.send(tempReceipt);
  });
});

app.use('/select', function(req, res) {

  var barcode = req.body.barcode;

  Item.getItem(barcode, function(item) {
    ReceiptItem.addReceiptItem(item.barcode, item.name, item.price, item.unit, function(length) {

      res.send(length);
    });
  });
});

module.exports = app;
