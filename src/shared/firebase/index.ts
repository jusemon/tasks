import firebase from 'firebase';
import firebaseConfig from "./apikey.json";
// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);

export const { auth, database } = app;
export default app;
