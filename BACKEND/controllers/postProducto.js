import { ModeloProducto } from "../database/Models/ModeloProducto.js";
import { obtenerProximoId } from "../utils/functions.js";

export const postProducto = async (req, res, next) => {
  const { nombre, categoria, precio, descripcion, img, tags, color } = req.body;

  const nuevoProducto = new ModeloProducto();
  nuevoProducto.id = await obtenerProximoId(ModeloProducto);
  nuevoProducto.nombre = nombre;
  nuevoProducto.categoria = categoria;
  nuevoProducto.precio = precio;
  nuevoProducto.descripcion = descripcion;
  nuevoProducto.img = img;
  nuevoProducto.tags = tags;
  nuevoProducto.color = color;
  /* nuevoProducto.usuario = req.usuario.id; */

  nuevoProducto
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      next(error);
    });
};
