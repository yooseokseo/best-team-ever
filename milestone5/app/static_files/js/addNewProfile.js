$(document).ready(() => {
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

    const requestURL = '/api/profiles/new';
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
        /*
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
        */

      },
      error: (xhr, textStatus, error) =>
      {
        $('#infoDiv').html('');
        $('#status').html(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });
  }); // end of create new profile
})
