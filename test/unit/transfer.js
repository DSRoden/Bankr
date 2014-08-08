/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect       = require('chai').expect;
var dbConnect    = require('../../app/lib/mongodb');
var Mongo        = require('mongodb');
var cp           = require('child_process');
var db           = 'bankr-test';
