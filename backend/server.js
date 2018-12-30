const express = require('express');
const app = express();

/*
uesrs={ 
    user : name of user, 
    socket_id : socket ID about the User
}
*/
var users=[];

const server = app.listen(8000, function() {
    console.log('server running on port 8000');
});

const io = require('socket.io')(server);

io.on('connection', function(socket) {
    
  
    //CHAT PART
    socket.on('CONNECT',(data)=>{
        
        for(let i =0;i<users.length;i++){
            if(users[i].user==data.user)
                return;
        }
        users=[...users,{'user':data.user,'socket_id':socket.id}];
        socket.join('chat');
        data['connect']=true;
        socket.broadcast.to('chat').emit('CONNECTED',data)
        io.sockets.in('chat').emit('USERS',users);
        
    })
    socket.on('SEND_MESSAGE', (data) => {
        
        socket.emit('SENDED_MESSAGE',data)
        if(data.toUser==='all'){
            socket.broadcast.to('chat').emit('RECEIVE_MESSAGE',data)
        }else{
            let toUser = users.find(user => user.user === data.toUser);
            io.to(toUser.socket_id).emit('RECEIVE_MESSAGE',data);
        }
    });

    socket.on('DISCONNECT', (data) => {
        for(let i =0;i<users.length;i++){
            if(users[i].user==data.user){
                users.splice(i,1);
                break;
            }
        }
        socket.broadcast.to('chat').emit('DISCONNECT',data)
        io.sockets.in('chat').emit('USERS',users);
        socket.leave('chat')
    });

});
