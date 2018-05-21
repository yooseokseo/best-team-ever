$(document).ready(() => {
  
  const oldValues = 
  {
    medicinename : $('#medicinename').val(),
    dosage : $('#dosage').val(),
    num_pills : $('#num_pills').val(),
    recurrence_hour : $('#recurrence_hour').val(),
    times_per_day : $('#times_per_day').val(),
    start_date : $('#start_date').val(),
    start_time : $('#start_time').val(),
    end_date : $('#end_date').val(),
    end_time : $('#end_time').val(),
    med_type : $('.selected-circle, .selected-oval')[0],
    med_color : $('.selected-color')[0],
    note : $('#note').val()
  }
  oldVal(oldValues);

});

// old values for checking if user changed something
let oldValues;
function oldVal(oldValues)  
{
  this.oldValues = oldValues;
}


function createMedicine(profile_id)
{
  //check if input fields are blank
  if ($('#medicinename').val() == '')
  {
    alert('Please enter all info');
  }
  else
  {
    // determine type and color; leave as blank if not determined
    const med_type = $('.selected-circle, .selected-oval')[0];
    const med_color = $('.selected-color')[0];

    var body = {
                 'medicinename' : $('#medicinename').val(),
                 'dosage' : $('#dosage').val(),
                 'num_pills' : $('#numPills').val(),
                 'recurrence_hour' : $('#recurrence_hour').val(),
                 'times_per_day' : $('#recurrence_day').val(),
                 'start_date' : $('#start_date').val(),
                 'start_time' : $('#start_time').val(),
                 'end_date' : $('#end_date').val(),
                 'end_time' : $('#end_time').val(),
                 'med_type' : (med_type)? med_type.id : '',
                 'med_color' : (med_color)? med_color.id : '',
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
    $('.selected-color').removeClass('selected-color'); 
  }

}

// click on shape; remove previous highlight and highlight the clicked shape
$('.shape').click((e) =>
{
  rmSelect('s');
  const type = (e.target.id == 'oval' || e.target.id == 'split')? 'oval' : 'circle';
  $("[id*="+e.target.id+"]").addClass('selected-'+type);
});

// click on color; remove previous highlight and highlight the clicked color
$('.color').click(function(){
   rmSelect('c');
   $(this).addClass('selected-color'); // adds the class to the clicked color
});