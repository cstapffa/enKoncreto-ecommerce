import { Schema, model } from "mongoose";

const schemaProducto = new Schema({
  id: { type: Number, unique: true },
  nombre: String,
  categoria: String,
  precio: String,
  descripcion: String,
  img: String,
  stock: { type: Number, default: 0 },
  destacado: { type: Boolean, default: false },
  /* usuario: String, */
});

export const ModeloProducto = model("Producto", schemaProducto);
