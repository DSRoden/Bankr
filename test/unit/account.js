/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect       = require('chai').expect;
var Account      = require('../../app/models/account');
var dbConnect    = require('../../app/lib/mongodb');
var Mongo        = require('mongodb');
var cp           = require('child_process');
var db           = 'bankr-test';

describe('Account', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });
  
  beforeEach(function(done){
    Account.collection.remove(function(){
   // cp.execFile(__dirname + '/../scripts/freshdb.sh', [db], {cwd:__dirname + '/../scripts'}, function(){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Account object', function(){
      var o = {name:'jane doe', type: 'checking', balance: '50.00', opened:'05/07/2011', photo: 'p.jpg', color: 'purple', pin: '3333', transferId:'53d01ddf4fbbd6de0b530014'};
      var a1 = new Account(o);
      expect(a1).to.be.instanceof(Account);
      expect(a1.name).to.equal('jane doe');
      expect(a1.type).to.equal('checking');
      expect(a1.balance).to.equal(50.00);
      expect(a1.opened).to.be.instanceof(Date);
      expect(a1.photo).to.equal('p.jpg');
      expect(a1.color).to.equal('purple');
      expect(a1.pin).to.equal(3333);
      expect(a1.transactions).to.have.length(0);
      expect(a1.transferId).to.be.instanceof(Mongo.ObjectID);
    });
  });

  describe('.create', function(){
    it('should create and save a new Account object', function(done){
      Account.create({name:'jane doe', type: 'checking', balance: '50.00', opened:'05/07/2011', photo: 'p.jpg', color: 'purple', pin: '3333', transferId:'53d01ddf4fbbd6de0b530014'}, function(err, account){
        expect(account._id).to.be.instanceof(Mongo.ObjectID);
        expect(account).to.be.instanceof(Account);
        expect(account.name).to.equal('jane doe');
        expect(account.type).to.equal('checking');
        expect(account.balance).to.equal(50.00);
        expect(account.opened).to.be.instanceof(Date);
        expect(account.photo).to.equal('p.jpg');
        expect(account.color).to.equal('purple');
        expect(account.pin).to.equal(3333);
        expect(account.transactions).to.have.length(0);
        expect(account.transferId).to.be.instanceof(Mongo.ObjectID);
        done(); 
      });
    });
  });

  describe('.all', function(){
    it('should get all accounts from database', function(done){
      Account.all(function(err, accounts){
        expect(accounts).to.have.length(1);
        done();
      });
    });
  }); 

//last brace  
});

