import { ModeloProducto } from "../database/Models/ModeloProducto.js";

export const deleteProducto = (req, res, next) => {
  const idProducto = req.params.id;

  ModeloProducto.deleteOne({ id: idProducto })
    .then((data) => {
      if (data.deletedCount !== 1) {
        throw new Error(`No existe ningún producto con el Id: ${idProducto}`);
      } else {
        res.json({
          message: `Producto con Id: ${idProducto} eliminado con éxito`,
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};
