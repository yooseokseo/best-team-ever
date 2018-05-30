$(document).ready(() => {


  //to set today's date
  let todayDate = new Date();
  console.log(todayDate);
  //console.log(todayDate.getMonth());
  //console.log(todayDate.getDay());


  // when a home page is fully loaded, it should fetch a list of profile names from database and display
  //
  const requestURL = 'api/profiles';
  //console.log('making ajax request to:', requestURL);
  let token;

  $.ajax({
    url: requestURL,
    type: 'GET',
    dataType : 'json',
    beforeSend: (xhr) => {   //Include the bearer token in header
      xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
    },
    success: (data) =>
    {
      // default profile goes first
      const defaultProfile = data.pop();
      $('.profile-list-container').append('<div class="user-profile-name-box page-title" id="'+defaultProfile.id+'">'+ defaultProfile.firstName +' '+ defaultProfile.lastName +'</div><hr>');

      // other profiles
      for (const e of data) {
        $('.profile-list-container').append('<div class="user-profile-name-box page-title" id="'+e.id+'">'+ e.firstName +' '+ e.lastName +'</div><hr>');
      }


      $('.user-profile-name-box').click((e)=>{
        const e_id = e.target.id;
        const profile_id = e.target.id;

        $('.tri-svg').removeClass('down-nav-clicked');
        $('.user-profile-container').removeClass('user-profile-container-down');
        $('#page-title-nav').text(e.target.textContent);

        // get medicine for a certain profile
        $.ajax({
          url: '/api/profiles/'+ profile_id,
          type: 'GET',
          dataType : 'json', // this URL returns data in JSON format
          beforeSend: (xhr) => {   //Include the bearer token in header
              xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
          },
          success: (data) =>
          {
            $('#profile_id').text(data.id);
            
            let medToday = false;

            $('#med-list-container').html('');
            for (const el of data.medicine) {

              // only display today
              const date = new Date(el.date).setHours(0,0,0,0);
              const currentDate = new Date().setHours(0,0,0,0);

              if ( date.valueOf() == currentDate.valueOf() )
              {
                medToday = true;
                for (const e of el.values) {
                  const htmlStr = '<div class="med-item-box border-black">'
                  + '<div class="med-item-icon flex-center"><img class="pill-icon-img" src="/images/icons/pills/'+e.med_pic+'" onerror="this.src=`/images/icons/pill.svg`" ></div> '
                  + '<div class="med-item-name flex-center med-name">'+e.medicinename+'</div><div class="med-item-time flex-center med-time">10:00 AM'
                  + '</div></div>';
                  let element = document.createElement('a');
                  element.innerHTML = htmlStr;
                  element.firstChild.addEventListener( 'click', () =>
                  {
                    post('/viewPillDetail/'+e.id);
                  });

                  $('#med-list-container').append(element.firstChild);
                }
              }
            }
            if (!medToday)
              $('#med-list-container').html('You have no medicine today')  
          },
          error: (err) =>
          {
            console.log(err);
          }
        });
      }); // end of $('.user-profile-name-box').click((e)
    }, // end of success
    error: (xhr, textStatus, error) =>
    {
      console.log(xhr.statusText+': '+xhr.responseJSON.error);
    }

  });
});

function addNewMed()
{
  post('/addNewMed/'+$('#profile_id').text());
}

function viewAllMed()
{
  post('/viewAllMed/'+$('#profile_id').text());
}


