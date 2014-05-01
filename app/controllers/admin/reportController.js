var locomotive = require('locomotive')
  , conf = require('nconf')
  , HashBoxCore = require('hashbox-core')
  , Controller = locomotive.Controller;

var reportController = new Controller()

reportController.index = function() {
  this.render();
};

reportController.hash = function() {
  var self = this
  var hashId = Number(self.param('hashId'));
  console.log(hashId);
  HashBoxCore.hashDetail(null, hashId, function(err, results) {
    if (err) {
      console.log(err);
      self.results = {};
      self.redirect('/admin/');
    } else {
      console.log(results);
      self.hashDetails = results.hashRow;
      self.keyRows = results.keyRows;
      self.auditRows = results.hashAuditRows;
      self.verifyRows = results.hashVerifyRows;
      self.render();
    }
  });
};
module.exports = reportController;