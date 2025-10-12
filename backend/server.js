const express = require('express');
// const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Add your frontend URLs
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/api/waitlist', (req, res) => {
  res.status(200).json({ message: 'Waitlist endpoint - use POST to submit data' });
});

// Waitlist submission endpoint
app.post('/api/waitlist', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({
        error: 'Name and email are required',
        success: false
      });
    }

    console.log('Received waitlist submission:', { name, email });

    const scriptUrl = 'https://script.google.com/macros/s/AKfycbwitvbGhdzt4GYwGzPQoKiQfpF0vp--BsNlGr8vQ96ha8SzYVSu-Bz1xskUhL-hHph0Yw/exec';

    // Post to Google Apps Script
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });

    console.log('Google Apps Script response status:', response.status);

    if (!response.ok) {
      throw new Error(`Google Apps Script returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.text();
    console.log('Google Apps Script response:', data);

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Successfully joined waitlist',
      data: data
    });

  } catch (error) {
    console.error('Error in waitlist submission:', error);

    // Return error response
    res.status(500).json({
      success: false,
      error: 'Failed to submit to waitlist',
      details: error.message
    });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
  console.log(`CORS enabled for frontend development`);
});
