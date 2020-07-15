const Sequelize = require("sequelize");
const db = require("../config/db");
const slug = require("slug");
const shortid = require("shortid");

/**
 * Definiendo el modelo
 * El nombre del modelo es proyectos.
 * Dentro del objeto se definen las columnas que tendrá la data base.
 */
const Proyectos = db.define(
  "proyectos",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: { type: Sequelize.STRING(100) },
    url: { type: Sequelize.STRING(100) },
  },
  {
    hooks: {
      beforeCreate(proyecto) {
        const url = slug(proyecto.nombre).toLowerCase();

        proyecto.url = `${url}-${shortid.generate()}`;
      },
    },
  }
);

module.exports = Proyectos;
