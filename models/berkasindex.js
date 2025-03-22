'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BerkasIndex extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BerkasIndex.belongsTo(models.Berkas, {
        foreignKey: 'no_sep',
        targetKey: 'no_sep',
        as: 'berkas'
      });
    }
  }
  BerkasIndex.init({
    no_sep: DataTypes.STRING,
    file_path: DataTypes.STRING,
    checksum: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BerkasIndex',
  });
  return BerkasIndex;
};