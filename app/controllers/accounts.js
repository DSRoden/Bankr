'use strict';

var Account = require('../models/account');

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
