// Part of this function modified from here:
// http://stackoverflow.com/a/2880929/1569632
//
// NOTE: This could be made more efficient by caching the result (and then
// killing the cache on URL changes, but we only call it once, so meh.

var PLEDGE_URL = 'https://pledge.mayday.us';

var getUrlParams = function() {
  var match,
  pl     = /\+/g,  // Regex for replacing addition symbol with a space
  search = /([^&=]+)=?([^&]*)/g,
  decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
  query  = window.location.search.substring(1);

  urlParams = {};
  while (match = search.exec(query))
    urlParams[decode(match[1])] = decode(match[2]);

  return urlParams;
};

var readCookie = function(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
};

var validateEmail = function(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};

var paymentConfig = null;
var stripeHandler = null;

var getAmountCents = function() {
  return Math.floor($('#amount_input').val() * 100);
};

var validateForm = function() {
    var email = $('#email_input').val() || null;
    var occ = $('#occupation_input').val() || null;
    var emp = $('#employer_input').val() || null;
    var amount = $('#amount_input').val() || null;
  
  
    if (!occ) {
      showError( "Please enter occupation");
      return false;
    } else if (!emp) {
      showError( "Please enter employer");
      return false;
    } else if (!email) {
      showError("Sorry, we are having trouble accepting pledges right now.  Please come back in 10 minutes"); 
      return false;
    } else if (!validateEmail(email)) {
      showError("Please enter a valid email");
      return false;
    } else if (amount && amount < 1) {
      showError( "Please enter an amount of $1 or more");
      return false;
    } 
    return true;
};

var pledge = function() {
  if (validateForm()) {
    var cents = getAmountCents();
    stripeHandler.open({
      email: $('#email_input').val(),
      amount: cents
    });        
  }
};

var showError = function(errorText) {
  $('#formError').text(errorText);
  $('#formError').show();  
}

var setLoading = function(loading) {
  if (loading) {
    $('#pledgeButton .pledgeText').hide();
    $('#pledgeButton').off('click');
    $('#pledgeButton .spinner').show();
  } else {
    $('#pledgeButton .pledgeText').show();
    $('#pledgeButton').on('click', pledge);  
    $('#pledgeButton .spinner').hide();    
  }
}

var onTokenRecv = function(token, args) {  
  setLoading(true);
  createPledge(args.billing_name, { STRIPE: { token: token.id } });
};

var createPledge = function(name, payment) {
  var urlParams = getUrlParams();
  var pledgeType = null;

  if($("#directDonate_input").is(':checked')) {
    pledgeType = 'DONATION';
  } else {
    pledgeType = 'CONDITIONAL';
  }
  
  var data = {
    email: $('#email_input').val(),
    phone: $('#phone_input').val(),
    name: name,
    occupation: $('#occupation_input').val(),
    employer: $('#employer_input').val(),
    target: $('#targeting_input').val(),
    subscribe: $('#emailSignupInput').is(':checked') ? true : false,
    // anonymous: $scope.ctrl.form.anonymous,
    amountCents: getAmountCents(),
    pledgeType: pledgeType,
    team: urlParams['team'] || readCookie("last_team_key") || '',
    payment: payment
  };
  
  if($("#survey_input").length) {    
    data['surveyResult'] = $('#survey_input').val();
  }
  
  $.ajax({
      type: 'POST',
      url: PLEDGE_URL + '/r/pledge',
      data: JSON.stringify (data),
      contentType: "application/json",
      dataType: 'json',
      success: function(data) {
        location.href = PLEDGE_URL + data.receipt_url;       
      },
      error: function(data) {
        setLoading(false);
        if ('paymentError' in data) {
          showError("We're having trouble charging your card: " + data.paymentError);
        } else {
          $('#formError').text('Oops, something went wrong. Try again in a few minutes');
          $('#formError').show();      
        }
      },
  });
};
  
$(document).ready(function() {
  var urlParams = getUrlParams(); 
  var passedEmail = urlParams['email'] || '';
  var header = urlParams['header'] || '';
        
  $('#email_input').val(passedEmail);

  $('#pledgeButton').on('click', pledge);

  $.get(PLEDGE_URL + '/r/payment_config').done(function(config) {
      paymentConfig = config;
      stripeHandler = StripeCheckout.configure({
      key: config.stripePublicKey,
      name: 'MAYDAY.US',
      panelLabel: 'Pledge',
      billingAddress: true,
      image: PLEDGE_URL + '/static/flag.jpg',
      token: function(token, args) {
        onTokenRecv(token, args);
      }
    });
  });
});
