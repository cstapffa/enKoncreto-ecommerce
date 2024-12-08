import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const schemaUsuario = new Schema({
  id: { type: Number, unique: true },
  nombre: String,
  apellido: String,
  email: { type: String, unique: true },
  password: String,
  session: String,
  admin: { type: Boolean, default: false },
});

if (mongoose.models.Usuario) {
  delete mongoose.models.Usuario;
}

export const ModeloUsuario = model("Usuario", schemaUsuario);
