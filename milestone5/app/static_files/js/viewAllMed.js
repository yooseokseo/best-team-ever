$(document).ready(() => {
  //after this page is loaded
  //it should fetch a list of medications
  // need to know profile_id


    const requestURL = '/api/profiles/' +$('#profile-id-hidden').text();
    console.log('requestURl = '+requestURL);
    console.log('making ajax request to:', requestURL);

    $.ajax({
      url: requestURL,
      type: 'GET',
      dataType : 'json',
      beforeSend: function (xhr) {   //Include the bearer token in header
          xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
        },
      success: (data) => {
        console.log('You received some data!', data);
        /*
        <div class="med-item-box-all border-black">
          <div class="med-item-icon flex-center">
            <img class="pill-icon-img" src="/images/icons/pill.svg" alt="">
          </div>
          <div class="med-item-name flex-center med-name">
            C Complex
          </div>
        </div>
        */
        $('.view-all-med-list').html('');
        for (const e of data.medicine){
          $('.view-all-med-list').append(`<div class="med-item-box-all border-black">
            <div class="med-item-icon flex-center">
              <img class="pill-icon-img" src="/images/icons/pill.svg" alt="">
            </div>
            <div class="med-item-name flex-center med-name">
              ${e.medicinename}
            </div>
          </div>`);

        }




      },
      error: (xhr, textStatus, error) =>
      {

      }
    });


})
