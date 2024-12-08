import { ModeloProducto } from "../../database/Models/ModeloProducto.js";

export const putProducto = (req, res, next) => {
  const idProducto = req.params.id;
  const { nombre, categoria, precio, descripcion, img, oferta, stock } = req.body;

  const datosNuevos = {};
  if (nombre) datosNuevos.nombre = nombre;
  if (categoria) datosNuevos.categoria = categoria;
  if (precio) datosNuevos.precio = precio;
  if (descripcion) datosNuevos.descripcion = descripcion;
  if (img) datosNuevos.img = img;
  if (stock) datosNuevos.stock = stock;
  if (oferta) datosNuevos.oferta = oferta;

  ModeloProducto.updateOne({ id: idProducto }, datosNuevos)
    .then((data) => {
      if (data.matchedCount === 0) {
        throw new Error(`No exite tarea con el Id: ${idProducto}`);
      }
      res.json({
        message: `Tarea con Id ${idProducto} modificada con éxito`,
      });
    })
    .catch((error) => {
      next(error);
    });
};
