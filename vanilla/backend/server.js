
//const ws = require('./ws')

const WebSocketServer = require('ws').Server,

wss = new WebSocketServer({port: 40510})

wss.on('connection', function (ws) {
  console.log('connect')
  ws.on('message', function (message) {
    console.log(message.a)
    console.log('received: %s', message)
    ws.send('hi');
  })
  
})