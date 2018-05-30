$(document).ready(() => {
  const isTaken = $('.isTaken');
  for (var i = 0; i < isTaken.length; i++) {

    let text = isTaken[i].textContent;

    if(text == 'Yes '){ // taken

      $('.isTakenImage-yes')[i].classList.remove('notShown');
      $('.isTakenImage-yes')[i].classList.add('flex-center');

    }
    else { // Not taken

      $('.isTakenImage-no')[i].classList.remove('notShown');
      $('.isTakenImage-no')[i].classList.add('flex-center');
    }
  }

});
