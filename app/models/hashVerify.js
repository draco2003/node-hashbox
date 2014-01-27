module.exports = function(sequelize, DataTypes) {
  var HashVerify = sequelize.define('HashVerify', {
    key: {type: DataTypes.STRING, allowNull: false},
    hash: {type: DataTypes.STRING, unique: true, allowNull: false}
  });
  return HashVerify;
}
