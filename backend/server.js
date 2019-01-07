const http = require('http')
const app = require('./app')

const PORT = 8000;

http.createServer(app).listen(PORT, () => {
    console.info(`Backend Server is running on ${PORT}..`)
})

/*
uesrs={ 
    user : name of user, 
    socket_id : socket ID about the User
}
*/

var users=[];

const WebSocketServer = require('ws').Server,

wss = new WebSocketServer({port: 40510})

// except myself
function toBroadcast(sender,direct,data){
    
    for(let i =0 ; i<users.length ; i++){
        
        if(sender !== users[i].ws)
            
            send(users[i].ws,direct,data)
    }
}
function inBroadcast(direct,data){
    for(let i in users){
        
        send(users[i].ws,direct,data);
    }
}

function send(sender,direct,data){
    let message = {};
    if(direct === 'USERS'){
        message['direct'] = direct;
        message['users'] = users;
    }else {
        message= data;
        message['direct'] = direct;
    }

    sender.send(JSON.stringify(message))
    
    
}

wss.on('connection', function (ws) {
    
  ws.on('message', function (data) {
    
    data = JSON.parse(data);

    switch(data.direct){
        case 'CONNECT' : 

            // for(let i =0;i<users.length;i++){
            //     if(users[i].user==data.user)
            //         return;
            // }
            
            users=[...users,{'user':data.user,'ws':ws}];
            data['connect']=true;
            
            toBroadcast(ws,'CONNECTED',data)
            inBroadcast('USERS',users)
            
            
            break;

        case 'SEND_MESSAGE' :
            
            send(ws,'MESSAGE',{})
            
            send(ws,'SENDED_MESSAGE',data)
            
            if(data.toUser==data.fromUser) return;   //Message to yourself
            if(data.toUser==='ALL'){
                
                toBroadcast(ws,'ALL_MESSAGE',data)
                toBroadcast(ws,'COUNT_MESSAGE',{fromUser:"ALL"});     //count badge
            }else{
                let toUser = users.find(user => user.user === data.toUser);
                if(toUser===undefined){
                    send(ws,'NOT_FOUND_USER',data)
                }
                
                else{
                    send(toUser.ws,'RECEIVE_MESSAGE',data)
                    
                    send(toUser.ws,'COUNT_MESSAGE',{"fromUser":data.fromUser})    //count badge
                    
                }
            }  

            break;

        case 'DISCONNECT' :
            send(ws,'MESSAGE',{})
            
            for(let i =0;i<users.length;i++){
                if(users[i].user==data.user){
                    users.splice(i,1);
                    break;
                }
            }
            toBroadcast(ws,'DISCONNECT',data)
            inBroadcast('USERS',users)
            
            break;
        }
  })
})
    
    
  