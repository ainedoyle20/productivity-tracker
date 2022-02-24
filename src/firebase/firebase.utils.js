// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// So adding the SDKS....
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc, onSnapshot, updateDoc} from 'firebase/firestore';

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

export const checkForTodosDoc = async (currentUserId, date) => {
    const todosRef = doc(db, 'todos', currentUserId);
    const todosSnap = await getDoc(todosRef);

    if (!todosSnap.exists()) {
        console.log('no todo doc here');
        setTodoDoc(currentUserId, date);
        return false;
    } else {
        return true;
    }
}

export const getCalendarTodos = async (currentUserId, date) => {
    const todosRef = doc(db, 'todos', currentUserId);
    const todosSnap = await getDoc(todosRef);
    const todos = todosSnap.data();
    const firebaseTodos = todos[date]['todos'];
    return firebaseTodos;
}

export const fetchTodosForCurrentDay = async (currentUserId, date) => {
    const todosRef = doc(db, 'todos', currentUserId);
    const todosSnap = await getDoc(todosRef);

    if (!todosSnap.exists()) {
        console.log('no todos documents for this user');
        setTodoDoc(currentUserId, date);
        const firebaseTodos = [];
        const firebaseCompletedTodos =  [];
        return {firebaseTodos, firebaseCompletedTodos};
    } else {
        const todos = todosSnap.data();
        console.log('todos[date] ', todos[date]);
        if (todos[date]) {
            console.log('todos[date] is true');
            const firebaseTodos = todos[date]['todos'];
            const firebaseCompletedTodos =  todos[date]['completedTodos'];
            // console.log('firebase todos: ', firebaseTodos);
            // console.log('firebase completedTodos: ', firebaseCompletedTodos);
            return {firebaseTodos, firebaseCompletedTodos};  
        } else {
            console.log('todos[date] is false');
            updateTodosForCurrentDay(currentUserId, date, [], []);
            const firebaseTodos = [];
            const firebaseCompletedTodos =  [];
            return {firebaseTodos, firebaseCompletedTodos};
        } 
    }
}

export const updateTodosForCurrentDay = async (currentUserId, date, notCompleted, isCompleted) => {
    const docRef = doc(db, 'todos', currentUserId);
    
    try {
        await updateDoc(docRef, {
            [date]: {
                'todos': notCompleted,
                'completedTodos': isCompleted,
            }
        });
    } catch (error) {
        console.log('error updating doc, ', error.message)
    }
}

export const setTodoDoc = async (currentUserId, date) => {
    const docRef = doc(db, 'todos', currentUserId);
    
    try {
        await setDoc(docRef, {
            [date]: {
                'todos': [],
                'completedTodos': [],
            }
        });
    } catch (error) {
        console.log('error setting doc, ', error.message)
    }
}

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
