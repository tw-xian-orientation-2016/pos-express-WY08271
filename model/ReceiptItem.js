var mongoose = require('mongoose');
var Item = require('./Item');
var Schema = mongoose.Schema;

var receiptItemSchema = new Schema([{
  item: {
    barcode: Number,
    name: String,
    price: Number,
    unit: String
  },
  count: Number
}]);

var ReceiptItem = mongoose.model('ReceiptItem', receiptItemSchema);

ReceiptItem.getAllReceiptItems = function(callback) {
  ReceiptItem.find({}, (err, receiptItems) => {
    if (err) throw err;

    callback(receiptItems);
  });
};

ReceiptItem.addReceiptItem = function(barcode, name, price, unit, callback) {
  var item = {
    barcode: barcode,
    name: name,
    price: price,
    unit: unit
  };

  var receiptItem = new ReceiptItem([{
    item: item,
    count: 1
  }]);

  receiptItem.save((err, data) => {
    if (err) {
      throw `${err}`;
    } else {

      callback(data.length);
    }
  });
};

ReceiptItem.deleteReceiptItem = function(callback) {
  ReceiptItem.find({}, (err, receiptItem) => {
    if (err) throw err;

    receiptItem.remove(function(err) {
      if (err) throw err;

      callback(ReceiptItem);
    });
  });
};

ReceiptItem.updateReceiptItem = function(barcode, callback) {
  ReceiptItem.find({
      barcode: barcode,
      $set: {
        count: count + 1
      }
    },
    function(err, ReceiptItem) {
      if (err) throw err;

      callback(ReceiptItem);
    });
};

module.exports = ReceiptItem;
