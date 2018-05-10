$(document).ready(() => {
  
  const requestURL = '/api/profiles/default';
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
      $('#pageTitle').html(data.firstName + ' ' + data.lastName);

      $.ajax({
        url: '/api/medicine',
        type: 'GET',
        dataType : 'json',
        beforeSend: function (xhr) {   //Include the bearer token in header
          xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
        },
        success: (data) =>
        {
          data.forEach(e => { console.log(e) } );
          console.log(JSON.stringify(data));
          //$('#pageTitle').html(data.firstName + ' ' + data.lastName);
        },
        error: (xhr, textStatus, error) =>
        {
          console.log(xhr.statusText+': '+xhr.responseJSON.error);
        }
      });

    },
    error: (xhr, textStatus, error) =>
    {
      console.log(xhr.statusText+': '+xhr.responseJSON.error);
    }
  }); 
});