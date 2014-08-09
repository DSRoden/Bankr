'use strict';

var Mongo = require('mongodb');
var _     = require('lodash');

function Account(o){
  this.name           = o.name;
  this.type           = o.type;
  this.balance        = parseFloat(o.balance);
  //this.opened         = new Date(o.opened);
  this.opened         = new Date();
  this.photo          = o.photo;
  this.color          = o.color;
  this.pin            = o.pin;
  this.transactions   = [];
  this.transferId     = Mongo.ObjectID(o.transferId);
}

Object.defineProperty(Account, 'collection', {
  get: function(){return global.mongodb.collection('accounts');}
});

Account.prototype.insert = function(cb){
  Account.collection.save(this, cb);
};

Account.prototype.addTrans = function(trans, cb){
  if(this.pin === trans.pin){
  var amt = parseFloat(trans.amt);
 
  this.balance = (trans.isDeposit) ? (this.balance + amt): this.balance;
  this.balance = (trans.isDraw && this.balance > amt) ? (this.balance - amt) : this.balance;
 
  if( trans.isDraw === true && this.balance < amt){
     trans.fee = 50;
     this.balance = this.balance - amt - 50;
  }

  } else { this.balance = this.balance;}
 
  //trans.id = this.transactions.length
  this.transactions.push(trans);
  this.transactions[this.transactions.length-1].id = this.transactions.length;
  Account.collection.update({_id: this._id}, {$push:{transactions:trans}}, cb);
  
};

Account.all = function(cb){
  Account.collection.find().toArray(function(err, objects){
    var accounts = objects.map(function(o){
     return changePrototype(o);
    });
  
  cb(accounts);
  });
};

Account.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);

  Account.collection.findOne({_id:_id}, function(err, obj){
    var account = changePrototype(obj);
    cb(account);
  });
};
module.exports = Account;

//Private Function

function changePrototype(obj){
  return _.create(Account.prototype, obj);
}
