const { initializeApp } = require("firebase/app")

const firebaseConfig = {
  apiKey: "AIzaSyAMP8CN25qOfGOwtRXFgIIuwQAeulcIWII",
  authDomain: "owaste-19f71.firebaseapp.com",
  databaseURL: "https://owaste-19f71-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "owaste-19f71",
  storageBucket: "owaste-19f71.appspot.com",
  messagingSenderId: "365828991032",
  appId: "1:365828991032:web:2146eed5257db885a3decd",
  measurementId: "G-LYKJ9ZDG10"
};

const app = initializeApp(firebaseConfig)

exports.default = app
