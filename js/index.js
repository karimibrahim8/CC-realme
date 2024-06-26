
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



