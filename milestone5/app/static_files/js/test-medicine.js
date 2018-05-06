// jQuery convention for running when the document has been fully loaded:
$(document).ready(() => {

/*
   * Shows list of all of user's profile. Must be logged in
   * Makes GET request to /accounts/:username/profiles
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

        $('#infoDiv').html('Medicine: ');
        data.forEach(e =>
        {
          let info = document.createElement('a');
          info.setAttribute('href', "#");
          info.appendChild( 
            document.createTextNode( e.name + ' (id: '+e.id+')' ) 
          );
          info.addEventListener( 'click', () =>
          {
            $('#medicineName').val(e.name);
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
   * View info for a specific profile. Must be logged in
   * Makes GET request to /accounts/:username/:profilename
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

    // From: http://learn.jquery.com/ajax/jquery-ajax-methods/
    // Using the core $.ajax() method since it's the most flexible.
    // ($.get() and $.getJSON() are nicer convenience functions)
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
        
        //window.localStorage.setItem("token", data.token); //store authorization token

        // returned data also contains token; delete token so we don't have to display it
        //delete data.token;
        $('#infoDiv').html(JSON.stringify(data));

        //$('#profile-new').show();
        //$('#medicine-new').show();
        //$('#getAllMedicine').text('Get '+data.firstName+' '+data.lastName+'\'s medicine list');
        //$('#lookupMedicine_hidden').show();

      },
      error: (xhr, textStatus, error) => 
      {
        $('#infoDiv').html('');
        $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });
  });

  $('#createProfile').click(()=>
  {
  	//check if input fields are blank
  	if ($('#firstname').val().trim() == '' || $('#lastname').val().trim() == '' ||
  		$('#gender').val().trim() == '' || $('#dob').val().trim() == '') 
  	{
  		alert('Please enter all info');
  		$('#infoDiv').html('');
        $('#status').html('');
  		return; 
  	}

  	var body = {
                 'username' : $('#createProfileUsername').val(),
                 'profilename' : $('#firstname').val().trim()+$('#lastname').val().trim(),
                 'firstName' : $('#firstname').val(),
                 'lastName': $('#lastname').val(),
                 'gender' : $('#gender').val(),
                 'dob' : $('#dob').val()
               };

  	const requestURL = '/profiles/new';
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