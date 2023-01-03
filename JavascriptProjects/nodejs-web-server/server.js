const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");

  const { method } = request;

  if(method == "GET") {
    response.statusCode = 200;
    response.end("<h1>Hello!</h1>");
  }

  if(method == "POST") {
    let body = [];

    request.on('data', (chunk) => {
      body.push(chunk);
      console.log(chunk)
    })

    request.on('end', () => {
      body = Buffer.concat(body).toString();
      const { name } = JSON.parse(body);
      response.end(`<h1>Hallo, ${name}!</h1>`)
    })
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
