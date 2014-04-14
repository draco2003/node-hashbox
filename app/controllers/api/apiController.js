var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , conf = require('nconf')
  , HashBoxCore = require('hashbox-core')
  , HashBoxUtils = require('../../lib/utils');

var apiController = new Controller();

apiController.health = function() {
  var self = this;
  HashBoxUtils.response_json('success', null, 'Service Up!', self);
};

apiController.hashVerify = function() {
  var self = this;
  var key = self.param('key')
    , hash = self.param('hash');

  if (key && hash) {
    HashBoxCore.hashVerify(key, hash, function(err) {
      if (err) {
        console.error(err);
        HashBoxUtils.response_json('error', 'Hasbox Error', null, self);
      } else {
        HashBoxUtils.response_json('success', null, 'success', self);
      }
    });
  } else {
    HashBoxUtils.response_json('error', 'Invalid Parameters', null, self);
  }
};

module.exports = apiController;