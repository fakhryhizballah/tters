'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Berkas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Berkas.init({
    berkas_index_id: DataTypes.INTEGER,
    no_sep: DataTypes.STRING,
    status: DataTypes.ENUM('ralan', 'ranap'),
    kd_dr: DataTypes.STRING,
    tanggal_masuk: DataTypes.DATEONLY,
    tanggal_keluar: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Berkas',
  });
  return Berkas;
};