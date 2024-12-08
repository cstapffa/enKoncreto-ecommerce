import express from "express";
import "dotenv/config";
import cors from "cors";
import { conectarDB } from "./database/conexion.js";
import { getProductos } from "./controllers/productos/getProductos.js";
import { getProductoById } from "./controllers/productos/getProductoById.js";
/* import { getProductosByType } from "./controllers/getProductosByType.js"; */
import { postProducto } from "./controllers/productos/postProducto.js";
import { putProducto } from "./controllers/productos/putProducto.js";
import { deleteProducto } from "./controllers/productos/deleteProducto.js";
import { controlarSesion } from "./middlewares/controlarSesion.js";
import { mostrarDatosRequest } from "./middlewares/mostrarDatosRequest.js";
import { manejadorErrores } from "./middlewares/manejadorErrores.js";
import { postUsuario } from "./controllers/usuarios/postUsuario.js";
import { loginUsuario } from "./controllers/usuarios/loginUsuario.js";
import { getUsuario } from "./controllers/usuarios/getUsuario.js";
import { logoutUsuario } from "./controllers/usuarios/logoutUsuario.js";
import { getTalleres } from "./controllers/talleres/getTalleres.js";
import { getTallerById } from "./controllers/talleres/getTallerById.js";
import { postTaller } from "./controllers/talleres/postTaller.js";
import { putTaller } from "./controllers/talleres/putTaller.js";
import { deleteTaller } from "./controllers/talleres/deleteTaller.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

await conectarDB();

// Middleware => Mostrar Data
app.use(mostrarDatosRequest);

app.get("/", (req, res) => {
  res.send("enKoncreto DB");
});

// /* Usuarios */
app.post("/registrar", postUsuario);
app.post("/login", loginUsuario);

// /* Productos */
app.get("/productos", getProductos);
app.get("/producto/:id", getProductoById);

// /* Talleres */
app.get("/talleres", getTalleres);
app.get("/taller/:id", getTallerById);

// Middleware => Controlar Sesión
/* app.use(controlarSesion); */
app.get("/usuario", getUsuario);
app.post("/logout", logoutUsuario);

app.post("/producto", postProducto);
app.put("/producto/:id", putProducto);
app.delete("/producto/:id", deleteProducto);

app.post("/taller", postTaller);
app.put("/taller/:id", putTaller);
app.delete("/taller/:id", deleteTaller);

// Middleware => Manejador de Errores
app.use(manejadorErrores);

// Servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
