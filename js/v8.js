function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

function updateTotal(totalCents) {
  var totalRaised = (totalCents / 100) - 1000000;
  totalRaised = Math.round(totalRaised);  
  $('#totalAmount').text('$' + addCommas(totalRaised));
}




$(document).ready(function () {
  jQuery.getJSON('https://pledge.mayday.us/r/total',
               function(data) {
                 updateTotal(data.totalCents);
               });  
               
  jQuery.getJSON('https://pledge.mayday.us/r/num_pledges',
              function(data) {
                $('#numPledges').text(data.count);
              });  

  // javascript is so awesome. this is how you write June 1st. Cause June is the
  // 5th month, indexed by zero. thanks javascript!
  var date_its_over = Date.UTC(2014,10,04,05,00,00,00);
  var days_left = Math.ceil((date_its_over - Date.now())/(1000*24*60*60));
  var days_left_message = '' + days_left + ' days left';
  if (days_left == 1) {
   days_left_message = '' + days_left + ' day left';
  }
  $('#daysLeft').text(days_left_message);
});
