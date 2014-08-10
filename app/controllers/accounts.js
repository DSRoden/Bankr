'use strict';

var Account = require('../models/account');
var Transaction = require('../models/transaction');

exports.init = function(req, res){
  res.render('accounts/init');
};

exports.create = function(req, res){
  var account = new Account(req.body);
  account.insert(function(){
    res.redirect('/accounts');
  }); 
};

exports.index = function(req, res){
  Account.all(function(accounts){
    res.render('accounts/index', {accounts:accounts});
  });
};

exports.show = function(req, res){
  Account.findById(req.params.id, function(account){
    res.render('accounts/show', {account:account});
      console.log(account.transactions);
  });
};

exports.transInit = function(req, res){
  Account.findById(req.params.id, function(account){
    res.render('accounts/newTrans', {account:account});
  });
};

exports.transact = function(req, res){
  Account.findById(req.params.id.toString(), function(account){
    var transaction = new Transaction(req.body);
    account.addTrans(transaction, function(){
      console.log(transaction.type);
      res.redirect('/accounts/' + req.params.id);
    });
  });
};
