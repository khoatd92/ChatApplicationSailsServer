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
      console.log("loginSocket socket id " + socketId+"===phone number "+dataFromClient.phoneNumber +"===password "+dataFromClient.password);
      User.findOne({phoneNumber: dataFromClient.phoneNumber, password: dataFromClient.password}).exec(function (error, user) {
        if(error){
          request.socket.disconnect();
          response.send(404, {error: error});
        }else if(user){
          usersOnline.put(socketId, user);
          console.log("Login Socket successful");
          User.subscribe(socket, user, 'message');
          // Get updates about users being created
          User.watch(socket);
          // Publish this user creation event to every socket watching the User model via User.watch()
          User.publishCreate(user);
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
  }

};

