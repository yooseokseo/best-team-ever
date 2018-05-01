
function testauth()
{
  $.ajax({
    type: "POST", //GET, POST, PUT
    url: 'users/testauth',  //the url to call
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
    $('#getUser').show();
    $('#getProfile').show();
  }).fail(function (err)  
  {
    $('#loginStatus').text("Signed in: false");
  });
}

// jQuery convention for running when the document has been fully loaded:
$(document).ready(() => 
{
  /*
   * Test auth token
   */
  $('#testauth').click(()=>{ testauth(); });

  /*
   * Shows all users 
   */
  $('#allUsersButton').click(() => 
  {
    $.ajax({
      url: 'users/',
      type: 'GET',
      dataType : 'json',
      success: (data) => { 
        console.log('You received some data!', data);

        $('#status').html('All users: ' + JSON.stringify(data));
      },
    });
  });

  /*
   * Signing up; if successful, creates and store auth token in localStorage
   */
  $('#signup').click(() => 
  {
    var body = {
                 'username' : $('#username').val(),
                 'email': $('#email').val(), 
                 'password' : $('#password').val()
               };
    $.post('users/signup', body, (data) => 
    {
      console.log('Sign up');
      $('#status').html('Sign up with = ' + JSON.stringify(data));
      window.localStorage.setItem("token", data.token); //store authorization token
      testauth();
    });  
  });


  /*
   * Loggin in; if successful, creates and store auth token in localStorage
   */
  $('#login').click(() => 
  {
    var body = {
                 'username' : $('#username').val(),
                 'password' : $('#password').val()
               };
    $.post('users/login', body, (data) => 
    {
      console.log('Log in');
      $('#status').html('Sign up with = ' + JSON.stringify(data));
      window.localStorage.setItem("token", data.token); //store authorization token
      testauth();
    });  
  });


  /*
   * When clicking "View a profile." Shows profile after checking auth
   */
  $('#getProfile').click(() => {
    if ($('#nameBox').val() == '')
    {
      alert("profilename is blank");
    }
    else
    {
      const requestURL = 'users/profiles/'+$('#nameBox').val();
      console.log('making ajax request to:', requestURL);

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

          if (data.job && data.pet) {
            $('#status').html('Successfully fetched data at URL: ' + requestURL);
            $('#jobDiv').html('My job is ' + data.job);
            $('#petImage').attr('src', 'images/'+data.pet).attr('width', '300px');
          } else {
            $('#status').html('Error: could not find user at URL: ' + requestURL);
            // clear the display
            $('#jobDiv').html('');
            $('#petImage').attr('src', '').attr('width', '0px');
          }
        },
      });
    }
  });

  /*
   * Shows ALL profiles of the user
   */
  $('#getUser').click(() => {
    const requestURL = 'users/profiles';
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
        $('#status').html('\'s profiles: ' + JSON.stringify(data));
      },
    });
  });

  

  /*
   * Clears token from localStorage when logging out
   */
  $('#signout').click(()=> 
  { 
    window.localStorage.setItem("token", ""); 
    window.location.reload(); 
  });

  



  

  // define a generic Ajax error handler:
  // http://api.jquery.com/ajaxerror/
  $(document).ajaxError(() => {
    $('#status').html('Error: unknown ajaxError!');
  });


});