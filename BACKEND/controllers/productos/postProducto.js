import { ModeloProducto } from "../../database/Models/ModeloProducto.js";
import { obtenerProximoId } from "../../utils/functions.js";

export const postProducto = async (req, res, next) => {
  const { nombre, categoria, precio, descripcion, img, oferta, stock } = req.body;

  const nuevoProducto = new ModeloProducto();
  nuevoProducto.id = await obtenerProximoId(ModeloProducto);
  nuevoProducto.nombre = nombre;
  nuevoProducto.categoria = categoria;
  nuevoProducto.precio = precio;
  nuevoProducto.descripcion = descripcion;
  nuevoProducto.img = img;
  nuevoProducto.stock = stock;
  nuevoProducto.oferta = oferta;

  nuevoProducto
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      next(error);
    });
};
