"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "usuarios",
      [
        {
          name: "Ednei",
          email: "ed@gmail.com",
          icon: "null",
          token: "123456",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "João",
          email: "jh@gmail.com",
          icon: "null",
          token: "123456",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Maria",
          email: "maria@gmail.com",
          icon: "null",
          token: "123456",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("usuarios", null, {});
  },
};
