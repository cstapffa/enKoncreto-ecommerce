import Producto from "./Models/Producto.js";
import {
  imprimir,
  /*   obtenerValorInput,
  validarSesion,
  eventoClickCerrarSesion, */
} from "./utils/helpers.js";
import { RequestsAPI } from "./RequestsAPI.js";

const cargarProductos = (data) => {
  console.log("Datos recibidos:", data);
  imprimir("catalogo-error", "");

  const listadoProductos = data
    .map((producto) =>
      new Producto(
        producto.id,
        producto.nombre,
        producto.categoria,
        producto.precio,
        producto.descripcion,
        producto.img,
        producto.tags,
        producto.color
      ).mostrarPdtoEnCatalogo()
    )
    .join("");

  imprimir("catalogo", `${listadoProductos}`);

  document.querySelectorAll(".item-pdto").forEach((itemCatalogo) => {
    itemCatalogo.addEventListener("click", () => {
      document.location.replace(`detalle-producto.html?id=${itemCatalogo.id}`);
    });
  });
};

const mostrarError = (error) => {
  imprimir("catalogo-error", error);
};

RequestsAPI.getProductos()
  .then((data) => {
    if (data.length === 0) {
      ("no hay productos que mostrar");
    } else {
      cargarProductos(data);
    }
  })
  .catch(mostrarError);

/* RequestsAPI.getUsuario()
  .then((usuario) => {
    const { nombre, apellido } = usuario;
    const usuarioLogueado = document.querySelector("#usuario-logueado");
    if (usuarioLogueado && nombre && apellido) {
      usuarioLogueado.textContent = `${nombre} ${apellido}`;
    }
  })
  .catch((error) => {
    console.error("Error al obtener la información del usuario:", error);
  }); */
