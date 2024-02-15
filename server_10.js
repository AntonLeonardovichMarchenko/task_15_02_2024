const http = require("http");
const fs = require("fs");

server = http.createServer(function(request, response){

    if(request.url == "/test_10.html"){
        response.end("Fetch на test_10.html");
    }
    else{
        //fs.readFile("test_10.html", (error, data) => response.end(data));
        console.log('$$$$$$$$$');
    }
})

server.listen(3000, ()=>console.log("Сервер запущен по адресу http://localhost:3000"));