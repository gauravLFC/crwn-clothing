import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDChAQ9hbYS1zl8q8F7CtF3wMlqQ8Um1i0',
  authDomain: 'crwn-db-a8f08.firebaseapp.com',
  databaseURL: 'https://crwn-db-a8f08.firebaseio.com',
  projectId: 'crwn-db-a8f08',
  storageBucket: 'crwn-db-a8f08.appspot.com',
  messagingSenderId: '293253467814',
  appId: '1:293253467814:web:0957c891cbd344955b6e67',
  measurementId: 'G-8NHCN6FJ0Z'
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
