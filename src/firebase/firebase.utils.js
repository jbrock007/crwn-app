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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("error creating user", error.message);
    }
  }
  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((accumullator, collection) => {
    accumullator[collection.title.toLowerCase()] = collection;
    return accumullator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
