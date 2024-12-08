export const getUsuario = (req, res, next) => {
  const { nombre, apellido } = req.usuario;

  if (!nombre || !apellido) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json({ nombre, apellido });
};
