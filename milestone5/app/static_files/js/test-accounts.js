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
    $('#getUserInfo').text('Get '+response.username+'\'s info')
    $('#getAllProfiles').text('Get '+response.username+'\'s profiles');
    $('#lookupInfo_hidden').show();
    $('#new_profile_text').text('New profile for '+response.username);
    $('#profile-new').show();
  }).fail(function (err)  
  {
    $('#loginStatus').text("Signed in: false");
  });
}

// jQuery convention for running when the document has been fully loaded:
$(document).ready(() => {

  /*
   * Show list of all users. Don't need to be signed in
   * Makes GET request to /accounts
   * If user is signed in, from the list of all accounts, make user's account
   * clickable; clicking it will take user to "get info"
   * If user is not signed in, simply show list of all accounts (none of them 
   * will be clickable)
   */
  $('#allUsersButton').click(() => {
    $.ajax({
      url: '/api/accounts/',
      type: 'GET',
      dataType : 'json',
      success: (data) => {
        console.log('You received some data!', data);
        $('#status').html('Successfully fetched data (GET request) at URL: /users');

//          $('#loginStatus').text("Signed in: true (username: "+response.username+")");
        
        // find username from signed status above
        let status = $('#loginStatus').text();
        if (status.length >= 27) // signed in
        {
          // extract substring with just username
          status = status.substring(27, status.length-1);

          // display list of accounts and make the logged in user's account clickable
          $('#infoDiv').html('Accounts: (click to edit or delete)<br>');

          data.forEach(e =>
          {
            if (e == status)
            {
              let info = document.createElement('a');
              info.setAttribute('href', "#");
              info.appendChild( document.createTextNode( e ) );
              info.addEventListener( 'click', () =>
              {
                $('#getUserInfo').click();
                event.preventDefault();
              });
              $('#infoDiv').append(info);  
              $('#infoDiv').append( document.createTextNode(', ') );
            }
            else
            {
              $('#infoDiv').append( document.createTextNode(e+', ') );
            }
          }); // end of forEach
        }
        else // not signed in
        {
          $('#infoDiv').html('All users: ' + JSON.stringify(data));

        }

      },
      error: (xhr, textStatus, error) => 
      {
        $('#infoDiv').html('');
        $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });
  });


  $('#signup-login-display-button').click(() =>
  {
    const text = $('#signup-login-display-button').text();
    if (text == 'Hide')
    {
      $('#signup-login-div').hide();
      $('#signup-login-display-button').text('Show');
    }
    else
    {
      $('#signup-login-div').show();
      $('#signup-login-display-button').text('Hide'); 
    }
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
      url: '/api/accounts/signup',
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
        
        // clear fields since signing in as new user; haven't selected profile yet
        $('#medicine-new').hide();
        $('#lookupMedicine_hidden').hide()
        $('#nameBoxFirst').val('');
        $('#nameBoxLast').val('');
        $('#profile_id').val('');
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
      url: '/api/accounts/login',
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

        // clear fields since logged in as new user; haven't selected profile yet
        $('#medicine-new').hide();
        $('#lookupMedicine_hidden').hide()
        $('#nameBoxFirst').val('');
        $('#nameBoxLast').val('');
        $('#profile_id').val('');
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
   * Makes GET request to /accounts/info
   * Make info clickable; clicking gives option to edit or delete account
   */
  $('#getUserInfo').click(() => {
    const requestURL = '/api/accounts/info'
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
        $('#status').html('Successfully fetched data (GET request) at URL: ' + requestURL);

        $('#infoDiv').html(data.username + '\'s info: (click to edit or delete account)');

        let info = document.createElement('a');
        info.setAttribute('href', "#");
        info.appendChild( document.createTextNode( JSON.stringify(data) ) );
        
        // fill out first name, last name, and id fields and click 'getProfile'
        info.addEventListener( 'click', () =>
        {
          $('#signup-login_text').text('Edit/Delete account')
    
          //show field if it's not already shown
          $('#signup-login-div').show();
          $('#signup-login-display-button').text('Hide');

          $('#signout').hide();
          $('#signup').hide();
          $('#login').hide();
          $('#editAccount').show();
          $('#deleteAccount').show();
          $('#cancelEditAccount').show();

          $('#getUserInfo').click();
          event.preventDefault();
        });
        $('#infoDiv').append(info);  

      },
      error: (xhr, textStatus, error) => 
      {
        $('#infoDiv').html('');
        $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });
  });



  $('#editAccount').click(() =>
  {
    var body = {};

    // only send PATCH request for values that user want to update (non-empty values)
    // check if input value is empty; if not empty, add it to body, otherwise do nothing
    ($('#username').val() == '')? {} : body.username = $('#username').val();
    ($('#password').val() == '')? {} : body.password = $('#password').val();
    ($('#email').val() == '')?    {} : body.email = $('#email').val();


    console.log(body);

    const requestURL = '/api/accounts/edit/';
    $.ajax({
      // all URLs are relative to http://localhost:3000/
      url: requestURL,
      type: 'PATCH',
      dataType : 'json', // this URL returns data in JSON format
      data: body,
      beforeSend: function (xhr) {   //Include the bearer token in header
          xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
      },
      success: (data) => {
        console.log('You received some data!', data);
        $('#status').html('Successfully fetched data (GET request) at URL: ' + requestURL);
        window.localStorage.setItem("token", data.token); //store authorization token  
        testauth();

        // show the edited account
        $('#getUserInfo').click();
        
      },
      error: (xhr, textStatus, error) => 
      {
        $('#infoDiv').html('');
        $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });
  }); // end of createMedicine()
  

  $('#deleteAccount').click(() =>
  {
    const body = {};
    const requestURL = '/api/accounts/delete/';
    $.ajax({
      // all URLs are relative to http://localhost:3000/
      url: requestURL,
      type: 'DELETE',
      dataType : 'json', // this URL returns data in JSON format
      data: body,
      beforeSend: function (xhr) {   //Include the bearer token in header
          xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
      },
      success: (data) => {
        console.log('You received some data!', data);
        $('#status').html('Successfully fetched data (GET request) at URL: ' + requestURL);
        $('#infoDiv').html('Account deleted; try doing "get all accounts" to check');
        $('#signout').click();
      },
      error: (xhr, textStatus, error) => 
      {
        $('#infoDiv').html('');
        $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });
  });
  

  /* 
   * exit edit/delete medicine mode; return to normal 'login/signup' mode
   */
  $('#cancelEditAccount').click(() =>
  {
    $('#signup-login_text').text('Sign up/Log in')

    $('#signout').show();
    $('#signup').show();
    $('#login').show();
    $('#editAccount').hide();
    $('#deleteAccount').hide();
    $('#cancelEditAccount').hide();
  });



});