const firebase = require("firebase");
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyDAWFk8gkNovJIKs2NP9l187lTxAtVUjY0",
  authDomain: "nori-ui.firebaseapp.com",
  databaseURL: "https://nori-ui.firebaseio.com",
  projectId: "nori-ui",
  storageBucket: "nori-ui.appspot.com",
  messagingSenderId: "115212163976",
  appId: "1:115212163976:web:4f03cac7108e155955f83d"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export const storage = firebase.storage().ref();
