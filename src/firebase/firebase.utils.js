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

export const checkForTodosItem = async (currentUserId, date) => {
    const todosRef = doc(db, 'todos', currentUserId);
    const todosSnap = await getDoc(todosRef);
    const todos = todosSnap.data();

    if (!todos[date]) {
        console.log('no todo item here');
        setTodoItem(currentUserId, date);
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

        // console.log('there is a monthfield here');
        // if (!percentages[monthField][dateKey] && percentages[monthField][dateKey] !== 0) {
        //     console.log('no todays date here');
        //     createPercentageKey(currentUserId, monthField, dateKey);
        //     return;
        // } else {
        //     console.log('todays date is here');
        //     return;
        // }
    }
    return;
}

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

// const createPercentageKey = async (currentUserId, monthField, dateKey) => {
//     const docRef = doc(db, 'percentages', currentUserId);

//     try {
//         await updateDoc(docRef, {
//             [monthField]: {
//                 [dateKey]: 0,
//             }
//         });
//     } catch (error) {
//         console.log('error creating percentage key: ', error.message);
//     }
// }

export const updatePercentageValue = async (currentUserId, date, todosPercentage) => {
    const parsedDate = date.split('-');
    const monthField = `${parsedDate[1]}-${parsedDate[2]}`;
    const dateKey = parsedDate[0];

    const percentagesRef = doc(db, 'percentages', currentUserId);

    try {
        await updateDoc(percentagesRef, {
            [`${monthField}.${dateKey}`]: todosPercentage,
        });
    } catch (error) {
        console.log('error updatingPercentageValue: ', error.message);
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

export const saveCalendarTodosToFirebase = async (currentUserId, date, calendarTodos) => {
    if (calendarTodos.length === 0) {
        return;
    }

    const docRef = doc(db, 'todos', currentUserId);
    console.log('got here');

    try {
        await updateDoc(docRef, {
            [`${date}.todos`]: calendarTodos
        });
    } catch (error) {
        console.log('error saving calendar todos to firebase, ', error.message)
    }
}

export const setPercentageDoc = async (currentUserId, monthField, daysInMonth) => {
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

export const setTodoItem = async (currentUserId, date) => {
    const docRef = doc(db, 'todos', currentUserId);
    
    try {
        await updateDoc(docRef, {
            [date]: {
                'todos': [],
                'completedTodos': [],
            }
        });
    } catch (error) {
        console.log('error setting item: ', error.message)
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
