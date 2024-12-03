import { ModeloUsuario } from "../database/Models/ModeloUsuario.js";

export const logoutUsuario = async (req, res, next) => {
  const token = req.headers["authorization"];
  const usuario = await ModeloUsuario.findOne({ session: token });

  if (usuario) {
    usuario.session = null;
    await usuario.save();
    res.json({ message: "Sesión cerrada con éxito!" });
  } else {
    next(new Error("No se encontró el usuario"));
  }
};
