import express from "express";
import "dotenv/config";
import cors from "cors";
import { conectarDB } from "./database/conexion.js";
import { getProductos } from "./controllers/getProductos.js";
import { getProductoById } from "./controllers/getProductoById.js";
/* import { getProductosByType } from "./controllers/getProductosByType.js"; */
import { postProducto } from "./controllers/postProducto.js";
import { putProducto } from "./controllers/putProducto.js";
import { deleteProducto } from "./controllers/deleteProducto.js";
import { controlarSesion } from "./middlewares/controlarSesion.js";
import { mostrarDatosRequest } from "./middlewares/mostrarDatosRequest.js";
import { manejadorErrores } from "./middlewares/manejadorErrores.js";
import { postUsuario } from "./controllers/postUsuario.js";
import { loginUsuario } from "./controllers/loginUsuario.js";
import { getUsuario } from "./controllers/getUsuario.js";
import { logoutUsuario } from "./controllers/logoutUsuario.js";
 import { getTalleres } from "./controllers/getTalleres.js";
import { getTallerById } from "./controllers/getTallerById.js";
import { postTaller } from "./controllers/postTaller.js";
import { putTaller } from "./controllers/putTaller.js";
import { deleteTaller } from "./controllers/deleteTaller.js";

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
/*app.get("/productos/:type", getProductosByType); */

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
