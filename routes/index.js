const express = require("express"); //Importa express
const router = express.Router();
const { body } = require("express-validator/check");

const proyectosController = require("../controllers/proyectosController"); //Importa el controlador
const tareasController = require("../controllers/tareasController");
//Se exportan las rutas
module.exports = function () {
  router.get("/", proyectosController.proyectosHome);
  router.get("/nuevo-proyecto", proyectosController.formularioProyecto);
  router.post(
    "/nuevo-proyecto",
    body("nombre").notEmpty().trim().escape(),
    proyectosController.nuevoProyecto
  );

  router.get("/proyectos/:url", proyectosController.proyectoUlr); //Listar url de cada proyecto
  router.get("/proyecto/editar/:id", proyectosController.formularioEditar); //Editar proyecto
  router.post(
    "/nuevo-proyecto/:id",
    body("nombre").notEmpty().trim().escape(),
    proyectosController.actualizarProyecto
  );

  router.delete("/proyectos/:url", proyectosController.eliminarProyecto);
  router.post("/proyectos/:url", tareasController.agregarTarea);
  router.patch("/tareas/:id", tareasController.cambiarEstadoTarea);
  return router;
};
