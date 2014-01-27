var db = require('../../app/models/');

module.exports = function() {

  db.sequelize
  .sync()
  //.sync({ force: true }) // this would drop data from our table. better error instead
  .complete(function(err) {
    if (err) {
    console.log(err);
    }
  });
}
