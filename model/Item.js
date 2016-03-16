var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  barcode: String,
  name: String,
  price: Number,
  unit: String
});

var Item = mongoose.model('Item', itemSchema);

Item.getAllItems = function(callback) {
  Item.find({}, (err, items) => {
    if (err) throw err;

    callback(items);
  });
};

Item.getItem = function(barcode, callback){
  Item.find({barcode: barcode}, (err, item) => {
    if(err) throw err;
     
    callback(item);
  });
};

module.exports = Item;
