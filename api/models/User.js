/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    phoneNumber: 'STRING',
    socketId: 'STRING',
    token: 'STRING',
    lastLoginTimestamp: 'STRING',
    status: 'STRING',
    userStatusMessage:'STRING',
    profilePhotoURL:'STRING',
    listFriendByPhoneNumber: 'STRING',
    activeCode: 'STRING'
  }
};

