// Pre-defined calibration options
const calibrationServices = [
    // Universal Services (All Manufacturers)
    { name: "Pre-Repair Scan", price: 120, manufacturer: "All", category: "Any Collision" },
    { name: "Post-Repair Scan", price: 120, manufacturer: "All", category: "Any Collision" },

    // Acura/Honda
    { name: "Occupant Classification System - Passenger Seat", price: 166, manufacturer: "Acura/Honda", category: "Any Collision" },
    { name: "Forward RADAR (Adaptive Cruise System)", price: 394, manufacturer: "Acura/Honda", category: "Front End" },
    { name: "LaneWatch Camera", price: 378, manufacturer: "Acura/Honda", category: "Mirror" },
    { name: "Blind Spot Monitoring System BSM", price: 486, manufacturer: "Acura/Honda", category: "Rear End" },
    { name: "ABS & VSA all Sensor Relearn", price: 248, manufacturer: "Acura/Honda", category: "Rear End" },

    // BMW
    { name: "Global Vehicle - Headlamp Calibration", price: 226, manufacturer: "BMW", category: "Headlamp Replacement" },
    { name: "Global Vehicle - Module Calibration", price: 226, manufacturer: "BMW", category: "Rear End" },
    { name: "Liftgate Initialization", price: 106, manufacturer: "BMW", category: "Rear End" },

    // Chrysler
    { name: "Forward Camera - Dynamic (Lane Departure System)", price: 330, manufacturer: "Chrysler", category: "Front End/Windshield" },

    // Ford
    { name: "Park Assist", price: 394, manufacturer: "Ford", category: "Front End" },
    { name: "Blind Spot Monitoring System BSM", price: 486, manufacturer: "Ford", category: "Rear End" },

    // GM
    { name: "Forward RADAR (Adaptive Cruise System)", price: 444, manufacturer: "GM", category: "Front End" },

    // Hyundai
    { name: "Forward RADAR (Adaptive Cruise)", price: 394, manufacturer: "Hyundai", category: "Front End" },

    // Kia
    { name: "Forward Camera Eyesight - Static", price: 386, manufacturer: "Kia", category: "Front End" },

    // Lexus/Toyota
    { name: "Occupant Classification System - Passenger Seat", price: 184, manufacturer: "Lexus/Toyota", category: "Any Collision" },
    { name: "Inspect ECU - OCS for Passenger Seat", price: 90, manufacturer: "Lexus/Toyota", category: "Any Collision" },
    { name: "Forward RADAR (Adaptive Cruise System)", price: 394, manufacturer: "Lexus/Toyota", category: "Front End" },
    { name: "Park Assist", price: 392, manufacturer: "Lexus/Toyota", category: "Front End" },

    // Mazda
    { name: "Forward Camera - Dynamic", price: 290, manufacturer: "Mazda", category: "Front End" },
    { name: "Forward RADAR (Adaptive Cruise System)", price: 442, manufacturer: "Mazda", category: "Front End" },
    { name: "ABS & VSA all Sensor Relearn", price: 248, manufacturer: "Mazda", category: "Front End" },

    // Nissan/Infiniti
    { name: "Forward RADAR (Adaptive Cruise)", price: 446, manufacturer: "Nissan/Infiniti", category: "Front End" },
    { name: "Birds Eye Camera", price: 256, manufacturer: "Nissan/Infiniti", category: "Front End" },
    { name: "Inspect Steering Column", price: 210, manufacturer: "Nissan/Infiniti", category: "Front End" },

    // Subaru
    { name: "Forward Camera - Static", price: 346, manufacturer: "Subaru", category: "Front End" },
    { name: "Blind Spot Monitoring System BSM", price: 486, manufacturer: "Subaru", category: "Rear End" },

    // Volkswagen
    { name: "Power Windows Initialization", price: 105, manufacturer: "Volkswagen", category: "Side Impact" },
    { name: "Forward RADAR (Adaptive Cruise System)", price: 394, manufacturer: "Volkswagen", category: "Front End" }
];

let invoiceCounter = 1;

function getSelectedCalibrations() {
    const make = document.getElementById('make').value;
    const filteredServices = calibrationServices.filter(service => 
        service.manufacturer === make || service.manufacturer === "All"
    );
    const checkboxes = document.querySelectorAll('#calibrationOptions input[type="checkbox"]');
    const selected = [];
    checkboxes.forEach((cb, idx) => {
        if (cb.checked) {
            selected.push({ ...filteredServices[idx], qty: 1 });
        }
    });
    return selected;
}

