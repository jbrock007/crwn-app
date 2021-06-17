import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const config = {
  apiKey: "AIzaSyDWQGOmzVQ4BqrD7B7aBjgIIeuSnW2PBOM",
  authDomain: "crwn-db-a722f.firebaseapp.com",
  projectId: "crwn-db-a722f",
  storageBucket: "crwn-db-a722f.appspot.com",
  messagingSenderId: "1050436035701",
  appId: "1:1050436035701:web:db5eba5bd20cb8a89ec43c",
  measurementId: "G-WQGLWH0HD2",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
