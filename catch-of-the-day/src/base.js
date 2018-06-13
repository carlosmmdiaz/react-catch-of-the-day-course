import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBzJCE3r863BWZGEdZZJOAp3wQyYWL04-8",
    authDomain: "catch-of-the-day-carlosmmdiaz.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-carlosmmdiaz.firebaseio.com"
});

const base = Rebase.createClass(firebase.database());

// This is a name export
export { firebaseApp }

// This is a default export
export default base;