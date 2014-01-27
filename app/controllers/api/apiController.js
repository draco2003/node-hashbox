var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , conf = require('nconf')
  , Moment = require('moment')
  , _ = require('lodash')
  , db = require('../../../app/models/');

var apiController = new Controller();

apiController.hashCreate = function() {
  var self = this;
  var hashObj = db.Hash.build({
    key: self.param('key'),
    hash: self.param('hash')
  });

  if (self.param('key') && self.param('hash') && !hashObj.validate()) {
    hashObj.save()
      .success(function(hash) {
        response_json('success', null, 'Hash accepted', self);
      })
      .error(function(error) {
        audit_entry(self.param('key'), self.param('hash'), self);
      });
  } else {
    response_json('error', 'Invalid Parameters', null, self);
  }
};

apiController.hashVerify = function() {
  var self = this;
  if (self.param('key') && self.param('hash')) {
    db.Hash.find({ where: { key: self.param('key') } })
      .success(function(hashObj) {
        if (hashObj) {
          if (hashObj.values.hash === self.param('hash')) {
            hashObj.save()
              .success(function(hash) {
                response_json('success', null, 'Hash accepted', self);
              })
              .error(function(error) {
                response_json('failure', null, 'Hash accepted, but update failed', self);
              });
          } else {
            audit_entry(self.param('key'), self.param('hash'), self);
          }
        } else {
          response_json('failure', null, 'Hash not accepted, doesn\'t exist', self);
        }
      })
      .error(function(error) {
        response_json('error', 'Invalid Parameters', null, self);
      });
  } else {
    response_json('error', 'Invalid Parameters', null, self);
  }
};

apiController.hashAuditStale = function() {
  var self = this
    , date = new Moment()
    , days_till_stale = conf.get('days_till_stale') | 1
    , stale_date = date.subtract('days', days_till_stale);

  console.log(days_till_stale);

  db.Hash.findAll({ where: ['updatedAt < ?', stale_date.toDate()] })
    .success(function(hashes) {
      response_json('success', null, hashes, self);
    })
    .error(function(error) {
      response_json('error', 'Report Generation error', null, self);
    });
};

apiController.hashAuditInvalid = function() {
  var self = this;

  // ToDo: tweak this for more complex where.
  //  - where not confirmed, and join db.Hash
  db.HashAudit.findAll({
    where: { confirmed: false}
  })
  .success(function(hashes) {
    if (!_.isArray(hashes)) { hashes = [ hashes ]; }
    response_json('success', null, hashes, self);
  })
  .error(function(error) {
    response_json('error', 'Report Generation error', null, self);
  });
};

module.exports = apiController;

// Abstract out the HashAudit Entry
function audit_entry(key, hash, self) {
  var hashAuditObj = db.HashAudit.build({
    key: self.param('key'),
    hash: self.param('hash')
  });
  hashAuditObj.save()
    .complete(function(err) {
      if (err) {
        // If we get an error its most likely that its already been recorded in the audit table
        response_json('failure', null, 'Hash not accepted, but update failed', self);
      } else {
        response_json('failure', null, 'Hash not acceped', self);
      }
  });
}


// Make sure our respones complies to JSend format
function response_json(status, msg, data, self) {
  var status_code = 200
    , error_code = conf.get('error_status_code') | 400;

  var response = {
    status: status
  };

  if (data) {
    response.data = data;
  }

  if (msg) {
    response.message = msg;
  }

  if (status === 'error' || status === 'failure'){
    status_code = error_code;
  }

  self.res.set('Content-Type', 'application/json');
  self.res.json(status_code, response);
}