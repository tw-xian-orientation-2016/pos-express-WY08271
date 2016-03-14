$(document).ready(function() {
  flashPage();

  $(".delete-button").click(function() {
    var barcode = this.getAttribute("data-barcode");
    $(this).parent().parent().hbarcodee();

    deleteReceiptItem(barcode);
  });

  $(".checkout-button").click(function() {
    saveReceiptList();
  });

  $(".count-input").on("input", function() {
    var barcode = parseInt(this.getAttribute("data-barcode"));
    var price = parseInt(this.getAttribute("data-price"));
    var count = parseInt($(this).val() !== '' ? $(this).val() : 1);

    $(this).parent().parent().find("[class='subTotal']").text(price * count);

    updateReceiptItem(barcode, count);
    updatePriceTotal();
  });
});

function updateReceiptItem(barcode, count) {
  $.ajax({
    url: '/updatereceiptitem',
    data: {
      barcode:barcode,
      count:count
    }
    type: 'POST',
    complete: function(successfulTip) {
      console.log(successfulTip);
    }
  });
}

function deleteReceiptItem(barcode) {
  $.ajax({
    url: '/deletereceiptitem',
    data: barcode,
    type: 'POST',
    complete: function(successfulTip) {
      console.log(successfulTip);
    }
  });
}

function flashPage() {
  updateCart();
  updateSelectCount();
  updatepriceTotal();
}

function updateCart() {
  $.ajax({
    url: '/updatecart',
    type: 'GET',
    complete: function(successfulTip) {
      console.log(successfulTip);
      $('tbody').append(successfulTip);
    }
  });
}

function updateSelectCount() {
  $.ajax({
    url: '/updateselectcount',
    type: 'GET',
    complete: function(successfulTip) {
      console.log(successfulTip);
      $("#selectedCount").text(selectedCount);
    }
  });
}

function updatePriceTotal() {
  $.ajax({
    url: '/updatepricetotal',
    type: 'GET',
    complete: function(successfulTip) {
      console.log(successfulTip);
      $("#priceTotal").text(priceTotal);
    }
  });
}
