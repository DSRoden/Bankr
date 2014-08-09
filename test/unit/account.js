/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect       = require('chai').expect;
var Account      = require('../../app/models/account');
var dbConnect    = require('../../app/lib/mongodb');
var Mongo        = require('mongodb');
//var cp           = require('child_process');
var db           = 'bankr-test';
var a1,a2,a3;

describe('Account', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });
  
  beforeEach(function(done){
    Account.collection.remove(function(){
   // cp.execFile(__dirname + '/../scripts/freshdb.sh', [db], {cwd:__dirname + '/../scripts'}, function(){
    var o   = {'name':'bill smith', 'type':'savings', 'balance':'100.00', 'opened':'05/08/2011', 'photo':'p1.jpg', 'color':'red', 'pin':'0000', 'transferId': '53d01ddf4fbbd6de0b530013', 'transactions':[]};
    var o2  = {'name':'sara jones', 'type':'checking', 'balance':'200.00', 'opened':'05/09/2011', 'photo':'p2.jpg', 'color':'blue', 'pin':'1111', 'transferId': '53d01ddf4fbbd6de0b530012', 'transactions':[]};
    var o3  = {'name':'joe lee', 'type':'checking', 'balance':'300.00', 'opened':'05/10/2011', 'photo':'p3.jpg', 'color':'orange', 'pin':'2222', 'trnasferId':'53d01ddf4fbbd6de0b530011', 'transactions':[]};
     a1  = new Account(o);
     a2  = new Account(o2);
     a3  = new Account(o3);
      a1.insert(function(){
        a2.insert(function(){
          a3.insert(function(){
            done();
          });
        });
      });  
    });
  });

  describe('constructor', function(){
    it('should create a new Account object', function(){
      var o4 = {name:'jane doe', type: 'checking', balance: '50.00', opened:'05/07/2011', photo: 'p.jpg', color: 'purple', pin: '3333', transferId:'53d01ddf4fbbd6de0b530014'};
      var a4 = new Account(o4);
      expect(a4).to.be.instanceof(Account);
      expect(a4.name).to.equal('jane doe');
      expect(a4.type).to.equal('checking');
      expect(a4.balance).to.equal(50.00);
      expect(a4.opened).to.be.instanceof(Date);
      expect(a4.photo).to.equal('p.jpg');
      expect(a4.color).to.equal('purple');
      expect(a4.pin).to.equal('3333');
      expect(a4.transactions).to.have.length(0);
      expect(a4.transferId).to.be.instanceof(Mongo.ObjectID);
    });
  });

  describe('.insert', function(){
    it('should create and save a new Account object', function(done){
      var o4 = {name:'jane doe', type: 'checking', balance: '50.00', opened:'05/07/2011', photo: 'p.jpg', color: 'purple', pin: '3333', transferId:'53d01ddf4fbbd6de0b530014'};
      var a4 = new Account(o4);
      a4.insert(function(){
        expect(a4._id).to.be.instanceof(Mongo.ObjectID);
        expect(a4).to.be.instanceof(Account);
        expect(a4.name).to.equal('jane doe');
        expect(a4.type).to.equal('checking');
        expect(a4.balance).to.equal(50.00);
        expect(a4.opened).to.be.instanceof(Date);
        expect(a4.photo).to.equal('p.jpg');
        expect(a4.color).to.equal('purple');
        expect(a4.pin).to.equal('3333');
        expect(a4.transactions).to.have.length(0);
        expect(a4.transferId).to.be.instanceof(Mongo.ObjectID);
        done(); 
      });
    });
  });

  describe('#addTrans', function(){
    it('should increase the balance of an account', function(done){
    var t = {pin: '0000', amt: '100.00', isDeposit: true, isDraw: false};
      a1.addTrans(t, function(){
        expect(a1.balance).to.equal(200.00);
        done();
      });
    });

    it('should decrease the balance of an account', function(done){
    var t1 = {pin: '1111', amt: '100.00', isDeposit: false, isDraw: true};
      a2.addTrans(t1, function(){
        expect(a2.balance).to.equal(100.00);
        done();
      });
    });

    it('should make no change to the balance of an account', function(done){
    var t2 = {pin: '5697', amt: '100.00', isDeposit: true, isDraw: false};
      a3.addTrans(t2, function(){
        expect(a3.balance).to.equal(300.00);
        done();
      });
    });

    it('should add a transaction fee for overdraft', function(done){
    var t3 = {pin: '2222', amt: '400.00', isDeposit: false, isDraw: true};
      a3.addTrans(t3, function(){
        expect(a3.balance).to.equal(-150.00);
        expect(t3.fee).to.equal(50.00);
        done();
      });
    });
  });  

  describe('.all', function(){
    it('should get all accounts from database', function(done){
      Account.all(function(accounts){
        expect(accounts).to.have.length(3);
        done();
      });
    });
  }); 
  
  describe('.findById', function(){
    it('should find an account by its id', function(done){
      Account.findById(a1._id.toString(), function(account){
        expect(account.name).to.equal('bill smith');
        expect(account).to.be.instanceof(Account);
        done();
       });
    });
  });
//last brace  
});

