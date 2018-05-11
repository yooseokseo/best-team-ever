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
    // should run Ajax call to edit profile



    // after saving is done,
    // Save => Edit , Cancel => Delete
    $('#deleteProfile').show();
    $('#cancelProfile').addClass('cancelProfile-close');
    $('#editProfile').show();
    $('#saveProfile').addClass('saveProfile-close');

  })
  $('#deleteProfile').click(()=>{
    // should run Ajax call to delete profile


    
    // after deleting is done
    // go back to previous page
    backtopage();
  })


})
