import { ModeloProducto } from "../database/Models/ModeloProducto.js";

export const getProductoById = (req, res, next) => {
  const idProducto = req.params.id;

  ModeloProducto.findOne({ id: idProducto/* , usuario: req.usuario.id */ })
    .then((data) => {
      if (!data) {
        throw new Error(`No existe ningún producto con el Id: ${idProducto}`);
      } else {
        res.json(data);
      }
    })
    .catch((error) => {
      next(error);
    });
};
