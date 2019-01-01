# CHAT_WEB
> Implemented chatting web page through Node.js & Vue.js


## Until we have a Web Socket
* 전형적인 브라우저 렌더링은 HTTP request에 대한 HTTP response를 받아 브라우저 화면을 새로 띄우는 방식이었다. 이러한 방식은 작은 변화에도 브라우저를 새로 띄워야 되는 현상때문에 유저와 브라우저간에 작은 상호작용을 지원하기에는 힘들었다.

* 상호작용하는 웹 서비스를 위해 Hidden Frame을 이용한 방법이나 Long Polling, Stream 등 다양한 방법을 사용했다. 그러나 이러한 방식은 브라우저가 HTTP 요청를 보내고 웹 서버가 이 요청에 대한 HTTP 응답를 보내는 단방향 메세지 교환 '규칙'을 변경하지 않고 구현한 방식이다. 그렇기 때문에 상호작용하는 웹 페이지를 복잡하고 어려운 코드로 구현해야 했다.

* 브라우저와 웹 서버 사이에 더 자유로운 양방향 메시지 송수신이 필요했기 때문에 HTML5 표준안의 일부로 WebSocket API(이후 WebSocket)가 등장했다.

## WebSocket Protocol
WebSocket은 HTTP와 같은 80번 포트를 통해 웹 서버에 연결하며, 아래 그림과 같이 UPGRADE 헤더를 사용하여 웹 서버에 요청한다.

~~~
GET /... HTTP/1.1  
Upgrade: WebSocket  
Connection: Upgrade  
~~~

브라우저는 "Upgrade: WebSocket" 헤더 등과 함께 랜덤하게 생성한 키를 서버에 보낸다. 웹 서버는 이 키를 바탕으로 토큰을 생성한 후 브라우저에 돌려준다. 이런 과정으로 WebSocket 핸드쉐이킹이 이루어진다.

## Socket.IO

Socket.IO는 실시간 웹 어플리케이션을 위한 자바스크립트 라이브러리이며, 웹 클라이언트와 서버간의 양방향 통신을 가능하게 한다.

### Installing
~~~
npm install --save socket.io-client
~~~
~~~

const express = require('express');
const app = express();

//Open the listening server port
const server = app.listen(8000, function() {
    console.log('server running on port 8000');
});

//Require socket.io about server
const io = require('socket.io')(server);

// Connection event
io.on('connection', (socket) => {
  socket.emit('request', /* */); // emit an event to the socket
  io.emit('broadcast', /* */); // emit an event to all connected sockets
  socket.on('reply', () => { /* */ }); // listen to the event
});
~~~

### Rooms

또한 소켓들끼리 임의의 채널을 만들 수 있다.

~~~
io.on('connection', function(socket){
  socket.join('some room');
});
~~~

### Joining and leaving

해당 채널에 broadcasting이나 emit을 간다하게 사용할 수 있다.
* Broadcasting
~~~
io.to('some room').emit('some event');
~~~
* Leave
~~~
socket.leave('chat')
~~~

### Send message through socket id

~~~
io.to('Socket_id').emit('some event',data);
~~~

## Vue-Socket.IO
Vue-Socket.io is a socket.io integration for Vuejs, easy to use, supporting Vuex and component level socket consumer managements

### Installing
~~~
npm install vue-socket.io --save
~~~


* main.js
~~~
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
 
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:8000',
}))

~~~





## Dictionary:
* __Long Polling__ : 기본 polling은 클라이언트가 주기적으로 서버에게 request를 보내는 방식이고, long polling 같은 경우, 클라이언트가 서버에 있는 정보를 요청하면 지정한 시간동안 연결을 열어두는 방식.

## Reference
* Websocket : https://d2.naver.com/helloworld/1336
* Socket.IO : https://socket.io/docs
* Vue-socket.IO : https://www.npmjs.com/package/vue-socket.io


