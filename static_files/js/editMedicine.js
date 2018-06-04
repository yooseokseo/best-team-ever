/*
  FileName : editMedicine.js
  Brief Description :
    Medicine's info is edited by user with updated data
    New data is saved
*/

$(document).ready(() => {
  
  const oldValues = 
  {
    medicinename : $('#medicinename').val(),
    dosage : $('#dosage').val(),
    num_pills : $('#num_pills').val(),
    recurrence_hour : $('#recurrence_hour').val(),
    times_per_day : $('#times_per_day').val(),
    start_date : $('#start_date').val(),
    start_time : $('#start_time').val(),
    end_date : $('#end_date').val(),
    end_time : $('#end_time').val(),
    med_type : $('#shape-name').text(),
    med_color : $('#color-name').text(),
    note : $('#note').val()
  }
  oldVal(oldValues);

});

// old values for checking if user changed something
let oldValues;
function oldVal(oldValues)  
{
  this.oldValues = oldValues;
}

function save(medicine_id)
{
  const newValues = 
  {
    medicinename : $('#medicinename').val(),
    dosage : $('#dosage').val(),
    num_pills : $('#num_pills').val(),
    recurrence_hour : $('#recurrence_hour').val(),
    times_per_day : $('#times_per_day').val(),
    start_date : $('#start_date').val(),
    start_time : $('#start_time').val(),
    end_date : $('#end_date').val(),
    end_time : $('#end_time').val(),
    med_type : $('#shape-name').text(),
    med_color : $('#color-name').text(),
    note : $('#note').val()
  };


  // compare old and new values and find items that were changed
  let body = {};
  for (const e in newValues)
  {
  	( newValues[e] != this.oldValues[e] )? body[e] = newValues[e] : {};
  }
  console.log('editing: ', body);

  if ( !(jQuery.isEmptyObject(body)) )
  {
  	$.ajax({
      url: '/api/medicine/edit/'+medicine_id,
      type: 'PATCH',
      dataType : 'json', // this URL returns data in JSON format
      data: body,
      beforeSend: (xhr) => {   //Include the bearer token in header
        xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
      },
      success: (data) => {
        console.log('edited', data);
        post('/viewPillDetail/'+medicine_id);
      },
      error: (xhr, textStatus, error) => 
      {
        console.log(xhr.statusText+': '+xhr.responseJSON.error);
      }
    });
  }

}


function check (shape, color)
{
	// adding class to shape
	const type = (shape == 'oval' || shape == 'split')? 'oval' : 'circle'
	const select = 'selected-'+type;
	$("[id*="+shape+"]").addClass(select);


	// adding class to color
	$("[id*="+color+"]").addClass('selected-color');
}

/**
 * Helper function for deselecting color around the pill image and color circle
 * @params {type} specifies whether to remove from pill image or color circle
 */
function rmSelect(type)
{
  if (type == 's') // remove highlight around pill shapes
  {
    $('.selected-oval').removeClass('selected-oval'); 
    $('.selected-circle').removeClass('selected-circle');
  }
  else // remove around color
  {
    $('.selected-color').removeClass('selected-color'); 
  }

}

// click on shape; remove previous highlight and highlight the clicked shape
$('.shape').click((e) =>
{
	rmSelect('s');
	const type = (e.target.id == 'oval' || e.target.id == 'split')? 'oval' : 'circle';
	$("[id*="+e.target.id+"]").addClass('selected-'+type);
	$("#shape-name").text(e.target.id);
});

// click on color; remove previous highlight and highlight the clicked color
$('.color').click(function(){
   rmSelect('c');
   $(this).addClass('selected-color'); // adds the class to the clicked color
   $("#color-name").text(this.id);
});
