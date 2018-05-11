$(document).ready(() => {
  const requestURL = 'api/profiles';
  console.log('making ajax request to:', requestURL);
  let token;

  $.ajax({
    url: requestURL,
    type: 'GET',
    dataType : 'json',
    beforeSend: function (xhr) {   //Include the bearer token in header
      xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
    },
    success: (data) =>
    {
      console.log(data);
      
      $('.view-profile-box-list').html('');
      for ( const e of data) {
        const account_id = window.localStorage.getItem("account_id");
        

        $('.view-profile-box-list').append('<div class="view-profile-box border-black">'
        + '<div class="flex-center"><img class="profile-image-view" src="/images/icons/user.svg" alt=""></div>'
        + '<a href="/viewProfile/'+account_id+'/'+e.id+'">'
        +    '<div class="flex-center box-title">'+e.firstName + ' ' + e.lastName +'</div>'
        +'</a></div>');
      }

      // $('.view-profile-box').click((e)=>{
      //   const e_id = e.target.id;
      //   const profile_id = e.target.id.substring(e_id.indexOf('-')+1, e_id.length);
      //   console.log('clicked on: '+e.target.textContent+' (id: '+profile_id+')');

        // $.ajax({
        //   url: '/viewProfile/'+profile_id,
        //   type: 'GET',
        //   success: (data)=>
        //   {
        //     console.log('successful fetch to /viewProfile');
        //     console.log(data);
        //   },
        //   error: (err) =>
        //   {
        //     console.log(err);
        //   }
        // });

      //});



    },
    error: (xhr, textStatus, error) =>
    {
      console.log(xhr.statusText+': '+xhr.responseJSON.error);
    }

  });
});
