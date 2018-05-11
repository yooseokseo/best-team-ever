$(document).ready(() => {
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
            // display a list of medication for a certain user profiles

            // reset list-container
            $('#med-list-container').html('');
            console.log(data);
            for (const e of data) {
              $('#med-list-container').append('<a href="/viewPillDetail"><div class="med-item-box border-black">'
              + '<div class="med-item-icon flex-center"><img class="pill-icon-img" src="/images/icons/pill.svg" alt=""></div> '
              + '<div class="med-item-name flex-center med-name">'+e.medicinename+'</div><div class="med-item-time flex-center med-time">10:00 AM'
              + '</div></div></a>');
            }


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
