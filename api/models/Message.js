/**
* Message.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    receiveId: 'STRING',
    senderId: 'STRING',
    messageId: 'STRING',
    isReceived: 'STRING',
    message: 'STRING',
    messageTimestamp: 'STRING',
    isEncrypted: 'STRING'
  }
};

