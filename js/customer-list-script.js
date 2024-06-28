import { db, getRequests } from './firebase.js';


function showLoader() {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('content').style.display = 'none';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('content').style.display = 'block';
}



document.addEventListener('DOMContentLoaded', async function () {
    // const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
    showLoader();

    const requests = await getRequests(db);

    requests.forEach((customer, index) => addCustomerToTable(customer, index));
    hideLoader();

});

document.getElementById('exportButton').addEventListener('click', function () {
    const customerTableRows = document.querySelectorAll('#customerTableBody tr');
    const data = [];

    customerTableRows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        const index = cells[0].innerText;
        const name = cells[1].innerText;
        const phone = cells[2].innerText;
        const phoneModel = cells[3].innerText;
        const sparePart = cells[4].innerText;
        const imei = cells[5].innerText;
        const area = cells[6].innerText;
        const date = cells[7].innerText;
        const branches = cells[8].querySelector('textarea').value;
        const status = cells[9].querySelector('.select-status').value;

        data.push({ Index: index, Name: name, Phone: phone, 'Phone Model': phoneModel, 'Spare Part': sparePart, IMEI: imei, Area: area, Date: date, Branches: branches, Status: status });
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');

    XLSX.writeFile(workbook, 'customers.xlsx');
});

function addCustomerToTable(customer, index) {
    const customerTableBody = document.getElementById('customerTableBody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${index + 1}</td>
        <td>${customer['name']}</td>
        <td>${customer['phone']}</td>
        <td>${customer['phoneModel']}</td>
        <td>${customer['sparePart']}</td>
        <td>${customer['imei']}</td>
        <td>${customer['area']}</td>
        <td>${customer['date']}</td>
        <td><textarea class="branch-input">${customer['branches'] || ''}</textarea></td>
        <td>
            <select class="select-status" onchange="updateSelectStyle(this)">
                <option value="pending" ${customer['status'] === 'pending' ? 'selected' : ''}>Pending</option>
                <option value="answered" ${customer['status'] === 'answered' ? 'selected' : ''}>Answered</option>
                <option value="not-answered" ${customer['status'] === 'not-answered' ? 'selected' : ''}>Not Answered</option>
            </select>
            <td>
           <button onclick="updateCustomer()">UPDATE</button>
        </td>
    `;

    customerTableBody.prepend(newRow);
    updateSelectStyle(newRow.querySelector('.select-status'));
    newRow.querySelector('.branch-input').addEventListener('input', saveCustomerToLocalStorage);
    newRow.querySelector('.select-status').addEventListener('change', saveCustomerToLocalStorage);
}

function updateSelectStyle(selectElement) {
    if (selectElement.value === 'answered') {
        selectElement.style.color = 'green';
    } else if (selectElement.value === 'not-answered') {
        selectElement.style.color = 'red';
    } else {
        selectElement.style.color = 'black';
    }
}

function saveCustomerToLocalStorage() {
    const customers = [];
    const customerTableBody = document.getElementById('customerTableBody');
    customerTableBody.querySelectorAll('tr').forEach(row => {
        const cells = row.getElementsByTagName('td');
        const customer = {
            name: cells[1].innerText,
            phone: cells[2].innerText,
            phoneModel: cells[3].innerText,
            sparePart: cells[4].innerText,
            imei: cells[5].innerText,
            area: cells[6].innerText,
            date: cells[7].innerText,
            branches: cells[8].querySelector('textarea').value,
            status: cells[9].querySelector('.select-status').value
        };
        customers.push(customer);
    });
    localStorage.setItem('customers', JSON.stringify(customers.reverse()));
}

function updateCustomer(id) {
    console.log("UPDATE FROM ID: " + id);
}