var app = (function() {
  'use strict';
  // set timer
  var currentDate = new Date();
  var time = 2000;

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

  function displayNotification() {

    // display a Notification
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {

        // Add 'options' object to configure the notification
        var options = {
          body: 'First notification!',
          icon: 'images/notification-flat.png',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
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

          // TODO 5.1 - add a tag to the notification

        };
        reg.showNotification('Hello world!', options);
      });
    }

  }

  function initializeUI() {

    // TODO 3.3b - add a click event listener to the "Enable Push" button
    // and get the subscription object

  }

  // TODO 4.2a - add VAPID public key

  function subscribeUser() {

    // TODO 3.4 - subscribe to the push service

  }

  function unsubscribeUser() {

    // TODO 3.5 - unsubscribe from the push service

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

  notifyButton.addEventListener('click', function() {
    window.setTimeout(displayNotification, time);
    //displayNotification();
  });

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');

    navigator.serviceWorker.register('sw.js')
      .then(function(swReg) {
        console.log('Service Worker is registered', swReg);

        swRegistration = swReg;

        // TODO 3.3a - call the initializeUI() function

      })
      .catch(function(error) {
        console.error('Service Worker Error', error);
      });
  } else {
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
  }

})();
