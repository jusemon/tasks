import firebase from 'firebase';
import firebaseConfig from "./apikey.json";
// Initialize Firebase

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const { auth, database } = firebaseApp;
export default firebaseApp;
