  const currentUserName = 'John';
  const requestURL = '/api/accounts/info';
  console.log('making ajax request to:', requestURL);

  $.ajax({
    url: requestURL,
    type: 'GET',
    dataType : 'json',
    beforeSend: function (xhr) {   //Include the bearer token in header
        xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
    },
    success: (data) =>
    {
      console.log(data);
    },
    error: (xhr, textStatus, error) =>
    {
      console.log(error);
    }
  }); 