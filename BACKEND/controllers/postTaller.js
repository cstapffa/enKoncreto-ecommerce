import { ModeloTaller } from "../database/Models/ModeloTaller.js";
import { obtenerProximoId } from "../utils/functions.js";

export const postTaller = async (req, res, next) => {
  const { nombre, precio, descripcion, img, fecha, hora } = req.body;

  const nuevoTaller = new ModeloTaller();
  nuevoTaller.id = await obtenerProximoId(ModeloProducto);
  nuevoTaller.nombre = nombre;
  nuevoTaller.precio = precio;
  nuevoTaller.descripcion = descripcion;
  nuevoTaller.img = img;
  nuevoTaller.fecha = fecha;
  nuevoTaller.hora = hora;

  nuevoTaller
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      next(error);
    });
};