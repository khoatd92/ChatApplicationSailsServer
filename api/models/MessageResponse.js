/**
 * MessageResponse.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    STATUS_CODE: 'string',
    STATUS_MSG: 'string',
    DATA_RETURN: 'DATA_RETURN'
  },
  create: function (STATUS_CODE, STATUS_MSG, DATA_RETURN) {
//{"STATUS_CODE":1000,"DATA_RETURN":Json,"STATUS_MSG":"Success"}
    var messageReturn = {};
    messageReturn.STATUS_CODE = STATUS_CODE;
    messageReturn.STATUS_MSG = STATUS_MSG;
    messageReturn.DATA_RETURN = DATA_RETURN;
    return messageReturn;
  }
};
/*
 500 - server error
 601 - phone number already taken
 602 - Can't login(wrong user name or password)
 603 - login successful
 604 - sync contact successful
 605 - sign up successful
 */
module.exports.SUCCESS = "SUCCESS";
module.exports.ERROR = "ERROR";
module.exports.SERVER_ERROR = 600;
module.exports.SERVER_ERROR_MESSAGE = "SERVER_ERROR";
module.exports.PHONE_NUMBER_ALREADY_TAKEN = 601;
module.exports.PHONE_NUMBER_ALREADY_TAKEN_MESSAGE = "Phone number already taken";
module.exports.WRONG_USERNAME_PASSWORD = 602;
module.exports.WRONG_USERNAME_PASSWORD_MESSAGE = "Wrong user name or password";
module.exports.LOGIN_SUCCESSFUL = 603;
module.exports.LOGIN_SUCCESSFUL_MESSAGE = "Login successful";
module.exports.SYNC_CONTACT_SUCCESSFUL = 604;
module.exports.SYNC_CONTACT_SUCCESSFUL_MESSAGE = "Sync contact successful";
module.exports.SIGN_UP_SUCCESSFUL = 605;
module.exports.SIGN_UP_SUCCESSFUL_MESSAGE = "Signup successful";
