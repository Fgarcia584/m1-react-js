import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'


const firebaseConfig = {

  apiKey: "AIzaSyCHQ7oMJQJdGu6rfxFKSEYk2r0gl1a3yxY",

  authDomain: "m1-elective-react.firebaseapp.com",

  projectId: "m1-elective-react",

  storageBucket: "m1-elective-react.appspot.com",

  messagingSenderId: "709122280937",

  appId: "1:709122280937:web:e6c35e8cf2f4833e338f78",

  measurementId: "G-69D829FL35"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export { auth, googleProvider, }