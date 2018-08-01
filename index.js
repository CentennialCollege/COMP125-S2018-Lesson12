const http = require('http'); // inserting the http module 
const fs = require("fs"); // inserting the file system module
const path = require("path"); // inserting the path module

const port = sanitizePort(process.env.PORT || 3000);

const server = http.createServer((req, res) => {
  let filePath = "." + req.url;

  if(filePath == "./") {
    filePath = "./index.html";
  }

  let extName = path.extname(filePath);
  let contentType = "text/html";

  switch(extName) {
    case ".js":
      contentType = "text/javascript";
    break;
    case ".css":
     contentType = "text/css";
    break;
    case ".json":
      contentType = "application/json";
    break;
    case ".png":
      contentType = "image/png";
    break;
    case ".jpg":
      contentType = "image/jpg";
    break;
    case ".wav":
      contentType = "audio/wav";
    break;
  }

  fs.readFile(filePath, function(error, content){
    if(error) {
      if(error.code == "ENOENT") { // file not found error
        fs.readFile("./404.html", function(error, content){
          res.writeHead(200, { 'Content-Type': contentType});
          res.end(content, "utf-8");
        });
      }
      else {
        res.writeHead(500);
        res.end("Sorry, server Error!\n");
        res.end();
      }
    }
    else {
      res.writeHead(200, {'Content-Type': contentType});
      res.end(content, "utf-8");
    }
  });


});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

function sanitizePort(port) {
  if(isNaN(port)) {
    port = parseInt(port, 10);
  }

  return port;
}