'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class toping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      toping.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "userOrder",
        },
      });
      toping.belongsTo(models.product, {
        as: "product",
        foreignKey: {
          name: "order",
        },
      });
      toping.hasMany(models.transaction, {
        as: "topings",
        foreignKey: {
          name: "topingOrder",
        },
      });
    }
  }
  toping.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'toping',
  });
  return toping;
};