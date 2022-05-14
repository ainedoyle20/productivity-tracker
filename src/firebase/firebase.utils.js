import { initializeApp } from "firebase/app";

import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc, onSnapshot, updateDoc} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_NYtGyXDo_VL5cHYxsMJhzrkQdwxRJ7M",
  authDomain: "productivity-tracker-786b5.firebaseapp.com",
  projectId: "productivity-tracker-786b5",
  storageBucket: "productivity-tracker-786b5.appspot.com",
  messagingSenderId: "723141920631",
  appId: "1:723141920631:web:b7870e682045967070c372"
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// User
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

// Todos
export const checkForTodosItem = async (currentUserId, date) => {
    const todosRef = doc(db, 'todos', currentUserId);
    const todosSnap = await getDoc(todosRef);
    const todos = todosSnap.data();

    if (!todos[date]) {
        setTodoItem(currentUserId, date);
        return false;
    } else {
        return true;
    }
}

export const setTodoItem = async (currentUserId, date) => {
    const docRef = doc(db, 'todos', currentUserId);
    
    try {
        await updateDoc(docRef, {
            [date]: []
        });
    } catch (error) {
        console.log('error setting item: ', error.message)
    }
}

export const setTodoDoc = async (currentUserId, date) => {
    const docRef = doc(db, 'todos', currentUserId);
    
    try {
        await setDoc(docRef, {
            [date]: []
        });
    } catch (error) {
        console.log('error setting doc, ', error.message)
    }
}

export const updateTodosForCurrentDay = async (currentUserId, date, todos) => {
    const docRef = doc(db, 'todos', currentUserId);
    const snapshot = await getDoc(docRef);
    if(!snapshot.exists()) return;

    
    try {
        await updateDoc(docRef, {
            [date]: [...todos]
        });
    } catch (error) {
        console.log('error updating doc, ', error.message)
    }
}

export const fetchTodosForCurrentDay = async (currentUserId, date) => {
    const todosRef = doc(db, 'todos', currentUserId);
    const todosSnap = await getDoc(todosRef);

    if (!todosSnap.exists()) {
        setTodoDoc(currentUserId, date);
        return [];
    } else {
        const todosDoc = todosSnap.data();

        const todosList = todosDoc[date] ? todosDoc[date] : []

        return todosList;
    }
}

// Calendar
export const getCalendarTodos = async (currentUserId, date) => {
    const todosRef = doc(db, 'todos', currentUserId);
    const todosSnap = await getDoc(todosRef);
    const todosDoc = todosSnap.data();
    const todosList = todosDoc[date];
    return todosList;
}

export const saveCalendarTodosToFirebase = async (currentUserId, date, calendarTodos) => {
    if (calendarTodos.length === 0) {
        return;
    }

    const docRef = doc(db, 'todos', currentUserId);

    try {
        await updateDoc(docRef, {
            [date]: calendarTodos
        });
    } catch (error) {
        console.log('error saving calendar todos to firebase, ', error.message)
    }
}

// Percentages
const createNewMonthField = async (currentUserId, monthField, daysInMonth) => {
    let datesObj = {};
    for (let i = 1; i <= daysInMonth; i++) {
        datesObj[i] = 0;
    }

    const docRef = doc(db, 'percentages', currentUserId);

    try {
        await updateDoc(docRef, {
            [monthField]: datesObj,
        });
    } catch (error) {
        console.log('error creating new Month Filed: ', error.message);
    }
}

const setPercentageDoc = async (currentUserId, monthField, daysInMonth) => {
    let datesObj = {};
    for (let i = 1; i <= daysInMonth; i++) {
        datesObj[i] = 0;
    }

    const docRef = doc(db, 'percentages', currentUserId);

    try {
        await setDoc(docRef, {
            [monthField]: datesObj,
        });
    } catch (error) {
        console.log('error setting percentage doc: ', error.message);
    }
}

export const firebasePercentagesCheck = async (currentUserId, date, daysInMonth) => {
    const parsedDate = date.split('-');
    const monthField = `${parsedDate[1]}-${parsedDate[2]}`;

    const percentagesRef = doc(db, 'percentages', currentUserId);
    const percentagesSnap = await getDoc(percentagesRef);

    if (!percentagesSnap.exists()) {
        setPercentageDoc(currentUserId, monthField, daysInMonth);
        return;
    }

    const percentages = percentagesSnap.data();
    if (!percentages[monthField]) {
        createNewMonthField(currentUserId, monthField, daysInMonth);
        return;
    }
    return;
}

export const fetchDatesAndPercentages = async (currentUserId, monthField) => {
    const docRef = doc(db, 'percentages', currentUserId);
    const snapshot = await getDoc(docRef);
    const snapshotData = snapshot.data();
    if (!snapshotData[monthField]) {
        const dates = [];
        const percentages = [];
        return {dates, percentages};
    } else {
        const monthFieldObj = snapshotData[monthField];

        const dates = Object.keys(monthFieldObj);
        const percentages = Object.values(monthFieldObj);

        return {dates, percentages}; 
    }
}

export const updatePercentageValue = async (currentUserId, date, todosPercentage) => {
    const percentagesRef = doc(db, 'percentages', currentUserId);
    const percentagesSnap = await getDoc(percentagesRef);

    if (!percentagesSnap.exists()) {
        return;
    }

    const parsedDate = date.split('-');
    const monthField = `${parsedDate[1]}-${parsedDate[2]}`;
    const dateKey = parsedDate[0];

    try {
        await updateDoc(percentagesRef, {
            [`${monthField}.${dateKey}`]: todosPercentage,
        });
    } catch (error) {
        console.log('error updatingPercentageValue: ', error.message);
    }
}
