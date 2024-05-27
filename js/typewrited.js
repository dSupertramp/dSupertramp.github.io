$(document).ready(function () {
  $("#otherTypewrite").hide().delay(5000).fadeIn();



  setTimeout(function () {


    $('#typewriteText').typewrite({
      actions: [{
          delay: 600
        },
        {
          type: 'Hi. '
        },
     
        {
          delay: 500
        },
        {
          type: '<br>'
        },
        {
          type: 'My'
        },
        {
          type: ' name is Danilo.'
        },
      ]
    });






    //This value must be > of delay of loader.js
  }, 500);

});