'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.profile, {
        as: "profile",
        foreignKey: {
          name: "userOrder",
        },
      });

      //hasMany to product model
      user.hasMany(models.product, {
        as: "products",
        foreignKey: {
          name: "userOrder",
        },
      });

      //hasMany association to transaction model
      user.hasMany(models.transaction, {
        as: "user",
        foreignKey: {
          name: "userOrder",
        },
      });

      user.hasMany(models.toping, {
        as: "topings",
        foreignKey: {
          name: "userOrder",
        },
      });
    }
  }
  user.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};