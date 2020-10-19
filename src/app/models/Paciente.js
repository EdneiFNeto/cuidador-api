import Sequelize, { Model } from "sequelize";

class Paciente extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        idade: Sequelize.STRING,
        peso: Sequelize.STRING,
      },
      {
        tableName: "pacientes",
        sequelize,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Cuidador, {
      foreignKey: "paciente_id",
      through: "cuidador_pacientes",
      as: "cuidadors",
    });

    this.belongsToMany(models.Usuario, {
      foreignKey: "paciente_id",
      through: "paciente_usuarios",
      as: "usuarios",
    });

    this.belongsToMany(models.Medicamento, {
      foreignKey: "paciente_id",
      through: "paciente_medicamentos",
      as: "medicamentos",
    });
  }
}

export default Paciente;
