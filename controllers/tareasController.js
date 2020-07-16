const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas");

exports.agregarTarea = async (req, res, next) => {
  const proyecto = await Proyectos.findOne({ where: { url: req.params.url } }); //Obtener el proyecto actual

  const { tarea } = req.body; //Leer valor del input
  const estado = 0; //Estado de la tarea es por defecto 0
  const proyectoId = proyecto.id;

  const resultado = await Tareas.create({ tarea, estado, proyectoId });
  if (!resultado) {
    return next();
  }
  res.redirect(`/proyectos/${req.params.url}`);
};
exports.cambiarEstadoTarea = async (req, res, next) => {
  const { id } = req.params;
  const tarea = await Tareas.findOne({ where: { id } });
  /** Cambiando el estado */
  let estado = 0;
  if (tarea.estado === estado) {
    estado = 1;
  }
  tarea.estado = estado;
  const resultado = await tarea.save(); //Actualizando estado en la DB
  if (!resultado) {
    return next();
  }
  res.status(200).send("Actualizado");
};
