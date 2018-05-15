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
      window.localStorage.setItem("account_id", data.account_id);
      window.localStorage.setItem("token", data.token); //store authorization token
      
      post('/home');

    },
    error: (xhr, textStatus, error) =>
    {
      console.log(xhr.statusText+': '+xhr.responseJSON.error);
    }
  });
});