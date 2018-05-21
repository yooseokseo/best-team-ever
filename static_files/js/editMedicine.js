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
});

// click on color; remove previous highlight and highlight the clicked color
$('.color').click(function(){
   rmSelect('c');
   $(this).addClass('selected-color'); // adds the class to the clicked color
});
