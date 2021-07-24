import firebase from 'firebase/app';
import 'firebase/messaging';


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

export let token = null;
export const getToken = async() => {
    try{
    const currentToken = await messaging.getToken({ vapidKey: "BKTNeicjLHbYPHeY7aASlAEF_KDtrOAcBCi8A5QlSpP9h38WRVSrjUDG0guODb9B9_mXu_ubB2cbolnHB8GIeuA" })
        if(currentToken){
            console.log('current token for client: ', currentToken);
            token = currentToken;
           
        }else{
            console.log('No registration token available.');
        }
    }catch(err){
        console.log('Error occurred while retrieving token', err);
    }
};
//-----
export const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            resolve(payload);
        });
    });

// export const saveMessagingDeviceToken = () => {
//     firebase.messaging().getToken().then(function (currentToken) {
//         if (currentToken) {
//             console.log('Got FCM device token:', currentToken);
//             // Saving the Device Token to the datastore.
//             firebase.firestore().collection('fcmTokens').doc(currentToken)
//                 .set({ uid: firebase.auth().currentUser.uid });
//         } else {
//             // Need to request permissions to show notifications.
//             requestNotificationsPermissions();
//         }
//     }).catch(function (error) {
//         console.error('Unable to get messaging token.', error);
//     });
// }