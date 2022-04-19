"use strict";
const { QueryInterface, Sequelize } = require("sequelize");

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

    await queryInterface.bulkInsert("user_profiles", [
      {
        profession: "Highschool Students",
        profile_pict: "https://bigbrainbank.org/static/images/user-dummy.jpeg",
        user_id: 1,
      },
      {
        profession: "Fullstack Developer",
        profile_pict: "https://bigbrainbank.org/static/images/user-dummy.jpeg",
        user_id: 2,
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
