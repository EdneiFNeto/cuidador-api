import Sequelize, { Model } from "sequelize";

class Cuidador extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        icon: Sequelize.STRING,
        status: Sequelize.STRING,
        google_id: Sequelize.STRING,
      },
      {
        tableName: "cuidadors",
        sequelize,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Paciente, {
      foreignKey: "cuidador_id",
      through: "cuidador_pacientes",
      as: "pacientes",
    });

    this.belongsToMany(models.Usuario, {
      foreignKey: "cuidador_id",
      through: "usuario_cuidadors",
      as: "usuarios",
    });
  }
}

export default Cuidador;
