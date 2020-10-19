"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("medicamentos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      prescricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      via_de_descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      posologia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dosagem: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("medicamentos");
  },
};
