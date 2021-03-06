'use strict';

var morgan = require('morgan');
var bodyParser = require('body-parser');

var accounts = require('../controllers/accounts');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  
  app.get('/accounts/new', accounts.init);
  app.post('/accounts', accounts.create);
  app.get('/accounts', accounts.index);
  app.get('/accounts/:id', accounts.show);
  app.get('/accounts/:id/transaction', accounts.transInit);
  app.post('/accounts/:id', accounts.transact);

};
