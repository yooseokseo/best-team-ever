function testauth()
{
  $.ajax({
    type: "POST", //GET, POST, PUT
    url: '/testauth',  //the url to call
    data: {'data': 'data'},     //Data sent to server
    contentType: 'json',           
    beforeSend: function (xhr) {   //Include the bearer token in header
      xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
    }
  }).done(function (response) 
  {
    $('#loginStatus').text("Signed in: true (username: "+response.username+")");
    $('#lookupInfo_hidden').show();
    $('#profile-medicine-new').show();
  }).fail(function (err)  
  {
    $('#loginStatus').text("Signed in: false");
  });
}

// jQuery convention for running when the document has been fully loaded:
$(document).ready(() => {

  /*
   * Show list of all users. Don't need to be signed in
   * Makes GET request to /users
   */
  $('#allUsersButton').click(() => {
    $.ajax({
      url: 'accounts/',
      type: 'GET',
      dataType : 'json',
      success: (data) => {
        console.log('You received some data!', data);
        $('#infoDiv').html('All users: ' + JSON.stringify(data));
        $('#status').html('Successfully fetched data (GET request) at URL: /users');
      },
      error: (xhr, textStatus, error) => 
      {
        $('#infoDiv').html('');
        $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });
  });

  /*
   * Sign up; don't need to be signed in.
   * Makes POST request to /accounts/signup
   */
  $('#signup').click(() => 
  {
    var body = {
                 'username' : $('#username').val(),
                 'email': $('#email').val(), 
                 'password' : $('#password').val()
               };
    $.ajax({
      url: 'accounts/signup',
      type: 'POST',
      dataType : 'json',
      data: body,
      success: (data) => 
      {
        console.log('sign up success');
        $('#infoDiv').html(JSON.stringify(data));
        $('#status').html('Successfully fetched data (POST request) at URL: accounts/signup');
        window.localStorage.setItem("token", data.token); //store authorization token
        testauth();
      },
      error: (xhr, textStatus, error) => 
      {
        $('#infoDiv').html('');
        $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });

  });

  /*
   * Login
   * Makes POST request to accounts/login
   */
  $('#login').click(() => 
  {
    var body = {
                 'username' : $('#username').val(),
                 'password' : $('#password').val()
               };
    $.ajax({
      url: 'accounts/login',
      type: 'POST',
      dataType : 'json',
      data: body,
      success: (data) => 
      {
        console.log('login success');
        $('#infoDiv').html(JSON.stringify(data));
        $('#status').html('Successfully fetched data (POST request) at URL: accounts/login');
        window.localStorage.setItem("token", data.token); //store authorization token
        testauth();
      },
      error: (xhr, textStatus, error) => 
      {
        $('#infoDiv').html('');
        $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });

  });

  /*
   * Sign out. Clears jwt token 
   */
  $('#signout').click(()=>
  {
    window.localStorage.setItem("token", "");
    window.location.reload();
  });

  /*
   * Gets user's info (ex. username, email, password)
   * Needs to be signed in and access correct user
   * Makes GET request to /accounts/:username
   */
  $('#getUserInfo').click(() => {
    const requestURL = 'accounts/' + $('#userBox').val();
    console.log('making ajax request to:', requestURL);

    $.ajax({
      url: requestURL,
      type: 'GET',
      dataType : 'json',
      beforeSend: function (xhr) {   //Include the bearer token in header
          xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
      },
      success: (data) => {
        console.log('You received some data!', data);
        $('#infoDiv').html($('#userBox').val() + '\'s profiles: ' + JSON.stringify(data));
        $('#status').html('Successfully fetched data (GET request) at URL: ' + requestURL);
      },
      error: (xhr, textStatus, error) => 
      {
        $('#infoDiv').html('');
        $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });
  });



});