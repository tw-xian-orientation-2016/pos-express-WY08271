var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var receiptListSchema = new Schema({
  date: Number,
  receiptItems: [{
    item: {
      barcode: Number,
      name: String,
      price: Number,
      unit: String
    },
    count: Number
  }],
  amount: Number
});

var ReceiptList = mongoose.model('ReceiptList', receiptListSchema);

ReceiptList.getReceipt = function(date, callback) {
  ReceiptList.find({
    date: 'date'
  }, function(err, receipt) {
    if (err) throw err;

    return receipt;
  });
};

ReceiptList.getReceiptList = function(callback) {
  ReceiptList.find({}, (err, items) => {
    if (err) throw err;

    callback(items);
  });
};

ReceiptList.addReceiptList = function(receiptItems, date, count, amount, callback) {
  var tempReceipt = new tempReceipt({
    date: date,
    receiptItems: receiptItems,
    count: count,
    amount: amount
  });

  receiptList.save(tempReceipt);
  callback(receiptList);
};

ReceiptList.devareReceiptList = function(date, callback) {
  ReceiptList.findOneAndRemove({
    date: 'date'
  }, (err, receiptItem) => {
    if (err) throw err;

    callback(ReceiptList);
  });
};
