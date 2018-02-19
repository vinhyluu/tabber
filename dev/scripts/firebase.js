import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyCe19OAabaDgBSA2KwrtFyFmV0s_zKly9o",
    authDomain: "tabber-8aa84.firebaseapp.com",
    databaseURL: "https://tabber-8aa84.firebaseio.com",
    projectId: "tabber-8aa84",
    storageBucket: "tabber-8aa84.appspot.com",
    messagingSenderId: "362685711189"
};
firebase.initializeApp(config);

export default firebase;

// "auth != null"