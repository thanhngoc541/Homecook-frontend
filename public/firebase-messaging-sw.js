import firebase from 'firebase';

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js');
// importScripts('/__/firebase/init.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/7.14.0/init.js');


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
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
// messaging.getToken({ vapidKey: "BKTNeicjLHbYPHeY7aASlAEF_KDtrOAcBCi8A5QlSpP9h38WRVSrjUDG0guODb9B9_mXu_ubB2cbolnHB8GIeuA" }).then((currentToken) => {
//     if (currentToken) {
//         console.log(currentToken);
//     }
//     else {
//         // Show permission request UI
//         console.log('No registration token available. Request permission to generate one.');
//         // ...
//     }
// }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
// })
// messaging.onMessage((payLoad) => {
//     console.log(payLoad);
//     const notificationOption = {
//         body: payLoad.notification.body,
//     };
//     if (Notification.permission === 'granted') {
//         var notification = new Notification(payLoad.notification.title, notificationOption);
//         notification.onclick = (ev) => {
//             ev.preventDefault();
//             window.open(payLoad.notification.click_action, '_blank');
//             notification.close();
//         }
//     }
// });
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        // icon: '/firebase-logo.png'
    };

    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(notificationTitle,
        notificationOptions);
});