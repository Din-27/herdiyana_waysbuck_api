'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        transaction.belongsTo(models.product, {
          as: "product",
          foreignKey: {
            name: "order",
          },
        });
        transaction.belongsTo(models.user, {
          as: "user",
          foreignKey: {
            name: "userOrder",
          },
        });
        transaction.belongsTo(models.toping, {
          as: "toping",
          foreignKey: {
            name: "topingOrder",
          },
        });
    }
  }
  transaction.init({
    price: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};