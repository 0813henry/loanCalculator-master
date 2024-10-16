import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyBm5oSIggwD-l_TXhHHyCuCPy34cdqdiT0",
    authDomain: "loancalculator-master.firebaseapp.com",
    projectId: "loancalculator-master",
    storageBucket: "loancalculator-master.appspot.com",
    messagingSenderId: "425864404388",
    appId: "1:425864404388:web:ac13bc2d836c0662517531",
    measurementId: "G-97GVPXW615"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth();

export { auth };