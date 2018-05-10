$(document).ready(() => {

  // when a home page is fully loaded, it should fetch a list of profile names from database and display
  //
  const requestURL = 'api/profiles';
  console.log('making ajax request to:', requestURL);
  let token;

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
      for (const e of data) {
          $('.profile-list-container').append('<div class="user-profile-name-box page-title">'+ e.firstName +' '+ e.lastName +'</div><hr>');

      }
      $('.user-profile-name-box').click((e)=>{
            console.log(e.target.textContent);
            //console.log(document.getElementsByClassName('user-profile-name-box')[1].childNodes[0].textContent);
            $('.tri-svg').removeClass('down-nav-clicked');
            $('.user-profile-container').removeClass('user-profile-container-down');
            $('#page-title-nav').text(e.target.textContent);
      })

      // get default profile's information
      $.ajax({
          url: '/api/profiles/default',
          type: 'GET',
          dataType : 'json', // this URL returns data in JSON format
          beforeSend: function (xhr) {   //Include the bearer token in header
              xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
          },
          success: (data) => 
          {
            console.log('You received some data!', data);            
            window.localStorage.setItem("token", data.token); //store authorization token
            $('#page-title-nav').html(data.firstName+' '+data.lastName);

            // get medicine
            $.ajax({
              url: '/api/medicine',
              type: 'GET',
              dataType: 'json',
              beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
              },
              success: (data) =>
              {
                console.log('get medicine');
                console.log(data);
              },
              error: (err) =>
              {
                console.log(err);
              }
            });
          },
          error: (err) => 
          {

          }
        });
    },
    error: (xhr, textStatus, error) =>
    {
      console.log(xhr.statusText+': '+xhr.responseJSON.error);
    },
    complete: () =>
    {
            
    }
  });
});
