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
  $('#saveProfile').click(()=>{
    console.log('save');

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
    console.log(jQuery.isEmptyObject(body));

    if ( !jQuery.isEmptyObject(body) )
    {

    }
    


    // should run Ajax call to edit profile



    // after saving is done,
    // Save => Edit , Cancel => Delete
    $('#deleteProfile').show();
    $('#cancelProfile').addClass('cancelProfile-close');
    $('#editProfile').show();
    $('#saveProfile').addClass('saveProfile-close');

  });
  $('#deleteProfile').click(()=>{
    // should run Ajax call to delete profile


    
    // after deleting is done
    // go back to previous page
    backtopage();
  })


});

function check(id){
  console.log($('#gender-male').is(":checked"));
  var checkbox = document.getElementsByName("checkbox");
  Array.prototype.forEach.call(checkbox,function(el){
    el.checked = false;
  });
  id.checked = true;
}
