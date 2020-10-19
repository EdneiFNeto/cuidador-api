"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("paciente_medicamentos", {
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
      medicamento_id: {
        type: Sequelize.INTEGER,
        references: { model: "medicamentos", key: "id" },
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
    await queryInterface.dropTable("paciente_medicamentos");
  },
};
