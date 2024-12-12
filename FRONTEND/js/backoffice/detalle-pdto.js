import Producto from "../Models/Producto.js";
import { RequestsAPI } from "../RequestsAPI.js";
import {
  imprimir,
  obtenerValorInput,
  validarAccesoBackoffice,
  /* validarSesion, */
} from "../utils/helpers.js";

/* validarSesion(); */
validarAccesoBackoffice();

const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id");

const mostrarError = (error) => {
  imprimir("detalle-error", error);
  imprimir("editar-pdto-error", error);
};

// Detalle PRODUCTO
// ------------------------------------------------------------------------------------------------------------------
const mostrarDetallePdto = (data) => {
  const pdto = new Producto(
    data.id,
    data.nombre,
    data.categoria,
    data.descripcion,
    data.precio,
    data.img,
    data.tags,
    data.color
  );
  imprimir("detalle-pdto", pdto.mostrarDetalle());
};

/* document.querySelector("#btn-editar").addEventListener("click", () => {
  document.location.replace(`editar-pdto.html?id=${idProducto}`);
}); */

document.querySelector("#btn-eliminar").addEventListener("click", () => {
  RequestsAPI.deleteProducto(idProducto)
    .then(() => {
      document.location.replace("index.html");
    })
    .catch((error) => {
      mostrarError(error);
    });
});

RequestsAPI.getProducto(idProducto)
  .then(mostrarDetallePdto)
  .catch((error) => {
    mostrarError(error);
  });
// ------------------------------------------------------------------------------------------------------------------

// Editar PRODUCTO
// ------------------------------------------------------------------------------------------------------------------
const popularCampos = (data) => {
  document.querySelector("#editar-nombre-pdto").value = data.nombre;
  document.querySelector("#editar-categoria-pdto").value = data.categoria;
  document.querySelector("#editar-precio-pdto").value = data.precio;
  document.querySelector("#editar-descripcion-pdto").value = data.descripcion;
  document.querySelector("#editar-img-pdto").value = data.img;
};

RequestsAPI.getProducto(idProducto)
  .then(popularCampos)
  .catch((error) => {
    mostrarError(error);
  });

document.querySelector("#btn-actualizar-pdto").addEventListener("click", () => {
  const nombre = obtenerValorInput("editar-nombre-pdto");
  const categoria = obtenerValorInput("editar-categoria-pdto");
  const precio = obtenerValorInput("editar-precio-pdto");
  const descripcion = obtenerValorInput("editar-descripcion-pdto");
  const img = obtenerValorInput("editar-img-pdto");

  if (!nombre || !categoria || !precio || !descripcion || !img) {
    imprimir("editar-pdto-error", "Por favor complete todos los campos");
    return;
  }

  RequestsAPI.putProducto(
    idProducto,
    nombre,
    categoria,
    precio,
    descripcion,
    img
  )
    .then(() => {
      document.location.replace(`index.html`);
    })
    .catch((error) => {
      imprimir("editar-pdto-error", error);
    });
});
// ------------------------------------------------------------------------------------------------------------------
