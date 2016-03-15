$(document).ready(function() {
  flashPage();
});

function flashPage() {
  updatePage();
  updateTime();
  updatePriceTotal();
}

function updatePage() {
  $.ajax({
    url: '/gettempreceipt',
    type: 'GET',
    complete: function(tempReceipt) {
      console.log(tempReceipt);
      var receiptHTML = '';
      var time = changeTime(tempReceipt.date);
      var amount = tempReceipt.amount;
      var receiptItems = tempReceipt.receiptItems;

      receiptItems.forEach(function(receiptItem) {
        receiptHTML += '<tr><td class="goods col-md-4" >' + receiptItem.item.name + '</td><td class ="price col-md-4" >' + receiptItem.item.price + '/' + receiptItem.item.unit + '</td> <td class="count col-md-4" >' + receiptItem.count + '</td><td class="subTotal col-md-4" >' + receiptItem.item.price * receiptItem.count + '</td></tr>'
      });

      updateHTML(receiptHTML, time, amount);
    }
  });
}

function changeTime(time) {
  return new Date(time).toDateString();
}

function updateHTML(receiptHTML, time, amount) {
  $('tbody').append(receiptHTML);
  $('.panel-title').text(time);
  $('.time').text(time);
  $('#priceTotal').text(amount);
}
