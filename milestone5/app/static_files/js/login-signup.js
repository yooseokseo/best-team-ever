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
      window.location = '/home';
      
      // $.ajax(
      // {
      //   url: '/home',
      //   type: 'POST',
      //   dataType: 'html',
      //   data: {token: window.localStorage.getItem("token")},
      //   success: (data) =>
      //   {
      //     console.log('success');
      //     //console.log(data);
      //     // document.write(data);
      //     document.open();
      //     document.write(data);
      //     window.history.pushState('/home', data, '/home');
      //     document.close();

      //   },
      //   error: (err) =>
      //   {
      //     console.log("error");
      //     //$.parseHTML(err.responseText);
      //     document.write(err.responseText);

      //     window.history.pushState('', 'Title', err.responseText.pageTitle);
      //   }
      // })

    },
    error: (xhr, textStatus, error) =>
    {
      console.log(xhr.statusText+': '+xhr.responseJSON.error);
    }
  });
});