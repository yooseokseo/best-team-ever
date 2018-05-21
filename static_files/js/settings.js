$(document).ready(() => {

  const email = $('#email').val();
  const username = $('#username').val();
  oldVal(email, username);

  // when a user clicks "Edit" button, Edit => Save, Delete => Cancel
  $('#editAccount').click(()=>{
    $('#email').attr('disabled', false);
    $('#username').attr('disabled', false);
    $('#editAccount').hide();
    $('#saveAccount').removeClass('saveAccount-close');
    $('#deleteAccount').hide();
    $('#cancelAccount').removeClass('cancelAccount-close');

  })

  // return page to normal un-editable page
  $('#cancelAccount').click(()=>
  {
    $('#deleteAccount').show();
    $('#cancelAccount').addClass('cancelAccount-close');
    $('#editAccount').show();
    $('#saveAccount').addClass('saveAccount-close');
    $('#username').attr('disabled', true);
    $('#email').attr('disabled', true);
  });



});

// old values for checking if user changed something
let email, username;
function oldVal(email, username)  
{
  this.email = email;
  this.username = username;
}

function save()
{
  
  var body = {};

  // only send PATCH request for values that user want to update (changed values)
  // check if input value is changed; if changed, add it to body, otherwise do nothing
  ($('#email').val() != this.email)?         body.email = $('#email').val() : '';
  ($('#username').val() != this.username)?   body.username = $('#username').val() : '';
  console.log(body);


  if ( !(jQuery.isEmptyObject(body)) )
  {
    $.ajax({
      url: '/api/accounts/edit/',
      type: 'PATCH',
      dataType : 'json', // this URL returns data in JSON format
      data: body,
      beforeSend: (xhr) => {   //Include the bearer token in header
        xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
      },
      success: (data) => {
        console.log('edited', data);
        window.localStorage.setItem("token", data.token);
      },
      error: (xhr, textStatus, error) => 
      {
        console.log(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });
  }
  // after saving is done, return to default page (not editable)
  $('#cancelAccount').click();
}

function deleteAccount () 
{    
  $.ajax({
    url: '/api/Accounts/delete/',
    type: 'DELETE',
    dataType : 'json', // this URL returns data in JSON format
    beforeSend: (xhr) => {   //Include the bearer token in header
      xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
    },
    success: (data) => {
      alert('Account deleted')
      window.location.href = '/';
      window.localStorage.setItem("token", "");
    },
    error: (xhr, textStatus, error) => 
    {
      console.log(xhr.statusText+': '+xhr.responseJSON.error);
    }
  });
}// end of delete Account

