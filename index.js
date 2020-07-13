const express = require("express");
const routes = require("./routes");
const path = require("path"); //Damos acceso a node a los archivos del directorio
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const helpers = require("./helpers"); //Helpers contiene funciones auxiliares creadas por el desarrollador

const app = express(); //Crear una aplicación con express

const db = require("./config/db"); //Conexión a la db
require("./models/Proyectos"); // Importar el modelo de la db
db.sync() //Crear el modelo db si no existe y conecta al servidor de la db
  .then(() => console.log("Conectado al Servidor MySQL"))
  .catch((error) => console.error(error));

/* app.use(expressValidator()); //Agregar express validator en todo la aplicación */
app.use(express.static("./public")); //De donde cargar los archivos estáticos
app.set("view engine", "pug"); //Habilitar PUG
app.set("views", path.join(__dirname, "./views")); //Añadir el directorio de las vistas

/* Pasar vardump desde helpers.js */
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump; //res.locals permite crear variables crear una variable y consumirla en cualquier otro lugar de la aplicación
  next(); //Garantiza que se pase a la siguiente función
});
app.use(bodyParser.urlencoded({ extended: true })); //Habilitar BodyParser para leer datos del formulario

app.use("/", routes());

app.listen(3000);
