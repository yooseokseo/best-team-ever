$(document).ready(() => {

  const requestURL = 'api/profiles';
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
      /*
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
      */

    },
    error: (xhr, textStatus, error) =>
    {
      console.log(xhr.statusText+': '+xhr.responseJSON.error);
    }
  });
});
