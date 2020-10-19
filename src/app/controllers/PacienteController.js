import Paciente from "../models/Paciente";
import Usuario from "../models/Usuario";
import Cuidador from "../models/Cuidador";
import Medicamento from "../models/Medicamento";
import db from "../../database";

class PacienteController {
  async index(req, res) {
    try {
      const paciente = await Paciente.findAll({
        attributes: ["id", "name", "idade", "peso"],
        include: [
          {
            model: Usuario,
            as: "usuarios",
            attributes: ["id", "name", "email"],
            through: { attributes: [] },
          },
          {
            model: Cuidador,
            as: "cuidadors",
            attributes: ["id", "name", "email", "icon", "status"],
            through: { attributes: [] },
          },
          {
            model: Medicamento,
            as: "medicamentos",
            attributes: ["id", "prescricao", "via_de_descricao", "dosagem"],
            through: { attributes: [] },
          },
        ],
      });
      return res.status(200).json(paciente);
    } catch (error) {
      return res.json({ error: `Error ${error}` });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const paciente = await Paciente.findOne({
        where: { id },
        attributes: ["id", "name", "idade", "peso"],
        include: [
          {
            model: Usuario,
            as: "usuarios",
            attributes: ["id", "name", "email"],
            through: { attributes: [] },
          },
          {
            model: Cuidador,
            as: "cuidadors",
            attributes: ["id", "name", "email", "icon", "status"],
            through: { attributes: [] },
          },
          {
            model: Medicamento,
            as: "medicamentos",
            attributes: ["id", "prescricao", "via_de_descricao", "dosagem"],
            through: { attributes: [] },
          },
        ],
      });

      if (!paciente)
        return res.status(404).json({ error: "Não existe usuário" });

      return res.status(200).json(paciente);
    } catch (error) {
      return res.status(500).json({ error: `Error ${error}` });
    }
  }

  async store(req, res) {
    const { name, idade, peso, usuarios, cuidadors, medicamentos } = req.body;
    const t = await db.connection.transaction();

    try {
      const paciente = await Paciente.create(
        { name, idade, peso },
        { transaction: t }
      );

      if (usuarios.length > 0)
        await paciente.setUsuarios(usuarios, { transaction: t });

      if (cuidadors.length > 0)
        await paciente.setCuidadors(cuidadors, { transaction: t });

      if (medicamentos.length > 0)
        await paciente.setMedicamentos(medicamentos, { transaction: t });

      await t.commit();

      return res.status(201).json(paciente);
    } catch (error) {
      await t.rollback();
      return res.status(500).json({ error: `Error ${error}` });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, idade, peso, usuarios, cuidadors } = req.body;
    const t = await db.connection.transaction();

    try {
      const paciente = await Paciente.update(
        { name, idade, peso },
        { where: { id } },
        {
          transaction: t,
        }
      );

      if (usuarios.length > 0)
        await paciente.setUsuarios(usuarios, { transaction: t });

      if (cuidadors.length > 0)
        await paciente.setCuidadors(cuidadors, { transaction: t });

      await t.commit();

      return res.status(204).json(paciente);
    } catch (error) {
      await t.rollback();
      return res.json({ error: `Error ${error}` });
    }
  }
}

export default new PacienteController();
