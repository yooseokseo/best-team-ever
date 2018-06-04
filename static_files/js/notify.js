/*
  FileName : notify.js
  Brief Description :
    Checking for notification support

    Requesting permission to show notifications

    Display Notification
      - if a user has a permission ,”granted”, it will show a notification

    Updating button to disable when a user permission is denied

    Adding ‘click’ event to a “notify” button
      - it will call Ajax with URL, '/api/profiles/' + localStorage.profile_id + '/history' to gel all medicine history.
      - it will calculate time difference in milliseconds between a current date and a desired date.
      - it will assign notification time by calling setTimeout function.

    Registering a service worker
      - it will register a file called “sw.js” as a service worker.

*/


var app = (function() {
  'use strict';

  // clear existing timeouts so we dont get duplicates
  let id = window.setTimeout(function() {}, 0);
  while (id--) {
    window.clearTimeout(id);
  }

  var isSubscribed = false;
  var swRegistration = null;

  var notifyButton = document.querySelector('.js-notify-btn');
  var pushButton = document.querySelector('.js-push-btn');

  // check for notification support
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications!');
    return;
  }

  // request permission to show notifications
  Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
  });

  function displayNotification(medicinename, id, med_pic) {
    // display a Notification
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {

        // Add 'options' object to configure the notification
        var options = {
          title: 'Reminder',
          body: 'Take '+medicinename,
          icon: 'images/icons/pills/'+med_pic,
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
            id: id
          },

          // add actions to the notification
          actions: [{
              action: 'explore',
              title: 'Go to the site',
              icon: 'images/checkmark.png'
            },
            {
              action: 'close',
              title: 'Close the notification',
              icon: 'images/xmark.png'
            },
          ]
        }
        reg.showNotification(options.title, options);
      });
    }

  }

  function updateSubscriptionOnServer(subscription) {
    // Here's where you would send the subscription to the application server

    var subscriptionJson = document.querySelector('.js-subscription-json');
    var endpointURL = document.querySelector('.js-endpoint-url');
    var subAndEndpoint = document.querySelector('.js-sub-endpoint');

    if (subscription) {
      subscriptionJson.textContent = JSON.stringify(subscription);
      endpointURL.textContent = subscription.endpoint;
      subAndEndpoint.style.display = 'block';
    } else {
      subAndEndpoint.style.display = 'none';
    }
  }

  function updateBtn() {
    if (Notification.permission === 'denied') {
      pushButton.textContent = 'Push Messaging Blocked';
      pushButton.disabled = true;
      updateSubscriptionOnServer(null);
      return;
    }

    if (isSubscribed) {
      pushButton.textContent = 'Disable Push Messaging';
    } else {
      pushButton.textContent = 'Enable Push Messaging';
    }

    pushButton.disabled = false;
  }

  function urlB64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }


    // set notification for entire account
    $.ajax({
      url: '/api/accounts/history',
      type: 'GET',
      dataType : 'json', // this URL returns data in JSON format
      beforeSend: (xhr) => {   //Include the bearer token in header
          xhr.setRequestHeader("Authorization", 'Bearer '+window.localStorage.getItem("token"));
      },
      success: (data) =>
      {  
        console.log(data);
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < data[i].values.length; j++) {
            let hours = data[i].values[j].time.substring(0, 2);
            let mins = data[i].values[j].time.substring(3, 5);

            let notificationDate = new Date(data[i].date);
            notificationDate.setHours(hours, mins);

            let currentDate = new Date();
            let timeDuration = (notificationDate.getTime() - currentDate.getTime());


            if (timeDuration > 0) { // notification time has not passed yet
              const name = data[i].values[j].medicinename;
              const id = data[i].values[j].id;
              const med_pic = data[i].values[j].med_pic;
              console.log('notification for '+name+' at '+notificationDate);
              window.setTimeout(
                () => { displayNotification(name, id, med_pic) },
                timeDuration
              );
            }
          }
        }
        
      },
      error: (err) =>
      {
        console.log(err);
      }
    });


  if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');

    navigator.serviceWorker.register('sw.js')
      .then(function(swReg) {
        console.log('Service Worker is registered');

        swRegistration = swReg;

      })
      .catch(function(error) {
        console.error('Service Worker Error', error);
      });
  } else {
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
  }

})();
