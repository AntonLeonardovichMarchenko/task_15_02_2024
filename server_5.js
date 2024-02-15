// https://metanit.com/web/javascript/22.2.php?ysclid=lsdiq5kgfk89710263
// сервер посылает клиенту разнообразные послания, которые он случайным образом
// выбирает из массива const messages.


const http = require("http");
const fs = require("fs");
url = require("url");
path = require("path");

let server = null;
// данные для отправки клиенту
const messages = ["Привет", "Как дела?", "Что делаешь?", "Ты уже спишь?", "Понятно. Тогда пока"];


server = http.createServer(function(request, response){


    response.setHeader("Content-Type", "text/html; charset=utf-8;");// установка заголовка


// ######################################################################
    var uri = url.parse(request.url).pathname;
    var fileName = path.join(process.cwd(), uri); // !!!!! ============



    console.log(fileName, '...', request.url, '...', request.headers.accept);
    let Url = request.url.substring(1);
    console.log(Url);

    let acc = request.headers.accept && request.headers.accept.substring(0,9);
    console.log('=====',acc,'=====');

//#######################################################################

    if(Url == "test_5.html"){   // если запрос SSE
        console.log('*0*',Url,'***');
        if (acc === "text/html") {

            sendEvent(response);
        }
        else{
            response.writeHead(400);
            response.end("Bad Request");
        }
    }
    else{   // в остальных случаях отправляем страницу test_5.html
        fs.readFile("test_5.html", (_, data) => response.end(data));
    }

    });

server.listen(3000, ()=>console.log("Сервер запущен по адресу http://localhost:3000"));

// отправляем сообщение клиенту
function sendEvent(response) {
    // формируем заголовки
    console.log('*1*');


    //response.setHeader("Content-Type", "text/html; charset=utf-8;");
    //response.writeHead(200, {
    //   "Content-Type": "text/event-stream",
    //    "Cache-Control": "no-cache",
    //    "Connection": "keep-alive"
    //});

    //response.write("id: " + id + "\n");
    //strOut = '<h2>' + message + '</h2>';
    //response.write(strOut);


    // существует два метода: innerHTML и textContent. А также метод
    // insertAdjacentHTML, который позволяет вставить текст или код в
    // любое место страницы.


    response.setHeader("UserId", 12);   // установка кастомного заголовка
    response.setHeader("Content-Type", "text/html; charset=utf-8;");

    console.log('*2*');
    const id = (new Date()).toLocaleTimeString();  // определяем идентификатор последнего события
                                                   // раз в 5 секунд(???) отправляем одно сообщение
    setInterval(() => { createServerSendEvent(response, id); }, 500);
}
// отправляем данные клиенту
let strOut = '';

function createServerSendEvent(response, id) {

    // генерируем случайное число - индекс для массива messages
    const index = Math.floor(Math.random() * messages.length);
    let message = messages[index];


    //console.log(message);

    //response.setHeader("UserId", 12);   // установка кастомного заголовка
    //response.setHeader("Content-Type", "text/html; charset=utf-8;");
    //response.write("id: " + id + "\n");

    //response.headers.add("secret", "1024");
    //response.headers.contentType= ContentType("text", "html");

    //const element = document.querySelector(div);
    //element.textContent = message;

    strOut = '<p>' + message + '</p>';
    response.write(strOut);

    //response.end();
 }

