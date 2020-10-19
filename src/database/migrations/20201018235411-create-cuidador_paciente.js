"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("cuidador_pacientes", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      paciente_id: {
        type: Sequelize.INTEGER,
        references: { model: "pacientes", key: "id" },
        allowNull: false,
      },
      cuidador_id: {
        type: Sequelize.INTEGER,
        references: { model: "cuidadors", key: "id" },
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("cuidador_pacientes");
  },
};
