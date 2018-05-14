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

        // append by creating element rather than by using string; this allows for attachment of an
        // onclick function
        const htmlString = 
          '<a>'
        +   '<div class="view-profile-box border-black">'
        +     '<div class="flex-center"><img class="profile-image-view" src="/images/icons/user.svg" alt=""></div>'
        +     '<div class="flex-center box-title">'+e.firstName + ' ' + e.lastName +'</div>'
        +   '</div>'
        + '</a>';

        let div = document.createElement('div');
        div.innerHTML = htmlString.trim();

        // onclick function
        div.firstChild.addEventListener( 'click', () =>
        {
          const body = {account_id: account_id, 
                        profile_id: e.id, 
                        token: window.localStorage.getItem("token")}
          post('/viewProfile', body);
        });

        $('.view-profile-box-list').append(div.firstChild);
      }
    },
    error: (xhr, textStatus, error) =>
    {
      console.log(xhr.statusText+': '+xhr.responseJSON.error);
    }

  });
});


// function to allow rendering page with post request (rather than changing html)
function post(path, params, method) {
  method = method || "post"; // Set method to post by default if not specified.

  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  for(var key in params) {
    if(params.hasOwnProperty(key)) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}
