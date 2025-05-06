const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let invoices = [];

app.post('/api/invoices', (req, res) => {
    const invoice = req.body;
    invoice.id = Date.now().toString(); // Simple unique ID
    invoices.push(invoice);
    fs.writeFileSync('invoices.json', JSON.stringify(invoices, null, 2));
    res.status(200).send({ message: 'Invoice saved.' });
});


app.get('/api/invoices', (req, res) => {
    res.send(invoices);
});

app.delete('/api/invoices/:id', (req, res) => {
    const { id } = req.params;
    invoices = invoices.filter(invoice => invoice.id !== id);  // Filter out the invoice to delete
    fs.writeFileSync('invoices.json', JSON.stringify(invoices, null, 2)); // Update the file
    res.status(200).send({ message: 'Invoice deleted.' });
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
