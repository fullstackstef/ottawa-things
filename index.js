//CORE MODULES
const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

//TEMPLATES - reading each file
const overviewTemp = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const productTemp = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);
const cardTemp = fs.readFileSync(`${__dirname}/templates/card.html`, "utf-8");

//API
const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

//CUSTOM METHODS

//SERVER

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html"
    });

    const cardsHtml = dataObj
      .map(val => replaceTemplate(cardTemp, val))
      .join("");

    const output = overviewTemp.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);

    //PRODUCT PAGE
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html"
    });

    const product = dataObj[query.id];

    const output = replaceTemplate(productTemp, product);

    res.end(output);

    //API
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json"
    });
    res.end(data);

    //NOT FOUND PAGE
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello world",
      body: "Well..."
    });
    res.end("<h1>Page Not Found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server is running on port 8000");
});
