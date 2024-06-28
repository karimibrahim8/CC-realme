
import { setRequests,db } from './firebase.js';


document.getElementById('sparePartsForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const customerName = document.getElementById('customerName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const phoneModel = document.getElementById('phoneModel').value;
    const sparePart = document.getElementById('sparePart').value;
    const imei = document.getElementById('imei').value;
    const area = document.getElementById('area').value;
    const date = document.getElementById('date').value;

 // Reset the form
    document.getElementById('sparePartsForm').reset();

    // Show custom alert
    showCustomAlert('Upload Request');
    await setRequests(db,area,"",date,imei,customerName,phoneNumber,phoneModel,sparePart,'pending')

    // Show custom alert
    delayedChangeCustomAlert('Your request has been submitted!')
    setTimeout(killAlert,1000);
});

function showCustomAlert(message) {
    const customAlert = document.getElementById('customAlert');
    const customAlertMessage = document.getElementById('customAlertMessage');
    customAlertMessage.textContent = message;
    customAlert.style.display = 'block';
}
function killAlert() {
    const customAlert = document.getElementById('customAlert');
    customAlert.style.display = 'none';
}

function delayedChangeCustomAlert(message) {
    const customAlertMessage = document.getElementById('customAlertMessage');
    customAlertMessage.textContent = message;
}