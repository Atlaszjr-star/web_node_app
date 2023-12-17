// backend for Express server

const express = require('express');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');

const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/generate-pdf', (req, res) => {
    const text = req.body.text;

    // Create a PDF document
    const pdfDoc = new PDFDocument();
    // Add content to the PDF document
    pdfDoc.text(text, { fontSize: 14 });
    // Set headers for PDF response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=generated.pdf');

    // Pipe the PDF content to the response stream
    pdfDoc.pipe(res);
    pdfDoc.end();

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});