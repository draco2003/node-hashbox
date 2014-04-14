var locomotive = require('locomotive')
  , conf = require('nconf')
  , Controller = locomotive.Controller;

var reportController = new Controller()

reportController.index = function() {
  this.render();
};

module.exports = reportController;