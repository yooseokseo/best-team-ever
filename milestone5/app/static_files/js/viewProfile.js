$(document).ready(() => {

  // when a user clicks "Edit" button, Edit => Save, Delete => Cancel
  $('#editProfile').click(()=>{
    $('#firstname').attr('disabled', false);
    $('#lastname').attr('disabled', false);
    $('#dob').attr('disabled', false);
    $('#gender-male').attr('disabled', false);
    $('#gender-female').attr('disabled', false);
    $('#gender-other').attr('disabled', false);
    $('#setDefault').attr('disabled', false);
    $('#editProfile').hide();
    $('#saveProfile').removeClass('saveProfile-close');
    $('#deleteProfile').hide();
    $('#cancelProfile').removeClass('cancelProfile-close');

  })

  $('#deleteProfile').click(()=>{
    // should run Ajax call to delete profile


    
    // after deleting is done
    // go back to previous page
    backtopage();
  });

  // return page to normal un-editable page
  $('#cancelProfile').click(()=>
  {
    $('#deleteProfile').show();
    $('#cancelProfile').addClass('cancelProfile-close');
    $('#editProfile').show();
    $('#saveProfile').addClass('saveProfile-close');
    $('#firstname').attr('disabled', true);
    $('#lastname').attr('disabled', true);
    $('#dob').attr('disabled', true);
    $('#gender-male').attr('disabled', true);
    $('#gender-female').attr('disabled', true);
    $('#gender-other').attr('disabled', true);
    $('#setDefault').attr('disabled', true);
  })


});

function save(profile_id)
  {

    var body = {};

    const male = ($('#gender-male').is(":checked"))? 'male' : undefined;
    const female = ($('#gender-female').is(":checked"))? 'female' : undefined;
    const other = ($('#gender-other').val())? $('#gender-other').val() : undefined;
    const gender = male || female || other;


    // only send PATCH request for values that user want to update (non-empty values)
    // check if input value is empty; if not empty, add it to body, otherwise do nothing
    ($('#firstname').val() == '')? {} : body.firstName = $('#firstname').val();
    ($('#lastname').val() == '')?  {} : body.lastName = $('#lastname').val();
    ($('#dob').val() == '')?       {} : body.dob = $('#dob').val();
    (!gender)?                     {} : body.gender = gender;

    console.log(body);


    if ( !(jQuery.isEmptyObject(body)) )
    {
      $.ajax({
        url: '/api/profiles/edit/'+profile_id,
        type: 'PATCH',
        dataType : 'json', // this URL returns data in JSON format
        data: body,
        beforeSend: (xhr) => {   //Include the bearer token in header
          xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
        },
        success: (data) => {
          console.log('edited', data);
        },
        error: (xhr, textStatus, error) => 
        {
          console.log(xhr.statusText+': '+xhr.responseJSON.error);
        }
      });
    }
    // after saving is done, return to default page (not editable)
    $('#cancelProfile').click();

  }


function check(id){
  var checkbox = document.getElementsByName("checkbox");
  Array.prototype.forEach.call(checkbox,function(el){
    el.checked = false;
  });
  id.checked = true;
}
