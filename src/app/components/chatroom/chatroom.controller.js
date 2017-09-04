import logo from '../../../public/img/logo.png'
import avatar from '../../../public/img/avatar/avatar1.jpg'
import io from 'socket.io-client';

export default class ChatroomController {
  constructor($scope) {
    console.log("chat room ctrl ..");

    this.logo = logo;
    this.avatar = avatar;
    this.mode = 'room';
    this.userInfo = {};
    this.msgList = [];
    //this.initClient();

    var socket = io('http://localhost:3000?roomid=k12');
    this.socket = socket;
    console.log("socket:", socket)
    socket.on('connect', function() {
      console.log("connect ...");
      console.log("socket id:", socket.id)
      socket.emit('join', {
        username: 'tianhang'
      });
    });

    socket.on('event', function(data) {
      console.log(data);
    });

    socket.on('disconnect', function() {
      console.log("disconnect ...");
    });

    socket.on('message', (msg) => {
      console.log('msg:', msg);
      switch (msg.event) {
        case 'join':
          if (msg.data.username) {
            console.log(msg.data.username + '加入了聊天室');
            var data = {
              text: msg.data.username + '加入了聊天室'
            };
            //showNotice(data);
          }
          break;
        case 'broadcast_say':
          // console.log("this:", this)
          if (msg.data.username !== this.userInfo.username) {
            console.log(msg.data.username + '说: ' + msg.data.text);
            //showMessage(msg.data);
            console.log(msg);
            this.msgList.push(msg.data);
            $scope.$apply(); //this triggers a $digest
          }
          break;
        case 'broadcast_quit':
          if (msg.data.username) {
            console.log(msg.data.username + '离开了聊天室');
            var data = {
              text: msg.data.username + '离开了聊天室'
            };
            //showNotice(data);
          }
          break;
      }
    })

  }

  onSubmit(msg) {
    this.sendRoomMsg(msg, 'k12');
  }

  sendMsg(text, socketId) {
    this.socket.emit('msg', {
      username: 'tianhang',
      text: text,
      id: socketId,
      type: 'msg'
    });
  }

  sendRoomMsg(text, roomId) {
    this.socket.emit('roommsg', {
      username: 'tianhang',
      text: text,
      id: roomId,
      type: 'roommsg'
    });
  }

}