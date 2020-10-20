import Sequelize, { Model } from "sequelize";

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        icon: Sequelize.STRING,
        token: Sequelize.STRING,
        google_id: Sequelize.STRING,
      },
      {
        tableName: "usuarios",
        sequelize,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Paciente, {
      foreignKey: "usuario_id",
      through: "paciente_usuarios",
      as: "pacientes",
    });

    this.belongsToMany(models.Cuidador, {
      foreignKey: "usuario_id",
      through: "usuario_cuidadors",
      as: "cuidadors",
    });
  }
}

export default Usuario;
