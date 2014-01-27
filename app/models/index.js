var conf      = require('nconf')
  , fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , _         = require('lodash')
  , db_file   = conf.get('database')
  , sequelize = new Sequelize('hashes', null, null, {
      dialect: "sqlite",
      storage: db_file
    })
  , db        = {}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

module.exports = _.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db)
