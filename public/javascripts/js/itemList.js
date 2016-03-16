$(document).ready(function() {

  init();

  $(".select-button").click(function() {
    var barcode = this.getAttribute("data-barcode");

    $.ajax({
      url: '/select',
      data: barcode,
      type: 'POST',
      complete: function(successfulTip) {
        console.log(successfulTip);
        var length = successfulTip.length;
        $("#selectedCount").text(length);
      }
    });
  });
});

function init() {
  $.ajax({
    url: '/allItems',
    complete: function(successfulTip) {
      console.log(successfulTip);
      $("tbody").append(successfulTip);
    }
  });
}
