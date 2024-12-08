import { ModeloTaller } from "../../database/Models/ModeloTaller.js";

export const deleteTaller = (req, res, next) => {
  const idTaller = req.params.id;

  ModeloTaller.deleteOne({ id: idTaller })
    .then((data) => {
      if (data.deletedCount !== 1) {
        throw new Error(`No existe ningún taller con el Id: ${idTaller}`);
      } else {
        res.json({
          message: `Taller con Id: ${idTaller} eliminado con éxito`,
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};
