$(document).ready(() => {
  $('#editProfile').click(()=>{
    $('#firstname').attr('disabled', false);
    $('#lastname').attr('disabled', false);
    $('#dob').attr('disabled', false);
    $('#editProfile').hide();
    $('#saveProfile').removeClass('saveProfile-close');
  })
})
