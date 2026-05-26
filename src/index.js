const http = require("http");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  // Написать обработчик запроса:
  // - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200
  // - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400
  // - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200
  // - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200
  // - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500
  const url = new URL(request.url, "http://127.0.0.1");
  console.log(url);
  console.log(url.searchParams);
  if (url.searchParams.has("hello")) {
    const name = url.searchParams.get("hello");
    if (name) {
      response.setHeader("Content-Type", "text/plain");
      response.statusCode = 200;
      response.end(`Hello, ${name}.`);
    } else {
      response.setHeader("Content-Type", "text/plain");
      response.statusCode = 400;
      response.end("Enter a name");
    }
  } else if (url.searchParams.has("users")) {
    const users = getUsers();
    response.setHeader("Content-Type", "application/json");
    response.statusCode = 200;
    response.end(users);
  } else if (url.searchParams.toString() === "") {
    response.setHeader("Content-Type", "text/plain");
    response.statusCode = 200;
    response.end("Hello, World!");
  } else {
    response.statusCode = 500;
    response.end();
  }
});

server.listen(3003, () => {
  console.log("Server is listening on port 3003");
});
