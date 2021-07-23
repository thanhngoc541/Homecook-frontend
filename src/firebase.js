import firebase from 'firebase';


const config = {
    apiKey: "AIzaSyB7MV4qrrtG-_Uq9ieDCT4h9reXE1j-d48",
    authDomain: "vegan-for-life.firebaseapp.com",
    projectId: "vegan-for-life",
    storageBucket: "vegan-for-life.appspot.com",
    messagingSenderId: "603632301195",
    appId: "1:603632301195:web:200cbd8cbc76b91eead08e",
    measurementId: "G-2YPPE14MVQ"
}

firebase.initializeApp(config);


export default firebase