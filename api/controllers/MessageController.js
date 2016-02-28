/**
 * MessageController
 *
 * @description :: Server-side logic for managing Messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  chat: function (request, response) {
    var dataFromClient = request.params.all();
    if (request.isSocket) {
      var socketId = request.socket.id;
      var socket = request.socket;
      var message = dataFromClient.message;
      var receiveId = dataFromClient.phoneNumberReceiver;
      console.log("chat message "+message+"--phoneNumberSender "+socketId+"---receive id "+receiveId);
      Message.create({message: message, phoneNumberSender: socketId, phoneNumberReceiver: receiveId}).exec(function (error, message) {
        if(error){
          console.log("create message error ");
        }else{
          sails.sockets.emit(receiveId, 'message', message);
          sails.sockets.emit(socketId, 'confirm_receive_message', message);
        }
      });
    }
  },
};

