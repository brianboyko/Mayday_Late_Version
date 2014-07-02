$(function() {
  $.ajax({
    url: 'https://auth.mayday.us/v1/current_user?return_to=https://my.mayday.us/dashboard',
    xhrFields: {
      withCredentials: true
    }
  })  // TODO: template-ify the returnTo
  .fail(function() {
    $('#mysuperpac_topmenu').hide();
    throw new Error('Error reaching auth server');
  })
  .done(function(authCreds) {
    if (authCreds.logged_in) {
      $('#mysuperpac_topmenu').show();
      $('#login_topmenu').hide();
      return;
    } else {
        // else, we need to login.  Show the buttons to toggle the modal
        $('#login_topmenu').show();
        $('#mysuperpac_topmenu').hide();

        // link up the buttons to auth result
        for (var link_name in authCreds.login_links) {
            $('#btn-' + link_name).attr("href",  authCreds.login_links[link_name]);
        }
    }
  });
});
