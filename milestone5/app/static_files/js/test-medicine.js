// jQuery convention for running when the document has been fully loaded:
$(document).ready(() => {

  /* hide or show div containing ability to create, edit, and delete
   * medicine to save space and make screen not too cluttered
   */
  $('#newMedicine-display-button').click(() =>
  {
    const text = $('#newMedicine-display-button').text();
    if (text == 'Hide')
    {
      $('#newMedicine-div').hide();
      $('#newMedicine-display-button').text('Show');
    }
    else
    {
      $('#newMedicine-div').show();
      $('#newMedicine-display-button').text('Hide');
    }
  });


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

        // show medicine and make it clickable; clicking gives option to edit or delete
        $('#infoDiv').html('Medicine: (click to edit or delete)');
        let info = document.createElement('a');
        info.setAttribute('href', '#');
        info.appendChild( document.createTextNode( JSON.stringify(data) ) );
        info.addEventListener('click', () =>
        {
          $('#new_medicine_text').text('Edit/Delete medicine')
          
          //show field if it's not already shown
          $('#newMedicine-div').show();
          $('#newMedicine-display-button').text('Hide');

          $('#createMedicine').hide();
          $('#editMedicine').show();
          $('#deleteMedicine').show();
          $('#cancelEditMedicine').show();
          event.preventDefault();
        });
        $('#infoDiv').append(info);
        // data.forEach(e =>
        // {
        //   let info = document.createElement('a');
        //   info.setAttribute('href', "#");
        //   info.appendChild( 
        //     document.createTextNode( e.medicinename + ' (id: '+e.id+')' ) 
        //   );
        //   // fill out medicine name and id fields and click 'getMedicine'
        //   info.addEventListener( 'click', () =>
        //   {
        //     $('#medicineName').val(e.medicinename);
        //     $('#medicine_id').val(e.id);
        //     $('#getMedicine').click();
        //     event.preventDefault();
        //   });
        //   $('#infoDiv').append(info);  
        //   $('#infoDiv').append( document.createTextNode(', ') );
        // });
        $('#status').html('Successfully fetched data (GET request) at URL: ' + requestURL);
        //$('#infoDiv').html(JSON.stringify(data));
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
  }); // end of createMedicine()

  


  $('#editMedicine').click(() =>
  {
    var body = {};

    // only send PATCH request for values that user want to update (non-empty values)
    // check if input value is empty; if not empty, add it to body, otherwise do nothing
    ($('#medicinename').val() == '')?    {} : body.medicinename = $('#medicinename').val();
    ($('#dosage').val() == '')?          {} : body.dosage = $('#dosage').val();
    ($('#numPills').val() == '')?        {} : body.num_pills = $('#numPills').val();
    ($('#recurrence_hour').val() == '')? {} : body.recurrence_hour = $('#recurrence_hour').val();
    ($('#recurrence_day').val() == '')?  {} : body.times_per_day = $('#recurrence_day').val();
    ($('#startDate').val() == '')?       {} : body.start_date = $('#startDate').val();
    ($('#startTime').val() == '')?       {} : body.start_time = $('#startTime').val();
    ($('#endDate').val() == '')?         {} : body.end_date = $('#endDate').val();
    ($('#endTime').val() == '')?         {} : body.end_time = $('#endTime').val();
    ($('#medType').val() == '')?         {} : body.med_type = $('#medType').val();
    ($('#medColor').val() == '')?        {} : body.med_color = $('#medColor').val();

    console.log(body);

    const requestURL = '/medicine/edit/'+$('#medicineName').val()+'/'+$('#medicine_id').val();
    $.ajax({
      // all URLs are relative to http://localhost:3000/
      url: requestURL,
      type: 'PATCH',
      dataType : 'json', // this URL returns data in JSON format
      data: body,
      beforeSend: function (xhr) {   //Include the bearer token in header
          xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
      },
      success: (data) => {
        console.log('You received some data!', data);
        $('#status').html('Successfully fetched data (GET request) at URL: ' + requestURL);
        
        // show the edited
        $('#medicineName').val(data.medicinename);
        $('#medicine_id').val(data.id);
        $('#getMedicine').click();
      },
      error: (xhr, textStatus, error) => 
      {
        $('#infoDiv').html('');
        $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });
  }); // end of createMedicine()
  

  $('#deleteMedicine').click(() =>
  {

  });
  

  /* 
   * exit edit/delete medicine mode; returns to normal 'create medicine' mode
   */
  $('#cancelEditMedicine').click(() =>
  {
    $('#editMedicine').hide();
    $('#deleteMedicine').hide();
    $('#cancelEditMedicine').hide();
    $('#createMedicine').show();
    $('#new_medicine_text').text('New medicine for '+$('#nameBoxFirst').val()+' '+$('#nameBoxLast').val())
  });

});