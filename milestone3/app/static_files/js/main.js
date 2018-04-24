function backtopage() {
  window.history.back();
}
//Ajax Function 1
//after loading page, based on current user, it should fetch
//a list of user profiles into ".profile-list-container" class
//in home.handlebars
//also it should indicate current profile page
//one of them should be a default profile.

$(document).ready(
  // need Ajax Function1 here
  $('.tri-svg').click( () => {
    console.log('clicked');
    $('.tri-svg').toggleClass('down-nav-clicked');
    $('.user-profile-container').toggleClass('user-profile-container-down');
  })
);
