import { Router } from "express";
const routes = new Router();

import UsuarioController from "./app/controllers/UsuarioController";
import CuidadorController from "./app/controllers/CuidadorController";
import PacienteController from "./app/controllers/PacienteController";
import MedicamentoController from "./app/controllers/MedicamentoController";

/*Usuario */
routes.get("/usuarios", UsuarioController.index);
routes.get("/usuarios/:google_id", UsuarioController.show);
routes.post("/usuarios", UsuarioController.store);
routes.put("/usuarios/:google_id", UsuarioController.update);

/*Cuidador*/
routes.get("/cuidadors", CuidadorController.index);
routes.get("/cuidadors/:google_id", CuidadorController.show);
routes.get("/cuidadors/create/:usuario_id", CuidadorController.create);
routes.post("/cuidadors", CuidadorController.store);
routes.put("/cuidadors/:google_id", CuidadorController.update);

/*Paciente*/
routes.get("/pacientes", PacienteController.index);
routes.get("/pacientes/:usuario_id", PacienteController.show);
routes.post("/pacientes", PacienteController.store);
routes.put("/pacientes/:id", PacienteController.update);

/*Medicamento*/
routes.get("/medicamentos", MedicamentoController.index);
routes.get("/medicamentos/:id", MedicamentoController.show);
routes.post("/medicamentos", MedicamentoController.store);
routes.put("/medicamentos/:id", MedicamentoController.update);

export default routes;
