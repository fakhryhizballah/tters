'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tte extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tte.init({
    no_sep: DataTypes.STRING,
    file_path: DataTypes.STRING,
    tanggal: DataTypes.DATEONLY,
    name: DataTypes.STRING,
    file_path_tte: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tte',
  });
  return Tte;
};