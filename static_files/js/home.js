$(document).ready(() => {


  // for switching beetween yesterday, today, and tomorrow's view
  $('#date-prev').click(()=>
  {
    $('#med-list-container-tomorrow').hide();
    $('#med-list-container-today').hide();
    $('#med-list-container-yesterday').show();
    $('#date-prev').addClass('current-day');
    $('#date-today').removeClass('current-day');
    $('#date-next').removeClass('current-day');
    $('#home-content-title').html('Yesterday');
  });

  $('#date-today').click(()=>
  {
    $('#med-list-container-yesterday').hide();
    $('#med-list-container-tomorrow').hide();
    $('#med-list-container-today').show();
    $('#date-prev').removeClass('current-day');
    $('#date-today').addClass('current-day');
    $('#date-next').removeClass('current-day');
    $('#home-content-title').html('Today');
  });

  $('#date-next').click(()=>
  {
    $('#med-list-container-yesterday').hide();
    $('#med-list-container-today').hide();
    $('#med-list-container-tomorrow').show();
    $('#date-prev').removeClass('current-day');
    $('#date-today').removeClass('current-day');
    $('#date-next').addClass('current-day');
    $('#home-content-title').html('Tomorrow');
  })

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

      // click on any of the profiles from drop down menu; load info about that profile
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
            
            // determine if date has any medication
            let medYesterday = false, medToday = false, medTomorrow = false;

            // create yesterday, today, and tomorrow's date
            const d = new Date();
            const day = (offset) => new Date(d.getTime() + 
                                    offset*(24*60*60*1000)).setHours(0,0,0,0);
            let yesterday = day(-1), today = day(0), tomorrow = day(+1);

            $('#med-list-container-yesterday').html('');
            $('#med-list-container-today').html('');
            $('#med-list-container-tomorrow').html('');

            for (const el of data.medicine) 
            {
              const date = new Date(el.date).setHours(0,0,0,0); //medication date

              // yesterday medication
              if ( date.valueOf() == yesterday )
              {
                medYesterday = true;
                for (const e of el.values) {
                  const htmlStr = '<div class="med-item-box border-black">'
                  + '<div class="med-item-icon flex-center"><img class="pill-icon-img" src="/images/icons/pills/'+e.med_pic+'" onerror="this.src=`/images/icons/pill.svg`" ></div> '
                  + '<div class="med-item-name flex-center med-name">'+e.medicinename+'</div><div class="med-item-time flex-center med-time">'+e.time+''
                  + '</div></div>';
                  let element = document.createElement('a');
                  element.innerHTML = htmlStr;
                  element.firstChild.addEventListener( 'click', () =>
                  {
                    post('/viewPillDetail/'+e.id);
                  });

                  $('#med-list-container-yesterday').append(element.firstChild);
                }
              }

              // today medication
              if ( date.valueOf() == today )
              {
                medToday = true;
                for (const e of el.values) {
                  const htmlStr = '<div class="med-item-box border-black">'
                  + '<div class="med-item-icon flex-center"><img class="pill-icon-img" src="/images/icons/pills/'+e.med_pic+'" onerror="this.src=`/images/icons/pill.svg`" ></div> '
                  + '<div class="med-item-name flex-center med-name">'+e.medicinename+'</div><div class="med-item-time flex-center med-time">'+e.time+''
                  + '</div></div>';
                  let element = document.createElement('a');
                  element.innerHTML = htmlStr;
                  element.firstChild.addEventListener( 'click', () =>
                  {
                    post('/viewPillDetail/'+e.id);
                  });

                  $('#med-list-container-today').append(element.firstChild);
                }
              }

              // tomorrow medication
              if ( date.valueOf() == tomorrow )
              {
                medTomorrow = true;
                for (const e of el.values) {
                  const htmlStr = '<div class="med-item-box border-black">'
                  + '<div class="med-item-icon flex-center"><img class="pill-icon-img" src="/images/icons/pills/'+e.med_pic+'" onerror="this.src=`/images/icons/pill.svg`" ></div> '
                  + '<div class="med-item-name flex-center med-name">'+e.medicinename+'</div><div class="med-item-time flex-center med-time">'+e.time+''
                  + '</div></div>';
                  let element = document.createElement('a');
                  element.innerHTML = htmlStr;
                  element.firstChild.addEventListener( 'click', () =>
                  {
                    post('/viewPillDetail/'+e.id);
                  });

                  $('#med-list-container-tomorrow').append(element.firstChild);
                }
              }
            } // end of for loop
            if (!medYesterday)
              $('#med-list-container-yesterday').html('You had no medication yesterday');
            if (!medToday)
              $('#med-list-container-today').html('You have no medicine today');
            if (!medTomorrow)
              $('#med-list-container-tomorrow').html('You have have no medication tomorrow');
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


