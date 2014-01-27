var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var reportController = new Controller();

reportController.stale = function() {
  this.render();
};

reportController.invalid = function() {
  this.render();
};

reportController.index = function() {
  this.render();
};

module.exports = reportController;