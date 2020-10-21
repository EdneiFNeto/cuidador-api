import Medicamento from "../models/Medicamento";
import Paciente from "../models/Paciente";
import Usuario from "../models/Usuario";
import db from "../../database";
import notify from "../../util/notity";

class MedicamentoController {
  async index(req, res) {
    try {
      const medicamentos = await Medicamento.findAll({
        attributes: [
          "id",
          "prescricao",
          "via_de_descricao",
          "posologia",
          "dosagem",
        ],
        include: [
          {
            model: Paciente,
            as: "pacientes",
            attributes: ["id", "name", "idade", "peso"],
            through: { attributes: [] },
          },
        ],
      });
      return res.status(200).json(medicamentos);
    } catch (error) {
      return res.json({ error: `Error ${error}` });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const medicamentos = await Medicamento.findAll({
        where: { id },
        attributes: [
          "id",
          "prescricao",
          "via_de_descricao",
          "posologia",
          "dosagem",
        ],
        include: [
          {
            model: Paciente,
            as: "pacientes",
            attributes: ["id", "name", "idade", "peso"],
            through: { attributes: [] },
          },
        ],
      });

      if (!medicamentos)
        return res.status(404).json({ error: "Não existe usuário" });

      return res.status(200).json(medicamentos);
    } catch (error) {
      return res.status(500).json({ error: `Error ${error}` });
    }
  }

  async store(req, res) {
    const {
      prescricao,
      via_de_descricao,
      posologia,
      dosagem,
      pacientes,
    } = req.body;

    try {
      
      const medicamentos = await Medicamento.create(
        { prescricao, via_de_descricao, posologia, dosagem });

      if (pacientes.length > 0)
        await medicamentos.setPacientes(pacientes);
        
      const p = await Medicamento.findOne({ 
        where: medicamentos.id,
        include: [
          {
            model: Paciente,
            as: "pacientes",
            attributes: ["id", "name", "idade", "peso"],
            through: { attributes: [] },
          },
        ] 
      });

      const usuario = await Usuario.findOne({
        attributes:["id", "name", "email", "token"],
        include: [
          {
            model: Paciente,
            as: "pacientes",
            attributes: ["id", "name", "idade", "peso"],
            through: { attributes: [] },
            where: { id: p.pacientes[0].id }
          }
        ]
      })

      if(usuario){
        notify(usuario.token, "Um novo medicamento foi adicionado.")
      }

      return res.status(201).json(medicamentos);
    } catch (error) {
      return res.status(500).json({ error: `Error ${error}` });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, email, icon, token } = req.body;
    const t = await db.connection.transaction();

    try {
      const medicamentos = await Medicamento.update(
        { name, email, icon, token },
        { where: { id } },
        {
          transaction: t,
        }
      );

      await t.commit();

      return res.status(204).json(medicamentos);
    } catch (error) {
      await t.rollback();
      return res.json({ error: `Error ${error}` });
    }
  }
}

export default new MedicamentoController();
