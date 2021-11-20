// Taken from: https://deno.land/manual@v1.13.2/examples/http_server
// but amended.

import { routes } from './route.js';

// Start listening on port 8080 of localhost.
const server = Deno.listen({ port: 8080 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

// Connections to the server will be yielded up as an async iterable.
for await (const conn of server) {
  // In order to not be blocking, we need to handle each connection individually
  // without awaiting the function
  serveHttp(conn);
}

async function serveHttp(conn) {
  // This "upgrades" a network connection into an HTTP connection.
  const httpConn = Deno.serveHttp(conn);
  // Each request sent over the HTTP connection will be yielded as an async
  // iterator from the HTTP connection.
  for await (const requestEvent of httpConn) {
    // The native HTTP server uses the web standard `Request` and `Response`
    // objects.
    let {
      pathname
    } = new URL(requestEvent.request.url);

    if (pathname in routes) {
      routes[pathname](requestEvent);
    } else {
      const res = new Response('This path is not supported', {
        status: 404
      });

      requestEvent.respondWith(res);
    }
  }
}