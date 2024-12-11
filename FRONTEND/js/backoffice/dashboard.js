import Producto from "../Models/Producto.js";
import Taller from "../Models/Taller.js";
import {
  imprimir,
  obtenerValorInput,
  /*   validarSesion,*/
/*   validarAccesoBackoffice, */
  eventoClickCerrarSesion, 
} from "../utils/helpers.js";
import { RequestsAPI } from "../RequestsAPI.js";

/* validarSesion();*/
/* validarAccesoBackoffice(); */
eventoClickCerrarSesion(); 

// CATALOGO DE PRODUCTOS
// ------------------------------------------------------------------------------------------------------------------
const cargarProductos = (data) => {
  imprimir("catalogo-pdtos-error-back", "");

  const listadoProductos = data
    .map((producto) =>
      new Producto(
        producto.id,
        producto.nombre,
        producto.categoria,
        producto.precio,
        producto.descripcion,
        producto.img,
        producto.stock,
        producto.oferta
      ).mostrarPdtoEnCatalogo()
    )
    .join("");

  imprimir("catalogo-pdtos-back", `${listadoProductos}`);

  document.querySelectorAll(".item-pdto").forEach((itemCatalogoPdto) => {
    itemCatalogoPdto.addEventListener("click", () => {
      document.location.replace(`detalle-pdto.html?id=${itemCatalogoPdto.id}`);
    });
  });
};

const mostrarErrorPdtos = (error) => {
  imprimir("catalogo-pdtos-error-back", error);
};

RequestsAPI.getProductos()
  .then((data) => {
    if (data.length === 0) {
      ("no hay productos que mostrar");
    } else {
      cargarProductos(data);
    }
  })
  .catch(mostrarErrorPdtos);

// NUEVO
document.querySelector("#btn-nuevo-pdto").addEventListener("click", () => {
  const nombre = obtenerValorInput("nuevo-nombre-pdto");
  const cateoria = obtenerValorInput("nueva-categoria-pdto");
  const precio = obtenerValorInput("nuevo-precio-pdto");
  const descripcion = obtenerValorInput("nueva-descripcion-pdto");
  const img = obtenerValorInput("nueva-img-pdto");

  if (!nombre || !cateoria || !precio || !descripcion || !img) {
    imprimir("nuevo-pdto-error", "Por favor, complete todos los campos.");
    return;
  } else {
    console.log("Producto creado con éxito");
  }

  const body = JSON.stringify({ nombre, cateoria, precio, descripcion, img });

  RequestsAPI.postProducto(body)
    .then(() => {
      document.location.replace("dashboard.html");
    })
    .catch((error) => {
      imprimir("nuevo-pdto-error", error);
    });
});
// ------------------------------------------------------------------------------------------------------------------

// CATALOGO DE TALLERES
// ------------------------------------------------------------------------------------------------------------------
const cargarTalleres = (data) => {
  imprimir("catalogo-talleres-error-back", "");

  const listadoTalleres = data
    .map((taller) =>
      new Taller(
        taller.id,
        taller.nombre,
        taller.precio,
        taller.descripcion,
        taller.img,
        taller.fecha,
        taller.hora,
        taller.cupos,
        taller.disponibles
      ).mostrarTallerEnCatalogo()
    )
    .join("");

  imprimir("catalogo-talleres-back", `${listadoTalleres}`);

  document.querySelectorAll(".item-taller").forEach((itemCatalogoTaller) => {
    itemCatalogoTaller.addEventListener("click", () => {
      document.location.replace(
        `detalle-taller.html?id=${itemCatalogoTaller.id}`
      );
    });
  });
};

const mostrarErrorTalleres = (error) => {
  imprimir("catalogo-talleres-error-back", error);
};

RequestsAPI.getTalleres()
  .then((data) => {
    if (data.length === 0) {
      ("no hay talleres que mostrar");
    } else {
      cargarTalleres(data);
    }
  })
  .catch(mostrarErrorTalleres);

// NUEVO
document.querySelector("#btn-nuevo-taller").addEventListener("click", () => {
  const nombre = obtenerValorInput("nuevo-nombre-taller");
  const precio = obtenerValorInput("nuevo-precio-taller");
  const descripcion = obtenerValorInput("nueva-descripcion-taller");
  const img = obtenerValorInput("nueva-img-taller");
  const fecha = obtenerValorInput("nueva-fecha-taller");
  const hora = obtenerValorInput("nueva-hora-taller");

  if (!nombre || !precio || !descripcion || !img || !fecha || !hora) {
    imprimir("nuevo-taller-error", "Por favor, complete todos los campos.");
    return;
  } else {
    console.log("Taller creado con éxito");
  }

  const body = JSON.stringify({
    nombre,
    precio,
    descripcion,
    img,
    fecha,
    hora,
  });

  RequestsAPI.postTaller(body)
    .then(() => {
      document.location.replace("index.html");
    })
    .catch((error) => {
      imprimir("nuevo-taller-error", error);
    });
});
// ------------------------------------------------------------------------------------------------------------------
