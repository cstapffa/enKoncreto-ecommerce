import { ModeloTaller } from "../../database/Models/ModeloTaller.js";

export const getTallerById = (req, res, next) => {
  const idTaller = req.params.id;

  ModeloTaller.findOne({ id: idTaller})
    .then((data) => {
      if (!data) {
        throw new Error(`No existe ningún taller con el Id: ${idTaller}`);
      } else {
        res.json(data);
      }
    })
    .catch((error) => {
      next(error);
    });
};
