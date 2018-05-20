function backtopage() {

	// splitting '/viewProfiles/1' returns ['', 'viewProfiles', '1']
  const path = window.location.pathname.split('/')[1];
  
  if (path == 'viewProfile' || path == 'addNewProfile')
  {
  	post('/viewProfiles');
  }
  else
  {
  	window.history.back();
  }
  
}
//Ajax Function 1
//after loading page, based on current user, it should fetch
//a list of user profiles into ".profile-list-container" class
//in home.handlebars
//also it should indicate current profile page
//one of them should be a default profile.

$('.tri-svg').click(() => {
  $('.tri-svg').toggleClass('down-nav-clicked');
  $('.user-profile-container').toggleClass('user-profile-container-down');
})

$('.sign-up-btn').click(()=> {
  $('.sign-up-page-container').css('transform', 'none');
})

$('#sign-up-cancel-btn').click(()=>{
  $('.sign-up-page-container').css('transform', 'translate(100%, 0)');
})

// need to refactor
$('.pill-date-item-march').click(()=>{
  $('.pill-date-item-cal-march').toggleClass('pill-date-item-shown');
})


