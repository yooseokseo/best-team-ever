$('#login_button').click(()=>
{
  var body = {
                 'username' : $('#username').val(),
                 'password' : $('#password').val()
              };
  const requestURL = '/api/accounts/login';
  $.ajax({
    url: requestURL,
    type: 'POST',
    dataType: 'json',
    data: body,
    success: (data) =>
    {
      console.log('login success');
      console.log(data);
      window.localStorage.setItem("token", data.token); //store authorization token
      //window.location = '/home';
      $.ajax(
      {
        url: '/home',
        type: 'POST'
      })

    },
    error: (xhr, textStatus, error) =>
    {
      console.log(xhr.statusText+': '+xhr.responseJSON.error);
    }
  });
});