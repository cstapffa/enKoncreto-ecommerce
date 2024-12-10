import Taller from "../Models/Taller.js";
import { RequestsAPI } from "../RequestsAPI.js";
import {
  imprimir,
  obtenerValorInput,
  validarSesion,
} from "../utils/helpers.js";

/* validarSesion(); */

const params = new URLSearchParams(window.location.search);
const idTaller = params.get("id");

const mostrarError = (error) => {
  imprimir("detalle-error", error);
  imprimir("editar-taller-error", error);
};

// Detalle TALLER
// ------------------------------------------------------------------------------------------------------------------
const mostrarDetalleTaller = (data) => {
  const taller = new Taller(
    data.id,
    data.nombre,
    data.descripcion,
    data.precio,
    data.img,
    data.fecha,
    data.hora
  );
  imprimir("detalle-taller", taller.mostrarDetalle());
};

/* document.querySelector("#btn-editar").addEventListener("click", () => {
  document.location.replace(`editar-taller.html?id=${idTaller}`);
}); */

document.querySelector("#btn-eliminar").addEventListener("click", () => {
  RequestsAPI.deleteTaller(idTaller)
    .then(() => {
      document.location.replace("index.html");
    })
    .catch((error) => {
      mostrarError(error);
    });
});

RequestsAPI.getTaller(idTaller)
  .then(mostrarDetalleTaller)
  .catch((error) => {
    mostrarError(error);
  });
// ------------------------------------------------------------------------------------------------------------------

// Editar TALLER
// ------------------------------------------------------------------------------------------------------------------
const popularCampos = (data) => {
  document.querySelector("#editar-nombre").value = data.nombre;
  document.querySelector("#editar-precio").value = data.precio;
  document.querySelector("#editar-descripcion").value = data.descripcion;
  document.querySelector("#editar-img").value = data.img;
  document.querySelector("#editar-fecha").value = data.fecha;
  document.querySelector("#editar-hora-").value = data.hora;
};

RequestsAPI.getTaller(idTaller)
  .then(popularCampos)
  .catch((error) => {
    mostrarError(error);
  });

document
  .querySelector("#btn-actualizar-taller")
  .addEventListener("click", () => {
    const nombre = obtenerValorInput("editar-nombre");
    const precio = obtenerValorInput("editar-precio");
    const descripcion = obtenerValorInput("editar-descripcion");
    const img = obtenerValorInput("editar-img");
    const fecha = obtenerValorInput("editar-fecha");
    const hora = obtenerValorInput("editar-hora");

    if (!nombre || !precio || !descripcion || !img || !fecha || !hora) {
      imprimir("editar-taller-error", "Por favor complete todos los campos");
      return;
    }

    RequestsAPI.putTaller(
      idTaller,
      nombre,
      precio,
      descripcion,
      img,
      fecha,
      hora
    )
      .then(() => {
        document.location.replace(`index.html`);
      })
      .catch((error) => {
        imprimir("editar-taller-error", error);
      });
  });
// ------------------------------------------------------------------------------------------------------------------
