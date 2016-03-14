var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tempReceiptSchema = new Schema({
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

var TempReceipt = mongoose.model('TempReceipt', tempReceiptSchema);

TempReceipt.addTempReceipt = function(receiptItems, date, count, amount, callback) {
  var tempReceipt = new tempReceipt({
    date: date,
    receiptItems: receiptItems,
    count: count,
    amount: amount
  });
//
  tempReceipt.save();
  callback(tempReceipt);
};

TempReceipt.getTempReceipt = function(callback){
  TempReceipt.find({},(err, tempReceipt) => {
    if(err) throw err;

    callback(tempReceipt);
  });
}

module.exports = TempReceipt;
