importScripts('https://www.gstatic.com/firebasejs/7.19.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.19.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyChFjEgHtDbYjFpeo9EN7p0CA7u8sOvYCI",
    authDomain: "rank-page.firebaseapp.com",
    databaseURL: "https://rank-page.firebaseio.com",
    projectId: "rank-page",
    storageBucket: "rank-page.appspot.com",
    messagingSenderId: "149273198113",
    appId: "1:149273198113:web:9ad260e53ddb1ec52d6d60",
    measurementId: "G-61FZ218V94"
  });

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    let options = {
      body: payload.data.body,
      icon: payload.data.icon
    }
    console.log("HAHAHAHHA", options)
    return self.registration.showNotification(payload.data.title, options);
  
  });