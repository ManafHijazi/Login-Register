import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDWwUwGUX63khXrpRWl5SH32Xe7-HcrQZY',
  authDomain: 'zaincash-8a1ab.firebaseapp.com',
  projectId: 'zaincash-8a1ab',
  storageBucket: 'zaincash-8a1ab.appspot.com',
  messagingSenderId: '556514891218',
  appId: '1:556514891218:web:81ce10c5682b4e3025640b',
  measurementId: 'G-8MXC96CHEN',
};
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
