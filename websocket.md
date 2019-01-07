# WebSocket

## 1. WebSocket의 개념
웹소켓은 하나의 TCP 접속에 양방향 통신 채널을 제공하는 컴퓨터 통신 프로토콜이다.

### HTTP와 비교시 장단점
* 장점: Server 에서 Client로 바로 Event를 줄 수 있따는 점에서 성능향 효율적이다.
* 단점: 코드 수준에서 관리가 어렵다. 이벤트 방식이기 때문에 Event Listener 등록, Event 함수 등록해서 사용해야 한다.
	
## 2. 웹소켓 접속과정

### Handshake

웹소켓을 연결하기 위해 클라이언트는 웹소켓 핸드세이크 요청을 보내며, 이렇게 하면 서버는 웹소켓 핸드세이크 응답을 아래의 예에서 보는 바와 같이 반환한다.

클라이언트 요청:
~~~
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9G
BhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
~~~
서버 응답:

~~~
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
~~~

### Sec-Websocket-Accept를 만드는 과정

1. 클라이언트로부터 받은 Sec-WebSocket-Key에 명시된 문자열에 미리 정의된 문자열인 "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"을 연결한 새로운 문자열을 만듭니다.

2. 새로 만든 문자열의 SHA-1 해시값을 구합니다.

3. 해시값을 base64로 인코딩합니다.

서버 응담에 포함된 Sec-WebSocket-Accept값이 잘 못 된 경우, 핸드쉐이크는 실패하게 된다.





## Reference

* 웹소켓 - 위키백과 : https://ko.wikipedia.org/wiki/%EC%9B%B9%EC%86%8C%EC%BC%93

* 웹소켓 개념 : https://blog.naver.com/joebak/220516030309

* 웹소켓 접속과정 : https://blog.naver.com/eztcpcom/220040171267

