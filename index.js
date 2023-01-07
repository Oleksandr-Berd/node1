const http = require("http");
const fs = require("fs").promises;
const PORT = 8082;

const requestHandler = async (request, response) => {
  //   if (request.url.indexOf("/home") >= 0) {
  //     response.writeHead(200, { "Content-type": "text/json" });
  //     return response.end('{"url": "homepage"}');
  //   }
  const manifest = await fs.readFile("./package.json", "utf8");
  response.writeHead(200, { "Content-type": "text/json" });
  //   return response.end('{"url": "other"}');

  return response.end(manifest);
};

const server = http.createServer(requestHandler);

server.listen(PORT, (err) => {
  if (err) {
    console.error(`Error at a server launch: `, err);
  }
  console.log(`Server works at port ${PORT}!`);
});
