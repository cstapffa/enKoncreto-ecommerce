import { ModeloTaller } from "../../database/Models/ModeloTaller.js";
import { formatearFiltrosDB } from "../../utils/functions.js";

export const getTalleres = (req, res, next) => {
  const filtroNombre = formatearFiltrosDB(req.query.nombre);
  const filtros = {};

  if (filtroNombre) filtros.nombre = filtroNombre;

  ModeloTaller.find(filtros)
    .then((data) => {
      console.log("get talleres => ", data);
      if (data.length === 0) {
        res.json([]);
      } else {
        res.json(data);
      }
    })
    .catch((error) => {
      next(error);
    });
};
