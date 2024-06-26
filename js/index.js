 
// sImport the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

document.getElementById('sparePartsForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const customerName = document.getElementById('customerName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const phoneModel = document.getElementById('phoneModel').value;
    const sparePart = document.getElementById('sparePart').value;
    const imei = document.getElementById('imei').value;
    const area = document.getElementById('area').value;
    const date = document.getElementById('date').value;

    const customer = {
        name: customerName,
        phone: phoneNumber,
        phoneModel: phoneModel,
        sparePart: sparePart,
        imei: imei,
        area: area,
        date: date,
        branches: [],
        status: 'pending'
    };

    const customers = JSON.parse(localStorage.getItem('customers')) || [];
    customers.push(customer);
    localStorage.setItem('customers', JSON.stringify(customers));

 // Reset the form
    document.getElementById('sparePartsForm').reset();


    // Show custom alert
    showCustomAlert('Your request has been submitted!');
});

function showCustomAlert(message) {
    const customAlert = document.getElementById('customAlert');
    const customAlertMessage = document.getElementById('customAlertMessage');
    customAlertMessage.textContent = message;
    customAlert.style.display = 'block';
}

function closeCustomAlert() {
    document.getElementById('customAlert').style.display = 'none';
}



