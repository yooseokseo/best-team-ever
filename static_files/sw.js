/*
  FileName : sw.js
  Brief Description :
    Adding ‘notification close” event to a service worker

    Adding ‘notification click” event to a service worker

*/

(function() {
  'use strict';

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

  // Handle the notificationclose event
  self.addEventListener('notificationclose', function(e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;

    console.log('Closed notification: ' + primaryKey);
  });

  // Handle the notificationclick event
  self.addEventListener('notificationclick', function(e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    var action = e.action;
    console.log('id = '+notification.data.id);
    post('/viewHistory');

    if (action === 'close') {
      notification.close();
    } else {
      clients.openWindow('/viewHistoryDetail/'+notification.data.id);
      notification.close();
    }

    // TODO 5.3 - close all notifications when one is clicked

  });

  // TODO 3.1 - add push event listener

})();
