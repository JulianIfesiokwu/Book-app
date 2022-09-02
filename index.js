const http = require("http");
const fs = require("fs");
const path = require("path");
const { Console } = require("console");

const booksPath = path.join(__dirname, "booksDB", "books.json");

const PORT = 5000;
const HOSTNAME = "localhost";

function requestHandler(req, res) {
  if (req.url === "/books" && req.method === "GET") {
    getAllBooks(req, res);
  } else if (req.url === "/addBook" && req.method === "POST") {
    addBook(req, res);
  } else if (req.url === "/books" && req.method === "PUT") {
    getAllBooks(req, res);
  } else if (req.url === "/books" && req.method === "DELETE") {
    getAllBooks(req, res);
  }
}

function getAllBooks(req, res) {
  fs.readFile(booksPath, "utf-8", (error, data) => {
    if (error) {
      console.log(error);
      res.writeHead(400);
      res.end("An error occured");
    }

    res.writeHead(200);
    res.end(data);
  });
}

function addBook(req, res) {
  const body = [];

  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const parsedBody = Buffer.concat(body).toString();
    const newBook = JSON.parse(parsedBody);

    // add new book to database
    fs.readFile(booksPath, "utf-8", (error, data) => {
      if (error) {
        console.log(error);
        res.writeHead(400);
        res.end("An error occured");
      }

      const oldBooks = JSON.parse(data);
      const allBooks = [...oldBooks, newBook];

      fs.writeFile(booksPath, JSON.stringify(allBooks), (err, data) => {
        if (error) {
          console.log(error);
          res.writeHead(400);
          res.end("An error occured");
        }

        res.end(JSON.stringify(newBook));
      });
    });
  });
}

const server = http.createServer(requestHandler);

server.listen(PORT, HOSTNAME, () => {
  booksDB = JSON.parse(fs.readFileSync(booksPath, "utf-8"));
  console.log("Server started successfully...");
});
