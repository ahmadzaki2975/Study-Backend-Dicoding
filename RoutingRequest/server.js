const http = require('http');


const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.setHeader("X-Powered-By", "NodeJS");

  const {method, url} = request;

  if(url == "/") {
    if(method == "GET") {
      response.end("Ini adalah homepage");
    } else {
      response.end(`Halaman tidak dapat diakses dengan ${method} request`);
    }
  }
  else if(url == "/about") {
    if(method == "GET") {
      const message = { message : "Halo! ini adalah halaman about"}
      response.end(JSON.stringify(message));
    }
    else if(method == "POST") {
      let body = [];
      request.on("data", (chunk) => {
        body.push(chunk);
      });
      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const {name} = JSON.parse(body);
        response.end(`Halo, ${name}! Ini adalah halaman about`);
      });
    }
    else {
      response.end(`Halaman tidak dapat diakses dengan ${method} request`);
    }
  } else {
    response.statusCode = 400;
    response.end("Halaman tidak ditemukan");
  }
}

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";
server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});