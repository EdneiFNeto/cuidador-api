import Usuario from "../models/Usuario";
import Paciente from "../models/Paciente";
import Cuidador from "../models/Cuidador";
import db from "../../database";

class UsuarioController {
  async index(req, res) {
    try {
      const user = await Usuario.findAll({
        attributes: ["id", "name", "email", "icon", "token", "google_id"],
        include: [
          {
            model: Paciente,
            as: "pacientes",
            attributes: ["id", "name", "idade", "peso"],
            through: { attributes: [] },
          },
          {
            model: Cuidador,
            as: "cuidadors",
            attributes: ["id", "name", "icon", "status"],
            through: { attributes: [] },
          },
        ],
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.json({ error: `Error ${error}` });
    }
  }

  async show(req, res) {
    try {
      const { google_id } = req.params;
      const user = await Usuario.findAll({ where: { google_id }});

      if (user.length === 0){
        return res.status(404).json({ error: "Não existe usuário" });
      } 

      return res.status(200).json(user[0]);
    } catch (error) {
      return res.status(500).json({ error: `Error ${error}` });
    }
  }

  async store(req, res) {
    const { name, email, icon, token, google_id } = req.body;

    const t = await db.connection.transaction();
    try {
      const user = await Usuario.create(
        { name, email, icon, token, google_id },
        { transaction: t }
      );

      await t.commit();

      return res.status(201).json(user);
    } catch (error) {
      await t.rollback();
      return res.status(500).json({ error: `Error ${error}` });
    }
  }

  async update(req, res) {
    const { google_id } = req.params;
    const { name, icon, token, email } = req.body;
    const t = await db.connection.transaction();

    try {
      await Usuario.update(
        { name, email, icon, token },
        { where: { google_id } },
        {
          transaction: t,
        }
      );

      await t.commit();

      return res.status(204).json();
    } catch (error) {
      await t.rollback();
      return res.json({ error: `Error ${error}` });
    }
  }
}

export default new UsuarioController();
