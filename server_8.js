// Сервер пишет клиенту приветствия

const http = require("http");
const fs = require("fs");

http.createServer(function(request, response){

console.log('%%#%%',request.url);

    if(request.url == "/test_8.html"){

         response.write("<h1>Hello server_8</h1><h3>Hello qwerty</h3>");
         response.end("server_8");
            //response.close();

    }
    else{
        fs.readFile("test_8.html", (error, data) => response.end(data));
    }
}).listen(3000, ()=>console.log("Сервер запущен по адресу http://localhost:3000"));