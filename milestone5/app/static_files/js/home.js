$(document).ready(() => {

  // when a home page is fully loaded, it should fetch a list of profile names from database and display
  //
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







    },
    error: (xhr, textStatus, error) =>
    {
      console.log(xhr.statusText+': '+xhr.responseJSON.error);
    },
    complete: ()=>{
      console.log('hello');
      $.ajax({
        url: '/api/medicine',
        type: 'GET',
        dataType : 'json',
        beforeSend: function (xhr) {   //Include the bearer token in header
            xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
          },
        success: (data) => {
          console.log('You received some data!', data);
          // display list of medicine and make each one clickable
          // clicking on a medicine gets that medicine's information
          $('#infoDiv').html('Medicine: ');
          data.forEach(e =>
          {
            let info = document.createElement('a');
            info.setAttribute('href', "#");
            info.appendChild(
              document.createTextNode( e.medicinename + ' (id: '+e.id+')' )
            );
            // fill out medicine name and id fields and click 'getMedicine'
            info.addEventListener( 'click', () =>
            {
              $('#medicineName').val(e.medicinename);
              $('#medicine_id').val(e.id);
              $('#getMedicine').click();
              event.preventDefault();
            });
            $('#infoDiv').append(info);
            $('#infoDiv').append( document.createTextNode(', ') );
          });

          $('#status').html('Successfully fetched data (GET request) at URL: ' + requestURL);
        },
        error: (xhr, textStatus, error) =>
        {
          $('#infoDiv').html('');
          $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
        }
      });
    }
  });
});
