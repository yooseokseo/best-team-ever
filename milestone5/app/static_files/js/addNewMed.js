$(document).ready(() => {

})


function createMedicine(profile_id)
{
  //check if input fields are blank
  if ($('#medicinename').val() == '')
  {
    alert('Please enter all info');
  }
  else
  {
    var body = {
                 'medicinename' : $('#medicinename').val(),
                 'dosage' : $('#dosage').val(),
                 'num_pills' : $('#numPills').val(),
                 'recurrence_hour' : $('#recurrence_hour').val(),
                 'times_per_day' : $('#recurrence_day').val(),
                 'start_date' : $('#startDate').val(),
                 'start_time' : $('#startTime').val(),
                 'end_date' : $('#endDate').val(),
                 'end_time' : $('#endTime').val(),
                 'med_type' : $('#medType').val(),
                 'med_color' : $('#medColor').val(),
               };

    const requestURL = '/api/medicine/new/'+profile_id;
    $.ajax({
      // all URLs are relative to http://localhost:3000/
      url: requestURL,
      type: 'POST',
      dataType : 'json', // this URL returns data in JSON format
      data: body,
      beforeSend: (xhr) => {   //Include the bearer token in header
          xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
      },
      success: (data) => {
        console.log('You received some data!', data);
        post('/home')


      },
      error: (xhr, textStatus, error) =>
      {

      }
    });
  } // end of else

} // end of createMedicine()


/**
 * Helper function for deselecting color around the pill image and color circle
 * @params {type} specifies whether to remove from pill image or color circle
 */
function rmSelect(type)
{
  if (type == 's') // remove highlight around pill shapes
  {
    $('.selected-oval').removeClass('selected-oval'); 
    $('.selected-circle').removeClass('selected-circle');
  }
  else // remove around color
  {
    console.log('color');
    $('.selected-color').removeClass('selected-color'); 
  }

}

// click any of the pill images
$('#hole').click(() => { rmSelect('s'); $('#hole').addClass('selected-circle'); } );
$('#circle').click(() => { rmSelect('s'); $('#circle').addClass('selected-circle'); } );
$('#split').click(() => { rmSelect('s'); $('#split').addClass('selected-oval'); } );
$('#oval').click(() => { rmSelect('s'); $('#oval').addClass('selected-oval'); } );

// click any of the color circles
$('.color').click(function(){
   rmSelect('c');
   $(this).addClass('selected-color'); // adds the class to the clicked color
});
