import { ModeloTaller } from "../database/Models/ModeloTaller.js";

export const putTaller = (req, res, next) => {
  const idTaller = req.params.id;
  const { nombre, precio, descripcion, img, fecha, hora } = req.body;

  const datosNuevos = {};
  if (nombre) datosNuevos.nombre = nombre;
  if (precio) datosNuevos.precio = precio;
  if (descripcion) datosNuevos.descripcion = descripcion;
  if (img) datosNuevos.img = img;
  if (fecha) datosNuevos.fecha = fecha;
  if (hora) datosNuevos.hora = hora;

  ModeloTaller.updateOne({ id: idTaller }, datosNuevos)
    .then((data) => {
      if (data.matchedCount === 0) {
        throw new Error(`No exite taller con el Id: ${idTaller}`);
      }
      res.json({
        message: `Taller con Id ${idTaller} modificado con éxito`,
      });
    })
    .catch((error) => {
      next(error);
    });
};