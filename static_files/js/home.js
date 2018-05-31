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
  });


  // close popup modal
  $('.close-modal').click(() =>
  {
    modal.attr('style', 'display:none');
  });


  /**
   * Helper function for appending history
   */
  function appendMed(e, str)
  {
    const takenYes = (e.isTaken == 'Yes')? 'flex-center' : 'notShown';
    const takenNo  = (e.isTaken == 'No')?  'flex-center' : 'notShown';
    const color = (e.isTaken == 'Yes')? 'style="background-color:#E2FED3"' :
                                        'style="background-color:#FDCFD5"';

    const htmlStr =
      `<div class="view-pill-history-box border-black" id="div_id_`+e.id+`" `+color+` >

        <!-- pill image -->
        <div class="view-pill-history-info">
          <img class="pill-icon-img" src="/images/icons/pills/`+e.med_pic+`" onerror="this.src='/images/icons/pill.svg'" />`+e.medicinename+`
        </div>

        <div class="view-pill-history-end flex-center"> `+e.time+` </div>

        <!-- checkbox for whether pill has been taken -->
        <div class="isTaken flex-center" id="taken_text_`+e.id+`" style="display:none">`+e.isTaken+` </div>
        <div class="isTakenImage-yes `+takenYes+`  taken_yes_`+e.id+`">
          <img width="40vw" src="/images/icons/checked-checkbox-96.png" alt="">
        </div>
        <div class="isTakenImage-no `+takenNo+`  taken_no_`+e.id+`">
          <img width="40vw" src="/images/icons/checked-checkbox-96.png" alt="">
        </div>

      </div>`
    let element = document.createElement('a');
    element.innerHTML = htmlStr;
    element.firstChild.addEventListener( 'click', () =>
    {
      showModal(e.medicinename, e.medicine_id, e.id);
    });

    $('#med-list-container-'+str).append( element.firstChild );
    return true;
  }

  /**
   * Helper function for getting profile when clicked from drop down menu
   * Makes ajax call to fetch profile and display history
   */
  function getProfile(profile_id)
  {
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
            for (const e of el.values)
              medYesterday = appendMed(e, 'yesterday');
          }

          // today medication
          if ( date.valueOf() == today )
          {
            for (const e of el.values)
              medToday = appendMed(e, 'today');
          }

          // tomorrow medication
          if ( date.valueOf() == tomorrow )
          {
            for (const e of el.values)
              medTomorrow = appendMed(e, 'tomorrow');
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
  } // end of getProfile helper function


  /**
   * when a home page is fully loaded, make ajax call to fetch a list of 
   * profile names from database and display it in dropdown menu
   */
  $.ajax({
    url: 'api/profiles',
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
      $('.user-profile-name-box').click((e)=>
      {
        $('.tri-svg').removeClass('down-nav-clicked');
        $('.user-profile-container').removeClass('user-profile-container-down');
        $('#page-title-nav').text(e.target.textContent);

        getProfile(e.target.id); // get medicine for a clicked profile
      }); // end of .click callback
    }, // end of success
    error: (xhr, textStatus, error) =>
    {
      console.log(xhr.statusText+': '+xhr.responseJSON.error);
    }
  }); // end of ajax for populating dropdown menu

}); // end of document ready


// modal stuff
const modal = $('#myModal');

function showModal(medicinename, medicine_id, id)
{
  modal.attr('style', 'display:block');
  $('#modal-header').text(medicinename);
  $('.modal-body').text('Select to mark as taken or view medicine info');
  $('#medicine_id-modal').text(medicine_id);
  $('#medicine_id-modal').hide();
  $('#div_id-modal').text(id);
  $('#div_id-modal').hide();
}

$('#moreInfo').click(() =>
{
  const medicine_id = $('#medicine_id-modal').text()
  post('/viewPillDetail/'+medicine_id);
});

function markTaken()
{
  const id = $('#div_id-modal').text();
  const taken_yes = $('.taken_yes_'+id);
  const taken_no = $('.taken_no_'+id);

  if ($('#taken_text_'+id).text() == 'No ') // not taken; mark as taken
  {
    taken_yes.removeClass('notShown');
    taken_yes.addClass('flex-center');
    taken_no.hide();
    taken_yes.show();

    $('#div_id_'+id).attr('style', 'background-color:#E2FED3');
    $('#taken_text_'+id).text('Yes ');
  }
  else // taken; mark as not taken
  {
    taken_no.removeClass('notShown');
    taken_no.addClass('flex-center');
    taken_yes.hide();
    taken_no.show();

    $('#div_id_'+id).attr('style', 'background-color:#FDCFD5');
    $('#taken_text_'+id).text('No ');
  }

  $('.close-modal').click();

  
  
}

function addNewMed()
{
  post('/addNewMed/'+$('#profile_id').text());
}

function viewAllMed()
{
  post('/viewAllMed/'+$('#profile_id').text());
}


