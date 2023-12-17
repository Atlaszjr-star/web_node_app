// src/components/PDFGenerator.js
import React, { useState } from 'react';
import axios from 'axios';

const PDFGenerator = () => {
    const [text, setText] = useState('');
    const [pdfUrl, setPdfUrl] = useState('');

    const handleGeneratePDF = async () => {
        try {
            const response = await axios.post('http://localhost:3001/generate-pdf', { text }, { responseType: 'blob' });
            // create a blob from response data
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            setPdfUrl(pdfUrl);
            //window.open(pdfUrl, '_black');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <div style={{ display: 'flex', width:'100%', height: '100vh' }}>
            <div style={{ flex: 1, padding: '20px', boxSizing: 'border-box' }}>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text for PDF"
                    style={{ width: '100%', height: '80vh', boxSizing: 'border-box', resize: 'none' }}
                ></textarea>
                <button onClick={handleGeneratePDF}>Generate PDF</button>
            </div>
            <div style={{ flex: 1, padding:'20px', display: 'flex', alignItems: 'top', justifyContent: 'center' }}>
                <iframe
                    title = "Generate PDF"
                    src={pdfUrl}
                    style={{ border: 'none', width: '100%', height: '80vh' }}
                ></iframe>
            </div>
        </div>
    );
};

export default PDFGenerator;