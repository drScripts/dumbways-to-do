"use strict";
const { Model, DataTypes, Sequelize } = require("sequelize");

/**
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} DataTypes
 * @returns
 */
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.belongsTo(models.User, {
        as: "user",
        onDelete: "CASCADE",
        foreignKey: "user_id",
      });
    }
  }
  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          key: "id",
          model: {
            tableName: "users",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Project",
      tableName: "projects",
      timestamps: true,
    }
  );
  return Project;
};
