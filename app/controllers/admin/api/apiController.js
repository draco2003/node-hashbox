
var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , conf = require('nconf')
  , HashBoxCore = require('hashbox-core')
  , HashBoxUtils = require('../../../lib/utils');

var apiController = new Controller();

var daysBeforeStale = conf.get('daysBeforeStale') | 1;
var daysBeforeExpires = conf.get('daysBeforeExpires') | 365;

var options = {
  daysBeforeStale: daysBeforeStale,
  daysBeforeExpires: daysBeforeExpires
};

apiController.before(
  ['stale', 'invalid', 'hashes'],
  function(req, res, next) {
    var self = this;
    var page = Number(self.param('page')) || 1;
    var count = Number(self.param('count')) || 100;
    options.page = page;
    options.count = count;
    next();
});

apiController.stale = function() {
  var self = this;
  HashBoxCore.listStaleHashes(options, function(err, results) {
    var response = {};
    response.rows = results;
    self.report_err = err;
    self.res.send(response);
  });
};

apiController.invalid = function() {
  var self = this
  HashBoxCore.listAuditRecords(options, function(err, results) {
    var response = {};
    response.rows = results;
    self.report_err = err;
    self.res.send(response);
  });
};

apiController.hashes = function() {
  var self = this
  HashBoxCore.listHashes(options, function(err, results) {
    var response = {};
    response.rows = results;
    self.report_err = err;
    self.res.send(response);
  });
};

apiController.hash = function() {
  var self = this
  var hashId = Number(self.param('hashId'));
  console.log(hashId);
  HashBoxCore.hashDetail(options, hashId, function(err, results) {
    var response = {};
    response.rows = results;
    self.report_err = err;
    self.res.send(response);
  });
};

apiController.acknowledge = function() {
  var self = this
  var hashIds = self.param('hashIds');
  var state = self.param('state');
  console.log(hashIds);
  console.log(state);
  HashBoxCore.acknowledge(options, hashIds, state, function(err, results) {
    var response = {};
    response.rows = results;
    self.report_err = err;
    self.res.send(response);
  });
};

module.exports = apiController;
