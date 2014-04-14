var conf = require('nconf')
  , debug = require('debug')('hashbox-core:utils');

var Utils = {};

Utils.response_json = function(status, msg, data, self) {
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
    console.log(response);
  }

  self.res.set('Content-Type', 'application/json');
  self.res.json(status_code, response);
}

module.exports = Utils;
