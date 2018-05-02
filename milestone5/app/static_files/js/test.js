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
    $('#nameBox').show();
    $('#profilenameLabel').show();
    $('#usernameLabel').show();
    $('#userBox').show();
    $('#getUserInfo').show();
    $('#getAllProfiles').show();
    $('#getProfile').show();
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
      url: 'users/',
      type: 'GET',
      dataType : 'json',
      success: (data) => {
        console.log('You received some data!', data);
        $('#status').html('All users: ' + JSON.stringify(data));
      },
      error: (xhr, textStatus, error) => 
      {
        console.log('sign up error');
        $('#jobDiv').html('');
        $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });
  });

  /*
   * Sign up; don't need to be signed in.
   * Makes POST request to /users/signup
   */
  $('#signup').click(() => 
  {
    var body = {
                 'username' : $('#username').val(),
                 'email': $('#email').val(), 
                 'password' : $('#password').val()
               };
    $.ajax({
      url: 'users/signup',
      type: 'POST',
      dataType : 'json',
      data: body,
      success: (data) => 
      {
        console.log('sign up success');
        $('#status').html(JSON.stringify(data));
        window.localStorage.setItem("token", data.token); //store authorization token
        testauth();
      },
      error: (xhr, textStatus, error) => 
      {
        console.log('sign up error');
        $('#jobDiv').html('');
        $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });

  });

  /*
   * Login
   * Makes POST request to users/login
   */
  $('#login').click(() => 
  {
    var body = {
                 'username' : $('#username').val(),
                 'password' : $('#password').val()
               };
    $.ajax({
      url: 'users/login',
      type: 'POST',
      dataType : 'json',
      data: body,
      success: (data) => 
      {
        console.log('sign up success');
        $('#status').html(JSON.stringify(data));
        window.localStorage.setItem("token", data.token); //store authorization token
        testauth();
      },
      error: (xhr, textStatus, error) => 
      {
        console.log('sign up error');
        $('#jobDiv').html('');
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
   * Makes GET request to /users/:username
   */
  $('#getUserInfo').click(() => {
    const requestURL = 'users/' + $('#userBox').val();
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
        $('#status').html($('#userBox').val() + '\'s profiles: ' + JSON.stringify(data));
      },
      error: (xhr, textStatus, error) => 
      {
        console.log('sign up error');
        $('#jobDiv').html('');
        $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });
  });

  /*
   * Shows list of all of user's profile. Must be logged in
   * Makes GET request to /users/:username/profiles
   */
  $('#getAllProfiles').click(() =>
  {
    const requestURL = 'users/'+$('#userBox').val()+'/profiles';
    console.log('requestURl = '+requestURL);
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
        $('#status').html($('#userBox').val()+'\'s profiles: \n' + JSON.stringify(data));
      },
      error: (xhr, textStatus, error) => 
      {
        console.log('sign up error');
        $('#jobDiv').html('');
        $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });
  });

  /*
   * View info for a specific profile. Must be logged in
   * Makes GET request to /users/:username/:profilename
   */
  $('#getProfile').click(() => {
    const requestURL = 'users/' + $('#userBox').val() + '/' + $('#nameBox').val();
    console.log('making ajax request to:', requestURL);

    // From: http://learn.jquery.com/ajax/jquery-ajax-methods/
    // Using the core $.ajax() method since it's the most flexible.
    // ($.get() and $.getJSON() are nicer convenience functions)
    $.ajax({
      // all URLs are relative to http://localhost:3000/
      url: requestURL,
      type: 'GET',
      dataType : 'json', // this URL returns data in JSON format
      beforeSend: function (xhr) {   //Include the bearer token in header
          xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
      },
      success: (data) => {

        console.log('You received some data!', data);
        console.log(data);
        console.log("data.firstName = "+data.firstName);
        console.log("data.lastName = "+data.lastName);

        if (data.firstName && data.lastName) {
          $('#status').html('Successfully fetched data at URL: ' + requestURL);
          $('#jobDiv').html('First name: ' +data.firstName+'; Last name: '+data.lastName);
        }
      },
      error: (xhr, textStatus, error) => 
      {
        console.log('sign up error');
        $('#jobDiv').html('');
        $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });
  });


});