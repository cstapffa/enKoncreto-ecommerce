import { ModeloUsuario } from "../../database/Models/ModeloUsuario.js";
import { obtenerProximoId } from "../../utils/functions.js";

export const postUsuario = async (req, res, next) => {
  const { nombre, apellido, email, password } = req.body;

  try {
    const usuarioExistente = await ModeloUsuario.findOne({ user: email });

    if (usuarioExistente) {
      throw new Error("El correo ingresado ya tiene una cuenta asociada.");
    }

    const nuevoUsuario = new ModeloUsuario();
    nuevoUsuario.id = await obtenerProximoId(ModeloUsuario);
    nuevoUsuario.nombre = nombre;
    nuevoUsuario.apellido = apellido;
    nuevoUsuario.password = password;
    nuevoUsuario.email = email;

    nuevoUsuario
      .save()
      .then(() => {
        res.json({
          message: `Nuevo usuario con Id: ${nuevoUsuario.id} creado con éxito.`,
        });
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};
