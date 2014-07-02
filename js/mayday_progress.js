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

function setText(el, val) {
  el = document.getElementById(el);
  if (el.textContent !== undefined)
    el.textContent = val;
  else
    el.innerText = val;
}

function totalRaisedCB(totalRaisedCents) {
  var totalRaised = (totalRaisedCents / 100) - 1000000;
  var complete_total = (totalRaisedCents / 100);
  var percent = Math.floor(totalRaised / 10000);
  if (percent > 100) {
    percent = 100
  }
  setText("raised", '$' + addCommas(totalRaised));
  document.getElementById("progress_bar").style.width='' + Math.min(100, percent) + '%';
  document.getElementById("progressLeftLabel").innerHTML = percent + '% FUNDED';  
  
  var totalRaisedRounded = Math.round(totalRaised);
  var complete_total_message = '$' + addCommas(totalRaisedRounded);
  setText("raised", complete_total_message);
}

jQuery.getJSON('https://pledge.mayday.us/r/total',
               function(data) {
                 totalRaisedCB(data.totalCents);
               });

function ready(fn) {
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState === 'interactive')
        fn();
    });
  }
}
