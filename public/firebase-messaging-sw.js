// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');
// importScripts('/__/firebase/init.js');
// eslint-disable-next-line no-undef


// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

var firebaseConfig = {
    apiKey: "AIzaSyB7MV4qrrtG-_Uq9ieDCT4h9reXE1j-d48",
    authDomain: "vegan-for-life.firebaseapp.com",
    projectId: "vegan-for-life",
    storageBucket: "vegan-for-life.appspot.com",
    messagingSenderId: "603632301195",
    appId: "1:603632301195:web:200cbd8cbc76b91eead08e",
    measurementId: "G-2YPPE14MVQ"
};
// Initialize Firebase
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    // console.log(payload.data.title);
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.message,
        icon: '/assets/images/logosite.png'
    };

    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(notificationTitle,
        notificationOptions);
});