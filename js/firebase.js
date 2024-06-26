
// // sImport the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC7gn3OzFXaanP1g4dJBI2304tgzRReqGE",
//   authDomain: "cc-k-base-2a7f8.firebaseapp.com",
//   databaseURL: "https://cc-k-base-2a7f8-default-rtdb.firebaseio.com",
//   projectId: "cc-k-base-2a7f8",
//   storageBucket: "cc-k-base-2a7f8.appspot.com",
//   messagingSenderId: "743977287743",
//   appId: "1:743977287743:web:139787dd57cf8b19fdf88a",
//   measurementId: "G-5Z9Z6TLL1W"
// };

// // // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// // Get a list of cities from your database
// async function getUsers(db) {
//     const usersCol = collection(db, 'users');
//     const usersSnapshot = await getDocs(citiesCol);
//     const usersList = citySnapshot.docs.map(doc => doc.data());
//     return usersList;
// }
//  function prinit(){
//     console.log(`Hello, !`);
// }
  
// document.addEventListener("DOMContentLoaded", function() {
//     prinit();
// });