// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// So adding the SDKS....
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc, onSnapshot} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_NYtGyXDo_VL5cHYxsMJhzrkQdwxRJ7M",
  authDomain: "productivity-tracker-786b5.firebaseapp.com",
  projectId: "productivity-tracker-786b5",
  storageBucket: "productivity-tracker-786b5.appspot.com",
  messagingSenderId: "723141920631",
  appId: "1:723141920631:web:b7870e682045967070c372"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = doc(db, 'users', `${userAuth.uid}`);
    const snapShot = await getDoc(userRef);

    if (!snapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user document: ', error.message);
        }
    }

    return userRef;
}

export const registerWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => signInWithPopup(auth, provider).then((result) => console.log('signed in with google: ', result)).catch(error => console.log(error.message));

export {onAuthStateChanged, onSnapshot, signOut, signInWithEmailAndPassword};
