const http = require("http");

const PORT = 5000;

const server = http.createServer((req, res) => {
  console.log("yes we have a server");
});

server.listen(PORT);
