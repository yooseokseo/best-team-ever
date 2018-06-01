$(document).ready(() => {
	
  // check taken box
	if ( $('#isTaken').text() == 'Yes' )
		$('#taken-yes').prop('checked', true);
  else
    $('#taken-no').prop('checked', true);
  $('#isTaken').hide();

  const date = $('#date').val();
  const time = $('#time').val();
  const taken_yes = ($('#taken-yes').is(":checked"))? 'Yes' : undefined;
  const taken_no = ($('#taken-no').is(":checked"))? 'No' : undefined;
  const isTaken = taken_yes || taken_no;

  oldVal(date, time, isTaken);

  // when a user clicks "Edit" button, Edit => Save, Delete => Cancel
  $('#editHistory').click(()=>{
    
    $('#taken-yes').attr('disabled', false);
    $('#taken-no').attr('disabled', false);
    $('#date').attr('disabled', false);
    $('#time').attr('disabled', false);
    
    $('#editHistory').hide();
    $('#saveHistory').removeClass('saveHistory-close');
    $('#deleteHistory').hide();
    $('#cancelHistory').removeClass('cancelHistory-close');

  })

  // return page to normal un-editable page
  $('#cancelHistory').click(()=>
  {
  	$('#taken-yes').attr('disabled', true);
    $('#taken-no').attr('disabled', true);
    $('#date').attr('disabled', true);
    $('#time').attr('disabled', true);

    $('#deleteHistory').show();
    $('#cancelHistory').addClass('cancelHistory-close');
    $('#editHistory').show();
    $('#saveHistory').addClass('saveHistory-close');
  });


  // close popup modal
  $('.close-modal').click(() =>
  {
    modal.attr('style', 'display:none');
  });



}); // end of document ready


// old values for checking if user changed something
let date, time, isTaken;
function oldVal(date, time, isTaken)  
{
  this.date = date;
  this.time = time;
  this.isTaken = isTaken;
}

function save(history_id)
{
  var body = {};

  const taken_yes = ($('#taken-yes').is(":checked"))? 'Yes' : undefined;
  const taken_no = ($('#taken-no').is(":checked"))? 'No' : undefined;
  const isTaken = taken_yes || taken_no;
  $('#isTaken').hide();


  // only send PATCH request for values that user want to update (changed values)
  // check if input value is changed; if changed, add it to body, otherwise do nothing
  ($('#date').val() != this.date)? body.date = $('#date').val() : '';
  ($('#time').val() != this.time)? body.time = $('#time').val() : '';
  (isTaken != this.isTaken)?       body.isTaken = isTaken : '';

  console.log(body);
  if ( !(jQuery.isEmptyObject(body)) )
  {
    $.ajax({
      url: '/api/history/edit/'+history_id,
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
  $('#cancelHistory').click();

}




function check(id){
  var checkbox = document.getElementsByName("checkbox");
  Array.prototype.forEach.call(checkbox,function(el){
    el.checked = false;
  });
  id.checked = true;
}