import { ModeloProducto } from "../database/Models/ModeloProducto.js";
import { formatearFiltrosDB } from "../utils/functions.js";

export const getProductos = (req, res, next) => {
  const filtroNombre = formatearFiltrosDB(req.query.nombre);
  const filtroCategoria = formatearFiltrosDB(req.query.categoria);

  const filtros = { /* usuario: req.usuario.id */ };

  if (filtroNombre) filtros.nombre = filtroNombre;
  if (filtroCategoria) filtros.categoria = filtroCategoria;

  ModeloProducto.find(filtros)
    .then((data) => {
      console.log("get productos => ", data);
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
