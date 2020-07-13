const Proyectos = require("../models/Proyectos"); //Importa el modelo de la db

//Crea el controlador del home
exports.proyectosHome = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  res.render("index", {
    titleWeb: "UpTask | Proyectos",
    proyectos,
  });
};
exports.formularioProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  res.render("nuevoProyecto", {
    titleWeb: "UpTask | Nuevo proyecto",
    proyectos,
  });
};
exports.nuevoProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  console.log(req.body);
  //Validar el input nombre
  const { nombre } = req.body;
  let errores = [];

  if (!nombre) {
    errores.push({ texto: "Agrega un nombre al Proyecto" });
  }
  // Si hay errores
  if (errores.length > 0) {
    res.render("nuevoProyecto", {
      titleWeb: "UpTask | Nuevo proyecto",
      errores,
      proyectos,
    });
  } else {
    /* const url = slug(nombre).toLowerCase(); */
    await Proyectos.create({ nombre }); // create() es el método disponible en Sequelize para agregar un nuevo registro en una tabla de la DB
    res.redirect("/");
  }
};

exports.proyectoUlr = async (req, res, next) => {
  //Al hacer varias consultas en la DB que no dependen una de la otra se recomienda utilizar Promise de la siguiente forma
  const proyectosPromise = Proyectos.findAll();
  const proyectoPromise = Proyectos.findOne({
    where: {
      url: req.params.url,
    },
  });
  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);
  //Si la url del proyecto no existe
  if (!proyecto) {
    res.send(" -- ERROR 404: Proyecto no encontrado.");
    return next();
  }
  //Mostrar las vistas
  res.render("tareas", {
    titleWeb: "Tareas del proyecto",
    proyecto,
    proyectos,
  });
};
exports.formularioEditar = async (req, res) => {
  //Al hacer varias consultas en la DB que no dependen una de la otra se recomienda utilizar Promise de la siguiente forma
  const proyectosPromise = Proyectos.findAll();
  const proyectoPromise = Proyectos.findOne({
    where: {
      id: req.params.id,
    },
  });
  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);

  res.render("nuevoProyecto", {
    titleWeb: "Editar proyecto",
    proyectos,
    proyecto,
  });
};
exports.actualizarProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  console.log(req.body);
  //Validar el input nombre
  const { nombre } = req.body;
  let errores = [];

  if (!nombre) {
    errores.push({ texto: "Agrega un nombre al Proyecto" });
  }
  // Si hay errores
  if (errores.length > 0) {
    res.render("nuevoProyecto", {
      titleWeb: "UpTask | Nuevo proyecto",
      errores,
      proyectos,
    });
  } else {
    await Proyectos.update(
      { nombre: nombre },
      { where: { id: req.params.id } }
    ); // update() es el método disponible en Sequelize para actualizar un registro en una tabla de la DB
    res.redirect("/");
  }
};
exports.eliminarProyecto = async (req, res, next) => {
  const { urlProyecto } = req.query;
  const resultado = await Proyectos.destroy({ where: { url: urlProyecto } });

  if (!resultado) {
    return next();
  }

  res.status(200).send("Tu proyecto ha sido eliminado.");
};
