"use strict";
const { QueryInterface, DataTypes } = require("sequelize");

module.exports = {
  /**
   *
   * @param {QueryInterface} queryInterface
   * @param {DataTypes} Sequelize
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: {
            tableName: "users",
          },
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("projects");
  },
};
