import firebase from 'firebase/app';
import 'firebase/messaging';


var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "vegan-for-life.firebaseapp.com",
  projectId: "vegan-for-life",
  storageBucket: "vegan-for-life.appspot.com",
  messagingSenderId: "603632301195",
  appId: "1:603632301195:web:200cbd8cbc76b91eead08e",
  measurementId: "G-2YPPE14MVQ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export let token = null;
export const getToken = async() => {
    try{
    const currentToken = await messaging.getToken({
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    });
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
