import { Schema, model } from "mongoose";

const schemaProducto = new Schema({
  id: { type: Number, unique: true },
  nombre: String,
  categoria: String,
  precio: String,
  descripcion: String,
  img: String,
  tags: Array,
  color: Array,
  /* usuario: String, */
});

export const ModeloProducto = model("Producto", schemaProducto);
