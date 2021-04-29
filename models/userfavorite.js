'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userFavorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.userFavorite.belongsToMany(models.user)
      models.userFavorite.belongsToMany(models.image)
      // define association here
    }
  };
  userFavorite.init({
    imageId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userFavorite',
  });
  return userFavorite;
};