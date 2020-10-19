import Cuidador from "../models/Cuidador";
import db from "../../database";
import Paciente from "../models/Paciente";

class CuidadorController {
  async index(req, res) {
    try {
      const cuidador = await Cuidador.findAll({
        attributes: ["id", "name", "email", "status"],
        include: [
          {
            model: Paciente,
            as: "pacientes",
            attributes: ["id", "name", "idade", "peso"],
            through: { attributes: [] },
          },
        ],
      });
      return res.status(200).json(cuidador);
    } catch (error) {
      return res.json({ error: `Error ${error}` });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const cuidador = await Cuidador.findByPk(id);

      if (!cuidador)
        return res.status(404).json({ error: "Não existe usuário" });

      return res.status(200).json(cuidador);
    } catch (error) {
      return res.status(500).json({ error: `Error ${error}` });
    }
  }

  async store(req, res) {
    const { name, email, icon, status, pacientes } = req.body;
    const t = await db.connection.transaction();

    try {
      const cuidador = await Cuidador.create(
        { name, email, icon, status },
        { transaction: t }
      );

      if (pacientes.length > 0)
        await cuidador.setPacientes(pacientes, { transaction: t });

      await t.commit();

      return res.status(201).json(cuidador);
    } catch (error) {
      await t.rollback();
      return res.status(500).json({ error: `Error ${error}` });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, email, icon, status } = req.body;
    const t = await db.connection.transaction();

    try {
      const cuidador = await Cuidador.update(
        { name, email, icon, status },
        { where: { id } },
        {
          transaction: t,
        }
      );

      await t.commit();

      return res.status(204).json(cuidador);
    } catch (error) {
      await t.rollback();
      return res.json({ error: `Error ${error}` });
    }
  }
}

export default new CuidadorController();
