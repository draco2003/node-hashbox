module.exports = function(sequelize, DataTypes) {
  var HashAudit = sequelize.define('HashAudit', {
    key: {type: DataTypes.STRING, allowNull: false},
    hash: {type: DataTypes.STRING, unique: true, allowNull: false},
    confirmed: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
  });
  return HashAudit;
}
