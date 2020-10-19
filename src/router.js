import { Router } from "express";
const routes = new Router();

import UsuarioController from "./app/controllers/UsuarioController";
import CuidadorController from "./app/controllers/CuidadorController";
import PacienteController from "./app/controllers/PacienteController";
import MedicamentoController from "./app/controllers/MedicamentoController";

/*Usuario */
routes.get("/usuarios", UsuarioController.index);
routes.get("/usuarios/:id", UsuarioController.show);
routes.post("/usuarios", UsuarioController.store);
routes.put("/usuarios/:id", UsuarioController.update);

/*Cuidador*/
routes.get("/cuidadors", CuidadorController.index);
routes.get("/cuidadors/:id", CuidadorController.show);
routes.post("/cuidadors", CuidadorController.store);
routes.put("/cuidadors/:id", CuidadorController.update);

/*Paciente*/
routes.get("/pacientes", PacienteController.index);
routes.get("/pacientes/:id", PacienteController.show);
routes.post("/pacientes", PacienteController.store);
routes.put("/pacientes/:id", PacienteController.update);

/*Medicamento*/
routes.get("/medicamentos", MedicamentoController.index);
routes.get("/medicamentos/:id", MedicamentoController.show);
routes.post("/medicamentos", MedicamentoController.store);
routes.put("/medicamentos/:id", MedicamentoController.update);

export default routes;
