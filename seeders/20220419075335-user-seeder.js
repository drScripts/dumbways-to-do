"use strict";
const { QueryInterface, Sequelize } = require("sequelize");
const { hashSync } = require("bcrypt");

module.exports = {
  /**
   *
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   */
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("users", [
      {
        name: "Nathanael Valentino Davis",
        email: "nathanael.vd@gmail.com",
        password: hashSync("udin123", 10),
      },
      {
        name: "Player Test",
        email: "test@gmail.com",
        password: hashSync("udin123", 10),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
