'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.image.belongsToMany(models.user, {through:'userFavorite'})
      // define association here
    }
  };
  image.init({
    imageurl: DataTypes.TEXT,
    category: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    copyright: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'image',
  });
  return image;
};