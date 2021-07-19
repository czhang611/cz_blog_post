//Project Firebase connection
//https://cz-blog-posts-default-rtdb.firebaseio.com/
//cz-blog-posts-default-rtdb: null

import firebase from "firebase";
//import "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyDYfDLiIij0yA7KwjVCzBfpzJ6_9vr-FNk",
    authDomain: "cz-blog-posts.firebaseapp.com",
    databaseURL: "https://cz-blog-posts-default-rtdb.firebaseio.com",
    projectId: "cz-blog-posts",
    storageBucket: "cz-blog-posts.appspot.com",
    messagingSenderId: "3714469524",
    appId: "1:3714469524:web:2a5070ab6d93d4cbe02e81",
    measurementId: "G-8L92L3DF2Q"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

//export default firebase;
export default firebase.database();