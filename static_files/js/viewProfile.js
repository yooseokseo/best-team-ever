$(document).ready(() => {

  const firstName = $('#firstname').val();
  const lastName = $('#lastname').val();
  const dob = $('#dob').val();
  const isDefault = $('#setDefault').is(":checked")

  const male = ($('#gender-male').is(":checked"))? 'male' : undefined;
  const female = ($('#gender-female').is(":checked"))? 'female' : undefined;
  const other = ($('#gender-other').val())? $('#gender-other').val() : undefined;
  const gender = male || female || other;

  
  oldVal(firstName, lastName, dob, gender, isDefault);

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
  });



});

// old values for checking if user changed something
let firstName, lastName, dob, gender, isDefault;
function oldVal(firstName, lastName, dob, gender, isDefault)  
{
  this.firstName = firstName;
  this.lastName = lastName;
  this.dob = dob;
  this.gender = gender;
  this.isDefault = isDefault;
}

function save(profile_id)
{
  
  var body = {};

  const male = ($('#gender-male').is(":checked"))? 'male' : undefined;
  const female = ($('#gender-female').is(":checked"))? 'female' : undefined;
  const other = ($('#gender-other').val())? $('#gender-other').val() : undefined;
  const gender = male || female || other;
  const isDefault = $('#setDefault').is(":checked");


  // only send PATCH request for values that user want to update (changed values)
  // check if input value is changed; if changed, add it to body, otherwise do nothing
  ($('#firstname').val() != this.firstName)? body.firstName = $('#firstname').val() : '';
  ($('#lastname').val() != this.lastName)?   body.lastName = $('#lastname').val() : '';
  ($('#dob').val() != this.dob)?             body.dob = $('#dob').val() : '';
  (gender != this.gender)?                   body.gender = gender : '';
  (isDefault != this.isDefault)?             body.isDefault = 1 : '';


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

function deleteProfile (profile_id) 
{    
  $.ajax({
    url: '/api/profiles/delete/'+profile_id,
    type: 'DELETE',
    dataType : 'json', // this URL returns data in JSON format
    beforeSend: (xhr) => {   //Include the bearer token in header
      xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
    },
    success: (data) => {
      alert('profile deleted')
      backtopage();
    },
    error: (xhr, textStatus, error) => 
    {
      console.log(xhr.statusText+': '+xhr.responseJSON.error);
    }
  });
}// end of delete profile


function check(id){
  var checkbox = document.getElementsByName("checkbox");
  Array.prototype.forEach.call(checkbox,function(el){
    el.checked = false;
  });
  id.checked = true;
}
