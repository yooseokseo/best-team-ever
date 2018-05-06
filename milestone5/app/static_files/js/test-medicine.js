// jQuery convention for running when the document has been fully loaded:
$(document).ready(() => {

/*
   * Shows list of all of user's profile. Must be logged in
   * Makes GET request to /medicine
   */
  $('#getAllMedicine').click(() =>
  {
    const requestURL = '/medicine';
    console.log('requestURl = '+requestURL);
    console.log('making ajax request to:', requestURL);

    $.ajax({
      url: requestURL,
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
  });

  /*
   * View info for a specific medicine. Must be logged in
   * Makes GET request to /medicine/:medicinename/:medicine_id
   */
  $('#getMedicine').click(() => {

  	//check if input fields are blank
  	if ($('#medicineName').val().trim() == '' || $('#medicine_id').val().trim() == '') 
  	{
  		alert('Please enter info');
  		$('#infoDiv').html('');
        $('#status').html('');
  		return; 
  	}

    const requestURL = 'medicine/' + $('#medicineName').val() + '/' + $('#medicine_id').val();
    console.log('making ajax request to:', requestURL);


    $.ajax({
      // all URLs are relative to http://localhost:3000/
      url: requestURL,
      type: 'GET',
      dataType : 'json', // this URL returns data in JSON format
      beforeSend: function (xhr) {   //Include the bearer token in header
          xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
      },
      success: (data) => {
        console.log('You received some data!', data);
        $('#status').html('Successfully fetched data (GET request) at URL: ' + requestURL);
        $('#infoDiv').html(JSON.stringify(data));
      },
      error: (xhr, textStatus, error) => 
      {
        $('#infoDiv').html('');
        $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });
  });

  $('#createMedicine').click(()=>
  {
  	//check if input fields are blank
  	if ($('#medicinename').val().trim() == '') 
  	{
  		alert('Please enter all info');
  		$('#infoDiv').html('');
        $('#status').html('');
  		return; 
  	}

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

  	const requestURL = '/medicine/new';
  	$.ajax({
      // all URLs are relative to http://localhost:3000/
      url: requestURL,
      type: 'POST',
      dataType : 'json', // this URL returns data in JSON format
      data: body,
      beforeSend: function (xhr) {   //Include the bearer token in header
          xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
      },
      success: (data) => {
        console.log('You received some data!', data);
        $('#status').html('Successfully fetched data (GET request) at URL: ' + requestURL);
        $('#infoDiv').html(JSON.stringify(data));
      },
      error: (xhr, textStatus, error) => 
      {
        $('#infoDiv').html('');
        $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });

  });

});