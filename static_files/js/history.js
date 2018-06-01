$(document).ready(() => 
{
  // close popup modal
  $('.close-modal').click(() =>
  {
    modal.attr('style', 'display:none');
  });

  const isTaken = $('.isTaken');
  for (var i = 0; i < isTaken.length; i++) {

    let text = isTaken[i].textContent;

    if(text == 'Yes '){ // taken
      $('.isTakenImage-yes')[i].classList.remove('notShown');
      $('.isTakenImage-yes')[i].classList.add('flex-center');
      $('.view-pill-history-box')[i].setAttribute("style", "background-color:#E2FED3");
    }
    else { // Not taken
      $('.isTakenImage-no')[i].classList.remove('notShown');
      $('.isTakenImage-no')[i].classList.add('flex-center');
      $('.view-pill-history-box')[i].setAttribute("style", "background-color:#FDCFD5");
    }
  }

});


// modal stuff
const modal = $('#myModal');

function showModal(medicinename, medicine_id, id)
{
  const taken = $('#taken_text_'+id).text().split(' ').join('');
  if (taken == 'No')
  {
    $('.modal-body').text('Select to mark as taken or view medicine info');
    $('#markTaken').text('Mark as taken');
  }
  else
  {
    $('.modal-body').text('Select to mark as not taken or view medicine info');
    $('#markTaken').text('Mark as not taken');
  }

  modal.attr('style', 'display:block');
  $('#modal-header').text(medicinename);
  $('#medicine_id-modal').text(medicine_id);
  $('#medicine_id-modal').hide();
  $('#div_id-modal').text(id);
  $('#div_id-modal').hide();
}

$('#moreInfo').click(() =>
{
  const history_id = $('#div_id-modal').text()
  post('/viewHistoryDetail/'+history_id);
});


function markTaken()
{
  const id = $('#div_id-modal').text();
  const taken_yes = $('.taken_yes_'+id);
  const taken_no = $('.taken_no_'+id);
  const text = $('#taken_text_'+id).text().split(' ').join('');

  if ( text == 'No') // not taken; mark as taken
  {
    taken_yes.removeClass('notShown');
    taken_yes.addClass('flex-center');
    taken_no.hide();
    taken_yes.show();

    $('#div_id_'+id).attr('style', 'background-color:#E2FED3');
    $('#taken_text_'+id).text('Yes');
  }
  else // taken; mark as not taken
  {
    taken_no.removeClass('notShown');
    taken_no.addClass('flex-center');
    taken_yes.hide();
    taken_no.show();

    $('#div_id_'+id).attr('style', 'background-color:#FDCFD5');
    $('#taken_text_'+id).text('No');
  }

  $('.close-modal').click();

  // make ajax request to change taken status
  const body = { isTaken: $('#taken_text_'+id).text() }
  $.ajax({
    url: '/api/history/edit/'+id,
    type: 'PATCH',
    dataType : 'json', // this URL returns data in JSON format
    data: body,
    beforeSend: (xhr) => {   //Include the bearer token in header
      xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
    },
    error: (xhr, textStatus, error) => 
    {
      console.log(xhr.statusText+': '+xhr.responseJSON.error);
    }
  });  
}

function editHistory()
{
  const history_id = $('#div_id-modal').text();
  const body = { isTaken: 'Yes' };

  
}

