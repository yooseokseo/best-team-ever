$(document).ready(() => {

  // when a user clicks "Edit" button, Edit => Save, Delete => Cancel
  $('#editProfile').click(()=>{
    $('#firstname').attr('disabled', false);
    $('#lastname').attr('disabled', false);
    $('#dob').attr('disabled', false);
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
  })


});

function save(profile_id)
  {
    console.log('save');
    console.log('profile_id = '+profile_id);

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
      const host = 'http://localhost:3000'
      $.ajax({
        url: host+'/api/profiles/edit/'+profile_id,
        type: 'PATCH',
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
    


    // should run Ajax call to edit profile



    // after saving is done,
    // Save => Edit , Cancel => Delete
    $('#deleteProfile').show();
    $('#cancelProfile').addClass('cancelProfile-close');
    $('#editProfile').show();
    $('#saveProfile').addClass('saveProfile-close');

  }


function check(id){
  console.log($('#gender-male').is(":checked"));
  var checkbox = document.getElementsByName("checkbox");
  Array.prototype.forEach.call(checkbox,function(el){
    el.checked = false;
  });
  id.checked = true;
}