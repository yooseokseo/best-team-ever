// jQuery convention for running when the document has been fully loaded:
$(document).ready(() => {

  $('#newProfile-display-button').click(() =>
  {
    const text = $('#newProfile-display-button').text();
    if (text == 'Hide')
    {
      $('#newProfile-div').hide();
      $('#newProfile-display-button').text('Show');
    }
    else
    {
      $('#newProfile-div').show();
      $('#newProfile-display-button').text('Hide');
    }
  });

/*
   * Shows list of all of user's profile. Must be logged in
   * Makes GET request to /profiles
   */
  $('#getAllProfiles').click(() =>
  {
    const requestURL = '/profiles';
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

        // display list of profiles and make each one clickable
        // clicking on a profile gets that profile's information
        $('#infoDiv').html('Profiles: ');
        data.forEach(e =>
        {
          let info = document.createElement('a');
          info.setAttribute('href', "#");
          info.appendChild( 
            document.createTextNode( e.firstName+' '+e.lastName+' (id: '+e.id+')' ) 
          );
          // fill out first name, last name, and id fields and click 'getProfile'
          info.addEventListener( 'click', () =>
          {
            $('#nameBoxFirst').val(e.firstName);
            $('#nameBoxLast').val(e.lastName);
            $('#profile_id').val(e.id);
            $('#getProfile').click();
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
   * Makes GET request to /profiles/:profilename/:profile_id
   * If click on displayed profile, hide "create profile" button and show
   * "edit profile"  and "delete profile" buttons instead
   */
  $('#getProfile').click(() => {

  	//check if input fields are blank
  	if ($('#profile_id').val() == '') 
  	{
  		alert('Please profile ID');
  		$('#infoDiv').html('');
      $('#status').html('');
  		return; 
  	}

    const id = $('#profile_id').val();
    const requestURL = 'profiles/'+ id;
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
        
        window.localStorage.setItem("token", data.token); //store authorization token

        // returned data also contains token; delete token so we don't have to display it
        delete data.token;

        // show profile and make it clickable; clicking gives option to edit or delete
        $('#infoDiv').html('Profile: (click to edit or delete)');
        let info = document.createElement('a');
        info.setAttribute('href', '#');
        info.appendChild( document.createTextNode( JSON.stringify(data) ) );
        info.addEventListener('click', () =>
        {
          $('#new_profile_text').text('Edit/Delete profile')
          
          //show field if it's not already shown
          $('#newProfile-div').show();
          $('#newProfile-display-button').text('Hide');

          $('#createProfile').hide();
          $('#editProfile').show();
          $('#deleteProfile').show();
          $('#cancelEditProfile').show();
          event.preventDefault();
        });
        $('#infoDiv').append(info);


        $('#new_medicine_text').text('New medicine for '+data.firstName+' '+data.lastName);
        $('#nameBoxFirst').val(data.firstName);
        $('#nameBoxLast').val(data.lastName);
        $('#medicine-new').show();
        $('#getAllMedicine').text('Get '+data.firstName+' '+data.lastName+'\'s medicine list');
        $('#lookupMedicine_hidden').show();

      },
      error: (xhr, textStatus, error) => 
      {
        $('#infoDiv').html('');
        $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });
  });


  /*
   * Create new profile for the currently logged in user.
   * Makes POST request to /profiles/new
   * After creating, give option to view profile. Also change all texts
   * with name to represent the created profile. Show medicine options for
   * created profile.
   */
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
                 'profilename' : $('#firstname').val().trim()+$('#lastname').val().trim(),
                 'firstName' : $('#firstname').val(),
                 'lastName': $('#lastname').val(),
                 'gender' : $('#gender').val(),
                 'dob' : $('#dob').val()
               };

  	const requestURL = '/profiles/new';
    console.log('making ajax request to: '+requestURL);
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
        window.localStorage.setItem("token", data.token); //store authorization token

        // show 'profile created' message and give option to view
        $('#infoDiv').html('Profile created: ');
        let info = document.createElement('a');
        info.setAttribute('href', '#');
        info.appendChild( document.createTextNode( 'click here to view' ) );
        info.addEventListener('click', () =>
        { 
          $('#profile_id').val(data.id);         
          $('#getProfile').click();
          event.preventDefault();
        });
        $('#infoDiv').append(info);

        // change text to display newly created profile's name
        $('#nameBoxFirst').val($('#firstname').val())
        $('#nameBoxLast').val($('#lastname').val());
        $('#new_medicine_text').text('New medicine for '+$('#firstname').val()+' '+$('#lastname').val())
        $('#medicine-new').show();
        $('#getAllMedicine').text('Get '+$('#firstname').val()+' '+$('#lastname').val()+'\'s medicine list');
        $('#lookupMedicine_hidden').show();

      },
      error: (xhr, textStatus, error) => 
      {
        $('#infoDiv').html('');
        $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });
  }); // end of create new profile


  /* 
   * Edit profile. After editing, click "get profile" to view the newly
   * edited profile
   */
  $('#editProfile').click(() =>
  {
    var body = {};

    // only send PATCH request for values that user want to update (non-empty values)
    // check if input value is empty; if not empty, add it to body, otherwise do nothing
    ($('#firstname').val() == '')? {} : body.firstName = $('#firstname').val();
    ($('#lastname').val() == '')?  {} : body.lastName = $('#lastname').val();
    ($('#dob').val() == '')?       {} : body.dob = $('#dob').val();
    ($('#gender').val() == '')?    {} : body.gender = $('#gender').val();
    console.log(body);

    const requestURL = '/profiles/edit/'+$('#profile_id').val();
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
        
        // show the edited profile
        $('#profile_id').val(data.id);
        $('#getProfile').click();
      },
      error: (xhr, textStatus, error) => 
      {
        $('#infoDiv').html('');
        $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });
  }); // end of edit profile
  
  
  /**
   * Delete profile. After deleting hide all medicine fields since medicine
   * corresponds to profile and there's no "current" profile.
   */
  $('#deleteProfile').click(() =>
  {
    const body = {};
    const requestURL = '/profiles/delete/'+$('#profile_id').val();
    $.ajax({
      // all URLs are relative to http://localhost:3000/
      url: requestURL,
      type: 'DELETE',
      dataType : 'json', // this URL returns data in JSON format
      data: body,
      beforeSend: function (xhr) {   //Include the bearer token in header
          xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
      },
      success: (data) => {
        console.log('You received some data!', data);
        $('#status').html('Successfully fetched data (GET request) at URL: ' + requestURL);
        
        $('#medicine-new').hide();
        $('#lookupMedicine_hidden').hide();
        $('#cancelEditProfile').click();
        
        $('#infoDiv').html('Profile deleted; try doing "get profile" to check');
      },
      error: (xhr, textStatus, error) => 
      {
        $('#infoDiv').html('');
        $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });
  }); // end of delete profile
  

  /* 
   * exit edit/delete profile mode; returns to normal 'create profile' mode
   */
  $('#cancelEditProfile').click(() =>
  {
    $('#editProfile').hide();
    $('#deleteProfile').hide();
    $('#cancelEditProfile').hide();
    $('#createProfile').show();
    testauth();
  });

});