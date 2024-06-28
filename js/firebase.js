
// sImport the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, setDoc, doc } from 'firebase/firestore/lite';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC7gn3OzFXaanP1g4dJBI2304tgzRReqGE",
    authDomain: "cc-k-base-2a7f8.firebaseapp.com",
    databaseURL: "https://cc-k-base-2a7f8-default-rtdb.firebaseio.com",
    projectId: "cc-k-base-2a7f8",
    storageBucket: "cc-k-base-2a7f8.appspot.com",
    messagingSenderId: "743977287743",
    appId: "1:743977287743:web:139787dd57cf8b19fdf88a",
    measurementId: "G-5Z9Z6TLL1W"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getRequests(db) {
    const requestsCol = collection(db, 'requests');
    const requestsSnapshot = await getDocs(requestsCol);
    const requestsList = requestsSnapshot.docs.map(doc => doc.data());
    return requestsList;
}


function generateCustomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let customId = '';
    for (let i = 0; i < length; i++) {
        customId += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return customId;
}

export async function setRequests(db, area, branches, date, imei, name, phone, phoneModel, sparePart, status) {
    try {
        const id = generateCustomId(20);
        const requestsCol = collection(db, 'requests');
        await setDoc(doc(requestsCol, id), {
            area: area,
            branches: branches,
            reqid: id,
            date: date,
            imei: imei,
            name: name,
            phone: phone,
            phoneModel: phoneModel,
            sparePart: sparePart,
            status: status
        });
        console.log('Document written with ID: ', id);
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}