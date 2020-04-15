import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDAqPN8xIRUTFIp4xwO1ycGtX7nV-Ol2fg",
  authDomain: "registration-68eeb.firebaseapp.com",
  databaseURL: "https://registration-68eeb.firebaseio.com",
  projectId: "registration-68eeb",
  storageBucket: "registration-68eeb.appspot.com",
  messagingSenderId: "57406844065",
  appId: "1:57406844065:web:e843339b118220c0a754e0",
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
