import http from 'http';
import { URL } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

// CORS configuration
const originsEnv = (process.env.ALLOWED_ORIGINS || '').trim();
const allowedOrigins = new Set(
  originsEnv ? originsEnv.split(',').map(s => s.trim()).filter(Boolean) : []
);

function buildCorsHeaders(req) {
  const origin = req.headers.origin;
  const reqMethod = req.headers['access-control-request-method'];
  const reqHeaders = req.headers['access-control-request-headers'];
  const headers = {
    'Access-Control-Allow-Methods': reqMethod || 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': reqHeaders || 'Content-Type, Accept',
    'Access-Control-Allow-Credentials': 'true',
    'Vary': 'Origin, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Request-Private-Network'
  };

  if (origin && allowedOrigins.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  // If the browser requests private network access, explicitly allow it on preflight
  if (req.method === 'OPTIONS' && 'access-control-request-private-network' in (req.headers || {})) {
    headers['Access-Control-Allow-Private-Network'] = 'true';
  }

  return headers;
}

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
  // Note: build CORS headers per request to reflect Origin
  const cors = buildCorsHeaders(res.req);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    ...cors
  });
  res.end(JSON.stringify(data));
}

function handleCORS(req, res) {
  const cors = buildCorsHeaders(req);
  // Respond with no body for preflight
  res.writeHead(204, cors);
  res.end();
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const method = req.method;

  if (method === 'OPTIONS') {
    return handleCORS(req, res);
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

      const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

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