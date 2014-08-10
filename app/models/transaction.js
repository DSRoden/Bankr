'use strict'; 

function Transaction(o){
  this.type = o.type;
  this.amt   =  parseFloat(o.amt);
  this.pin   =  o.pin;
  this.transDate  =  new Date();
}

module.exports = Transaction;
