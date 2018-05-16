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
