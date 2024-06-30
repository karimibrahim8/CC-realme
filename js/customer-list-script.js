import { db, getRequests, updateRequests } from './firebase.js';

var requests;

function showLoader() {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('content').style.display = 'none';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('content').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', async function () {
    showLoader();

    requests = await getRequests(db);

    requests.forEach((customer, index) => addCustomerToTable(customer, index));
    hideLoader();
});

document.getElementById('exportButton').addEventListener('click', function () {
    const customerTableRows = document.querySelectorAll('#customerTableBody tr');
    const data = [];
    customerTableRows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        const index = Number(cells[0].innerText);
        const reqid = requests[index - 1]['reqid'];
        const name = cells[1].innerText;
        const phone = cells[2].innerText;
        const phoneModel = cells[3].innerText;
        const sparePart = cells[4].innerText;
        const imei = cells[5].innerText;
        const area = cells[6].innerText;
        const date = cells[7].innerText;
        const branches = cells[8].querySelector('textarea').value;
        const status = cells[9].querySelector('.select-status').value;

        data.push({ Index: index, reqid: reqid, Name: name, Phone: phone, 'Phone Model': phoneModel, 'Spare Part': sparePart, IMEI: imei, Area: area, Date: date, Branches: branches, Status: status });
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');

    XLSX.writeFile(workbook, 'customers.xlsx');
});

function addCustomerToTable(customer, index) {
    const customerTableBody = document.getElementById('customerTableBody');
    const newRow = document.createElement('tr');
    newRow.id = `tr-${index + 1}`;
    newRow.innerHTML = `
        <td>${index + 1}</td>
        <td>${customer['name']}</td>
        <td>${customer['phone']}</td>
        <td>${customer['phoneModel']}</td>
        <td>${customer['sparePart']}</td>
        <td>${customer['imei']}</td>
        <td>${customer['area']}</td>
        <td>${customer['date']}</td>
        <td><textarea class="branch">${customer['branches'] || ''}</textarea></td>
        <td>
            <select class="select-status" onchange="updateSelectStyle(this)">
                <option value="pending" ${customer['status'] === 'pending' ? 'selected' : ''}>Pending</option>
                <option value="answered" ${customer['status'] === 'answered' ? 'selected' : ''}>Answered</option>
                <option value="not-answered" ${customer['status'] === 'not-answered' ? 'selected' : ''}>Not Answered</option>
            </select>
        </td>
        <td>
            <button class="update-button">UPDATE</button>
        </td>
    `;

    customerTableBody.prepend(newRow);

    // Add event listener to the update button
    newRow.querySelector('.update-button').addEventListener('click', async function () {
        await updateCustomer(newRow, customer['reqid']);
    });
}

// Attach the function to the window object
window.updateSelectStyle = function (selectElement) {
    if (selectElement.value === 'answered') {
        selectElement.style.color = 'green';
    } else if (selectElement.value === 'not-answered') {
        selectElement.style.color = 'red';
    } else {
        selectElement.style.color = 'black';
    }
}

async function updateCustomer(row, reqid) {
    const textarea = row.querySelector('.branch');
    const selectStatus = row.querySelector('.select-status');
    if (textarea && selectStatus) {
        // console.log(`Updating customer with row ID: ${row.id}`);
        // console.log(`Branches: ${textarea.value}`);
        // console.log(`Status: ${selectStatus.value}`);
        // console.log(`ID: ${reqid}.`);
        showLoader();
        await updateRequests(reqid, textarea.value, selectStatus.value);
        hideLoader();
    } else {
        // console.log(`Textarea or select-status for row ID: ${row.id} not found.`);
    }
}
