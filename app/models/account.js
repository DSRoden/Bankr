'use strict';

var Mongo = require('mongodb');
var _     = require('lodash');

function Account(o){
  this.name           = o.name;
  this.type           = o.type;
  this.balance        = parseInt(o.balance);
  this.opened         = new Date(o.opened);
  this.photo          = o.photo;
  this.color          = o.color;
  this.pin            = parseInt(o.pin);
  this.transactions   = [];
  this.transferId     = Mongo.ObjectID(o.transferId);
}

Object.defineProperty(Account, 'collection', {
  get: function(){return global.mongodb.collection('accounts');}
});

Account.create = function(o, cb){
  var a = new Account(o);
  Account.collection.save(a, cb);
};

Account.all = function(cb){
  Account.collection.find().toArray(cb);
};

module.exports = Account;
