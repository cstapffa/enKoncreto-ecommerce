import { ModeloProducto } from "../../database/Models/ModeloProducto.js";
import { formatearFiltrosDB } from "../../utils/functions.js";

export const getProductos = (req, res, next) => {
  const filtroNombre = formatearFiltrosDB(req.query.nombre);
  const filtroCategoria = formatearFiltrosDB(req.query.categoria);
  const filtroOferta = req.query.oferta === "true"; // Convertir el string "true" a booleano
  const precioMin = req.query.precioMin ? Number(req.query.precioMin) : null;
  const precioMax = req.query.precioMax ? Number(req.query.precioMax) : null;

  const filtros = {};

  if (filtroNombre) filtros.nombre = filtroNombre;
  if (filtroCategoria) filtros.categoria = filtroCategoria;

  // Filtro por oferta
  if (req.query.oferta !== undefined) filtros.oferta = filtroOferta;

  // Filtro por rango de precios
  if (precioMin !== null) filtros.precio = { $gte: precioMin };
  if (precioMax !== null) {
    filtros.precio = {
      ...filtros.precio,
      $lte: precioMax,
    };
  }
  
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
