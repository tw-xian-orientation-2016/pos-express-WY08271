$(document).ready(function() {

  init();

  $(".info-button").click(function() {
    var date = parseInt(this.getAttribute("data-date"));

    findReceiptItem(date);
  });

  $(".delete-button").click(function() {
    var date = parseInt(this.getAttribute("data-date"));
    $(this).parent().parent().parent().hbarcodee();

    deleteReceiptItem(date);
  });
});

function init() {
  $.ajax({
    url: '/receiptlist',
    complete: function(successfulTip) {
      console.log(successfulTip);
      $(".page-header").append(successfulTip);
    }
  });
}

function findReceiptItem(date){
  $.ajax({
    url:'/findreceiptitem',
    data: date,
    type:'POST',
    complete:function(successfulTip){
      console.log(successfulTip);
      window.location.href = "receipt.html";
    }
  });
}

function deleteReceiptItem(date){
  $.ajax({
    url:'/deletereceiptitem',
    data: date,
    type:'POST',
    complete:function(successfulTip){
      console.log(successfulTip);
    }
  });
}
