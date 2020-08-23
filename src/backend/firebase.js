import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyChFjEgHtDbYjFpeo9EN7p0CA7u8sOvYCI",
    authDomain: "rank-page.firebaseapp.com",
    databaseURL: "https://rank-page.firebaseio.com",
    projectId: "rank-page",
    storageBucket: "rank-page.appspot.com",
    messagingSenderId: "149273198113",
    appId: "1:149273198113:web:9ad260e53ddb1ec52d6d60",
    measurementId: "G-61FZ218V94"
  };
firebase.initializeApp(config);
const db = firebase.firestore();
const auth = firebase.auth();
const analytics = firebase.analytics();
const messaging = firebase.messaging();

messaging.onMessage((payload) => {
  console.log('Message received. ', payload);
});

export { firebase, db, auth, analytics, messaging };
