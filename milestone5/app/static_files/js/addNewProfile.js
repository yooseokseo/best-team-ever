$(document).ready(() => {
  $('#createProfile').click(()=>
  {

    //check if input fields are blank
    if ($('#firstname').val().trim() == '' || $('#lastname').val().trim() == '')
    {
      alert('Please enter all info');
    }

    else
    {
      var body = {};

      const male = ($('#gender-male').is(":checked"))? 'male' : undefined;
      const female = ($('#gender-female').is(":checked"))? 'female' : undefined;
      const other = ($('#gender-other').val())? $('#gender-other').val() : undefined;
      const gender = male || female || other;
      var body = {
                   'firstName' : $('#firstname').val(),
                   'lastName': $('#lastname').val(),
                   'gender' : gender,
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
        },
        error: (xhr, textStatus, error) =>
        {
          console.log(xhr.statusText+': '+xhr.responseJSON.error);
        }
      });
    }
  }); // end of create new profile
})
