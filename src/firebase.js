import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA74A7BbWWnB7TVeAKbmvib9lG3UMcdiFM",
    authDomain: "king-tritons-database.firebaseapp.com",
    projectId: "king-tritons-database",
    storageBucket: "king-tritons-database.appspot.com",
    messagingSenderId: "600926880647",
    appId: "1:600926880647:web:824b62c4298f1c98da4922",
    measurementId: "G-EKLN6L5FV4"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  const auth = firebase.auth();

  export { db, auth }