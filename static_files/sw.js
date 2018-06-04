/*
  FileName : sw.js
  Brief Description :
    Adding ‘notification close” event to a service worker

    Adding ‘notification click” event to a service worker

*/

(function() {
  'use strict';

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

    if (action === 'close') {
      notification.close();
    } else {
      clients.openWindow('/viewHistoryDetail/'+id);
      notification.close();
    }

    // TODO 5.3 - close all notifications when one is clicked

  });

  // TODO 3.1 - add push event listener

})();