function updateInvoiceDisplay() {
    const selectedCalibrations = getSelectedCalibrations();
    if (selectedCalibrations.length === 0) {
        document.getElementById('invoiceBox').style.display = 'none';
        return;
    }
    document.getElementById('invoiceBox').style.display = 'block';

    const year = document.getElementById('year').value;
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const vin = document.getElementById('vin').value;
    const ro = document.getElementById('ro').value;
    const email = document.getElementById('email').value;
    const dateInput = document.getElementById('invoiceDateInput').value;
    const dateStr = dateInput ? new Date(dateInput).toLocaleDateString() : new Date().toLocaleDateString();

    document.getElementById('vehicle').innerText = `${year} ${make} ${model}`;
    document.getElementById('vehicleVin').innerText = vin;
    document.getElementById('vehicleRo').innerText = ro;
    document.getElementById('invoiceEmail').innerText = email;
    document.getElementById('invoiceDate').innerText = dateStr;
    document.getElementById('dueDate').innerText = dateStr;

    // Use a temporary invoice number for preview
    const invNum = document.getElementById('invoiceNumber').innerText || "INV-" + invoiceCounter.toString().padStart(6, '0');
    document.getElementById('invoiceNumber').innerText = invNum;

    const table = document.getElementById('itemsTable');
    table.innerHTML = '';
    let subTotal = 0;

    selectedCalibrations.forEach((item, index) => {
        let amount = item.qty * item.price;
        subTotal += amount;
        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.qty.toFixed(2)}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${amount.toFixed(2)}</td>
            </tr>
        `;
    });

    document.getElementById('subTotal').innerText = subTotal.toFixed(2);
    document.getElementById('total').innerText = subTotal.toFixed(2);
    document.getElementById('balanceDue').innerText = subTotal.toFixed(2);
}

function generateInvoice() {
    const selectedCalibrations = getSelectedCalibrations();
    if (selectedCalibrations.length === 0) {
        alert('Please select at least one calibration.');
        return;
    }
    updateInvoiceDisplay();

    const year = document.getElementById('year').value;
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const vin = document.getElementById('vin').value;
    const ro = document.getElementById('ro').value;
    const email = document.getElementById('email').value;
    const dateInput = document.getElementById('invoiceDateInput').value;
    const dateStr = dateInput ? new Date(dateInput).toLocaleDateString() : new Date().toLocaleDateString();
    const invNum = "INV-" + invoiceCounter.toString().padStart(6, '0');

    const invoiceData = {
        id: Date.now().toString(),
        number: invNum,
        date: dateStr,
        dueDate: dateStr,
        vehicle: { year, make, model, vin, ro },
        calibrations: selectedCalibrations,
        subTotal: parseFloat(document.getElementById('subTotal').innerText),
        total: parseFloat(document.getElementById('total').innerText),
        balanceDue: parseFloat(document.getElementById('balanceDue').innerText),
        paid: false,
        email
    };
    saveInvoiceToServer(invoiceData);
    invoiceCounter++;
    document.getElementById('invoiceNumber').innerText = invNum;
}

function updateCalibrationOptions() {
    const make = document.getElementById('make').value;
    const calibrationDiv = document.getElementById('calibrationOptions');
    calibrationDiv.innerHTML = '';

    // Filter calibrations based on manufacturer
    const filteredServices = calibrationServices.filter(service => 
        service.manufacturer === make || service.manufacturer === "All"
    );

    // Group by category
    const groupedServices = filteredServices.reduce((acc, service) => {
        if (!acc[service.category]) {
            acc[service.category] = [];
        }
        acc[service.category].push(service);
        return acc;
    }, {});

    let idx = 0;
    for (const [category, services] of Object.entries(groupedServices)) {
        calibrationDiv.innerHTML += `<h4>${category}</h4>`;
        services.forEach((service) => {
            calibrationDiv.innerHTML += `
                <label>
                    <input type="checkbox" value="${idx}" onchange="onCalibrationChange()">
                    ${service.name} - $${service.price.toFixed(2)}
                </label><br>
            `;
            idx++;
        });
    }
    // After rendering, update invoice display
    updateInvoiceDisplay();
}

function onCalibrationChange() {
    updateInvoiceDisplay();
}

document.getElementById('make').addEventListener('change', updateCalibrationOptions);
// Also update invoice when other fields change
['year','model','vin','ro','email','invoiceDateInput'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateInvoiceDisplay);
});

// Initial load of calibration options
updateCalibrationOptions();

function saveInvoiceToServer(invoice) {
    fetch('http://localhost:3000/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoice)
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to save invoice');
        console.log('Invoice saved successfully.');
    })
    .catch(error => {
        console.error('Error saving invoice:', error);
    });
}

// ============================
// Viewing & Deleting Invoices
// ============================

let currentInvoiceId = null;

async function loadInvoices() {
    const response = await fetch('http://localhost:3000/api/invoices');
    const invoices = await response.json();

    const invoiceList = document.getElementById('invoiceList');
    invoiceList.innerHTML = '';
    invoiceList.style.display = 'block';

    invoices.forEach(invoice => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('invoice-wrapper');

        const summaryDiv = document.createElement('div');
        summaryDiv.classList.add('invoice-summary');

        summaryDiv.innerHTML = `
            <div class="invoice-header">
                <h3>Invoice #${invoice.number || invoice.id}</h3>
                <p class="invoice-date">Date: ${invoice.date}</p>
            </div>
            <div class="invoice-info">
                <p><strong>Vehicle:</strong> ${invoice.vehicle.year} ${invoice.vehicle.make} ${invoice.vehicle.model}</p>
                <p><strong>Total:</strong> $${invoice.total.toFixed(2)}</p>
            </div>
            <button class="view-details-btn" onclick="toggleInvoiceDetails('${invoice.id}')">View Details</button>
            <div id="details-${invoice.id}" class="invoice-details" style="display: none;"></div>
        `;

        wrapper.appendChild(summaryDiv);
        invoiceList.appendChild(wrapper);
    });
}

async function toggleInvoiceDetails(id) {
    const detailDiv = document.getElementById(`details-${id}`);
    
    if (detailDiv.style.display === 'block') {
        detailDiv.style.display = 'none';
        detailDiv.innerHTML = ''; // optional: clear contents when hidden
        return;
    }

    const response = await fetch('http://localhost:3000/api/invoices');
    const invoices = await response.json();
    const invoice = invoices.find(inv => inv.id === id);

    if (invoice) {
        currentInvoiceId = id;

        let itemsHtml = '';
        invoice.calibrations?.forEach(item => {
            const amount = (item.qty * item.price).toFixed(2);
            itemsHtml += `<li>${item.name} - $${amount}</li>`;
        });

        detailDiv.innerHTML = `
            <p><strong>Vehicle:</strong> ${invoice.vehicle.year} ${invoice.vehicle.make} ${invoice.vehicle.model}</p>
            <p><strong>Total:</strong> $${invoice.total.toFixed(2)}</p>
            <ul>${itemsHtml}</ul>
            <button onclick="deleteInvoice()">Delete Invoice</button>
        `;

        detailDiv.style.display = 'block';
    }
}

async function deleteInvoice() {
    if (currentInvoiceId) {
        const response = await fetch(`http://localhost:3000/api/invoices/${currentInvoiceId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Invoice deleted.');
            hideInvoices();
            loadInvoices();
        } else {
            alert('Failed to delete invoice.');
        }
    }
}

function downloadPDF() {
    updateInvoiceDisplay();
    const invoice = document.getElementById('invoiceBox');
    invoice.style.display = 'block';
    invoice.classList.add('pdf-export');
    document.getElementById('pdfLoading').style.display = 'block';
    document.getElementById('downloadBtn').disabled = true;
    html2pdf().set({
        margin: 0,
        filename: 'Invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).from(invoice).save().then(() => {
        invoice.classList.remove('pdf-export');
        document.getElementById('pdfLoading').style.display = 'none';
        document.getElementById('downloadBtn').disabled = false;
    });
}

function hideInvoices() {
    const invoiceList = document.getElementById('invoiceList');
    invoiceList.style.display = 'none';
    const fullInvoiceDetails = document.getElementById('fullInvoiceDetails');
    fullInvoiceDetails.style.display = 'none';
}

function refreshInvoices() {
    loadInvoices();
}
