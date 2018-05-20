// function to allow rendering page with post request (rather than changing html)
function post(path, params, method) {
  method = method || "post"; // Set method to post by default if not specified.
  params = params || {}; // set to empty object by default
  params.token = window.localStorage.getItem("token");

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
