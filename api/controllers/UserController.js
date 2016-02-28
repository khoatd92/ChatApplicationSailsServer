/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var usersOnline = require('memory-cache');

module.exports = {
  loginSocket: function (request, response) {
    var dataFromClient = request.params.all();
    if (request.isSocket) {
      var socketId = request.socket.id;
      var socket = request.socket;
      console.log("loginSocket socket id " + socketId+"===phone number "+dataFromClient.phoneNumber);
      User.findOne({phoneNumber: dataFromClient.phoneNumber}).exec(function (error, user) {
        if(error){
          request.socket.disconnect();
          response.send(404, {error: error});
        }else if(user){
          User.update({phoneNumber:dataFromClient.phoneNumber},{socketId:socketId,status:'Online'}).exec(function afterwards(err, updated){
            if (err) {
              return;
            }
            console.log('Updated user with socket id ' + socketId);
            usersOnline.put(socketId, updated[0]);
          });
          console.log("Login Socket successful");
          User.subscribe(socket, user, 'message');
          // Get updates about users being created
          User.watch(socket);
          sails.sockets.emit(socketId, 'loginSocket',user);
        }else{
          console.log("User not found for login socket")
        }
      });
    } else {
      response.send(404, {error: "Request should be socket"});
    }
  },

  getUsersOnline : function(socketId) {
    return usersOnline.get(socketId);
  },

  removeUserOffline : function(socketId){
      usersOnline.del(socketId);
  },

  getSizeOfUsersOnline : function(){
    return usersOnline.size();
  },

  getAllUserOnline : function(request, response){
    var dataFromClient = request.params.all();
    User.findOne({phoneNumber: dataFromClient.phoneNumber}).exec(function (error, user) {
      if(error){
        response.send(404, {error: error});
      }else if(user){
        console.log("Size usersOnline "+usersOnline.size());
        var keys = usersOnline.keys();
        var users = [];
        for(i = 0; i< keys.length; i++){
          users.push(usersOnline.get(keys[i]));
        }
        response.send(200, MessageResponse.create(MessageResponse.GET_ALL_USER_ONLINE_SUCCESSFUL, MessageResponse.GET_ALL_USER_ONLINE_SUCCESSFUL_MESSAGE, users));
      }
    });
  }
};

