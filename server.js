const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const frontendRoot = path.resolve(__dirname, 'frontend');
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff'
  });
  response.end(JSON.stringify(payload));
}

function loadLocalEnvironment() {
  let contents;

  try {
    contents = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return;
    throw error;
  }

  contents.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!match || match[1] in process.env) return;

    const value = match[2].replace(/^(['"])(.*)\1$/, '$2');
    process.env[match[1]] = value;
  });
}

async function getTmdb(url, apiKey) {
  url.searchParams.set('api_key', apiKey);

  const tmdbResponse = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(10000)
  });

  if (!tmdbResponse.ok) {
    return {
      statusCode: 502,
      payload: { error: `TMDB request failed (${tmdbResponse.status}).` }
    };
  }

  return {
    statusCode: 200,
    payload: await tmdbResponse.json()
  };
}

function createServer({ apiKey = process.env.TMDB_API_KEY } = {}) {
  return http.createServer(async (request, response) => {
    const requestUrl = new URL(request.url, 'http://localhost');

    if (requestUrl.pathname.startsWith('/api/')) {
      if (request.method !== 'GET') {
        sendJson(response, 405, { error: 'Only GET requests are supported.' });
        return;
      }

      if (!apiKey) {
        sendJson(response, 503, {
          error: 'TMDB is not configured. Set TMDB_API_KEY on the server.'
        });
        return;
      }

      let tmdbUrl;

      if (requestUrl.pathname === '/api/movies/search') {
        const query = requestUrl.searchParams.get('q')?.trim();

        if (!query || query.length > 120) {
          sendJson(response, 400, {
            error: 'Enter a movie title of 1 to 120 characters.'
          });
          return;
        }

        tmdbUrl = new URL('https://api.themoviedb.org/3/search/movie');
        tmdbUrl.searchParams.set('query', query);
        tmdbUrl.searchParams.set('include_adult', 'false');
        tmdbUrl.searchParams.set('language', 'en-US');
        tmdbUrl.searchParams.set('page', '1');
      } else {
        const movieMatch = requestUrl.pathname.match(/^\/api\/movies\/(\d+)$/);

        if (!movieMatch) {
          sendJson(response, 404, { error: 'API route not found.' });
          return;
        }

        tmdbUrl = new URL(
          `https://api.themoviedb.org/3/movie/${movieMatch[1]}`
        );
        tmdbUrl.searchParams.set('language', 'en-US');
      }

      try {
        const result = await getTmdb(tmdbUrl, apiKey);
        sendJson(response, result.statusCode, result.payload);
      } catch (error) {
        const timedOut = error.name === 'TimeoutError';
        sendJson(response, timedOut ? 504 : 502, {
          error: timedOut
            ? 'TMDB request timed out. Try again.'
            : 'Could not reach TMDB. Check the server connection and try again.'
        });
      }

      return;
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405, { Allow: 'GET, HEAD' });
      response.end();
      return;
    }

    let pathname;
    try {
      pathname = decodeURIComponent(requestUrl.pathname);
    } catch {
      response.writeHead(400);
      response.end('Invalid URL');
      return;
    }

    const relativePath = pathname === '/' ? 'index.html' : pathname.slice(1);
    const filePath = path.resolve(frontendRoot, relativePath);
    const relativeToFrontend = path.relative(frontendRoot, filePath);

    if (
      relativeToFrontend.startsWith('..') ||
      path.isAbsolute(relativeToFrontend)
    ) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    fs.stat(filePath, (error, stats) => {
      if (error || !stats.isFile()) {
        response.writeHead(404);
        response.end('Not found');
        return;
      }

      response.writeHead(200, {
        'Content-Length': stats.size,
        'Content-Type':
          mimeTypes[path.extname(filePath).toLowerCase()] ||
          'application/octet-stream',
        'X-Content-Type-Options': 'nosniff'
      });

      if (request.method === 'HEAD') {
        response.end();
        return;
      }

      fs.createReadStream(filePath).pipe(response);
    });
  });
}

if (require.main === module) {
  loadLocalEnvironment();

  const port = Number(process.env.PORT || 4173);
  const server = createServer();

  server.listen(port, '127.0.0.1', () => {
    console.log(`StreamFlix is running at http://localhost:${port}`);
    if (!process.env.TMDB_API_KEY) {
      console.warn('TMDB_API_KEY is not set; TMDB search will be unavailable.');
    }
  });
}

module.exports = { createServer };
