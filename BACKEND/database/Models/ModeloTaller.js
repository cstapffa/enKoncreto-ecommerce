import { Schema, model } from "mongoose";

const schemaTaller = new Schema({
  id: { type: Number, unique: true },
  nombre: String,
  precio: String,
  descripcion: String,
  img: String,
  fecha: String,
  hora: String,
  cupos:  Number,
  disponibles: Number, 
  /* usuario: String, */
});

export const ModeloTaller = model("Taller", schemaTaller);
