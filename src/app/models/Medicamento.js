import Sequelize, { Model } from "sequelize";

class Medicamento extends Model {
  static init(sequelize) {
    super.init(
      {
        prescricao: Sequelize.STRING,
        via_de_descricao: Sequelize.STRING,
        posologia: Sequelize.STRING,
        dosagem: Sequelize.STRING,
      },
      {
        tableName: "medicamentos",
        sequelize,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsToMany(models.Paciente, {
      foreignKey: "medicamento_id",
      through: "paciente_medicamentos",
      as: "pacientes",
    });
  }
}

export default Medicamento;
