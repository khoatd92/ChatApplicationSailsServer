/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  signUp: function (req, res) {
    var phoneNumber = req.param("phoneNumber");
    console.log("start signup: phone number " + phoneNumber);
    User.findOne({phoneNumber: phoneNumber}).exec(function (err, result) {
      if (err) {
        res.send(200, MessageResponse.create(MessageResponse.SERVER_ERROR, MessageResponse.SERVER_ERROR_MESSAGE, "DB Error"));
      } else if (result) {
        res.send(200, MessageResponse.create(MessageResponse.PHONE_NUMBER_ALREADY_TAKEN, MessageResponse.PHONE_NUMBER_ALREADY_TAKEN_MESSAGE, MessageResponse.PHONE_NUMBER_ALREADY_TAKEN_MESSAGE));
      } else {
        User.create({phoneNumber: phoneNumber, userStatusMessage: "Hi there! I am using Sweet Love"}).exec(function (error, user) {
          if (error) {
            res.send(200, MessageResponse.create(MessageResponse.SERVER_ERROR, MessageResponse.SERVER_ERROR_MESSAGE, "DB Error"));
          } else {
            console.log("create user " + user);
            User.publishCreate(user);
            res.send(200, MessageResponse.create(MessageResponse.SIGN_UP_SUCCESSFUL, MessageResponse.SIGN_UP_SUCCESSFUL_MESSAGE, user));
          }
        });
      }
    });
  },

  login: function (req, res) {
    var phonenumber = req.param("phoneNumber");
    User.findOne({phoneNumber: phonenumber}).exec(function (err, result) {
      console.log("Result login " + result);
      if (err) {
        res.send(200, MessageResponse.createJson(MessageResponse.SERVER_ERROR, MessageResponse.SERVER_ERROR_MESSAGE, "DB Error"));
      } else {
        if (result) {
          res.send(200, MessageResponse.create(MessageResponse.LOGIN_SUCCESSFUL, MessageResponse.LOGIN_SUCCESSFUL_MESSAGE, result));
        } else {
          res.send(200, MessageResponse.create(MessageResponse.WRONG_USERNAME_PASSWORD, MessageResponse.WRONG_USERNAME_PASSWORD_MESSAGE, "Wrong UserName or Password"));
        }
      }
    });
  },

  chat: function (req, res) {
    var data_from_client = req.params.all();
    console.log("chat function req.method  " + req.method);
    console.log("chat function " + data_from_client.phoneNumber);
    if (req.isSocket && req.method === 'POST') {
      console.log("This is the message from connected client So add new conversation");
    } else if (req.isSocket) {
      console.log("subscribe client to model changes");
    }
  },

  syncContact: function (req, res) {
    console.log("sync contact start");
    var arrayPhoneNumber = req.param("listphonenumber");
    var phoneNumber = req.param("phoneNumber");
    console.log("sycn contact : list phone number " + arrayPhoneNumber);
    var phoneNumberActive = [];
    async.forEach(arrayPhoneNumber, function (item, callback) {
      //console.log('sycn contact search phone number ' + item);
      User.findOne({phoneNumber: item}).exec(function (err, result) {
        if (err) {
          console.log("DB Error " + item);
          return callback("DB Error ");
        } else {
          if (result) {
            //User.subscribe(result.socketId, result.phoneNumber);
            phoneNumberActive.push(result);
            //console.log("sycn contact User Found " + item);
          } else {
            //console.log("sycn contact User not Found " + item);
          }
          callback();
        }
      });
    }, function (err) {
      console.log('Processed finish ' + phoneNumberActive);
      if (err) {
        console.error(err.message);
      } else {
        //User.update({phoneNumber: phoneNumber}, {listFriendByPhoneNumber: phoneNumberActive}).exec(function afterwards(err, updated) {
        //  if (err) {
        //    return;
        //  }
        //  console.log('Add phone number after sync');
        //});
        res.send(200, MessageResponse.create(MessageResponse.SYNC_CONTACT_SUCCESSFUL, MessageResponse.SYNC_CONTACT_SUCCESSFUL_MESSAGE, phoneNumberActive));
        console.log('Processed successfully');
      }
    });
  }
};



