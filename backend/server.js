import http from 'http';
import { URL } from 'url';

const PORT = 3001;

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:5173',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Access-Control-Allow-Credentials': 'true'
};

function parseJSONBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

function sendJSONResponse(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    ...corsHeaders
  });
  res.end(JSON.stringify(data));
}

function handleCORS(res) {
  res.writeHead(200, corsHeaders);
  res.end();
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const method = req.method;

  if (method === 'OPTIONS') {
    return handleCORS(res);
  }

  if (pathname === '/api/waitlist' && method === 'GET') {
    return sendJSONResponse(res, 200, {
      message: 'Waitlist endpoint - use POST to submit data'
    });
  }

  if (pathname === '/api/waitlist' && method === 'POST') {
    try {
      const body = await parseJSONBody(req);
      const { name, email, supportType } = body;

      if (!name || !email || !supportType) {
        return sendJSONResponse(res, 400, {
          error: 'Name, email, and support type are required',
          success: false
        });
      }

      console.log('Received waitlist submission:', { name, email, supportType });

      const scriptUrl = 'https://script.google.com/macros/s/AKfycbwitvbGhdzt4GYwGzPQoKiQfpF0vp--BsNlGr8vQ96ha8SzYVSu-Bz1xskUhL-hHph0Yw/exec';

      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          support: supportType,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Google Apps Script returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.text();
      console.log('Google Apps Script response:', data);

      return sendJSONResponse(res, 200, {
        success: true,
        message: 'Successfully joined waitlist',
        data
      });
    } catch (error) {
      console.error('Error in waitlist submission:', error);

      return sendJSONResponse(res, 500, {
        success: false,
        error: 'Failed to submit to waitlist',
        details: error.message
      });
    }
  }

  sendJSONResponse(res, 404, { error: 'Route not found' });
});


server.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
  console.log(`CORS enabled for frontend development`);
});