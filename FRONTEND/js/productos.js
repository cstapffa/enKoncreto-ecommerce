import Producto from "./Models/Producto.js";
import {
  ocultar,
  mostrar,
  imprimir,
  obtenerValorInput,
  /*   validarSesion,*/
  eventoClickCerrarSesion,
} from "./utils/helpers.js";
import { RequestsAPI } from "./RequestsAPI.js";

/* validarSesion();*/
eventoClickCerrarSesion();

document.querySelector("#searchIcon").addEventListener("click", () => {
  if (document.querySelector("#menu-buscador").style.display === "none") {
    mostrar("#menu-buscador");
  } else {
    ocultar("#menu-buscador");
  }
});
document.querySelector("#heartIcon").addEventListener("click", () => {
  if (document.querySelector("#menu-favoritos").style.display === "none") {
    mostrar("#menu-favoritos");
  } else {
    ocultar("#menu-favoritos");
  }
});
document.querySelector("#cartIcon").addEventListener("click", () => {
  if (document.querySelector("#menu-carrito").style.display === "none") {
    mostrar("#menu-carrito");
  } else {
    ocultar("#menu-carrito");
  }
});
document.querySelector("#profileIcon").addEventListener("click", () => {
  if (document.querySelector("#menu-perfil").style.display === "none") {
    mostrar("#menu-perfil");
  } else {
    ocultar("#menu-perfil");
  }
});
document.querySelector("#btn-filtros-dsk").addEventListener("click", () => {
  if (document.querySelector("#menu-filtros-dsk").style.display === "none") {
    mostrar("#menu-filtros-dsk");
  } else {
    ocultar("#menu-filtros-dsk");
  }
});

// CATALOGO DE PRODUCTOS
// ------------------------------------------------------------------------------------------------------------------
const cargarProductos = (data) => {
  imprimir("catalogo-pdtos", "");

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

  imprimir("catalogo-pdtos", `${listadoProductos}`);

  document.querySelectorAll(".item-pdto").forEach((itemCatalogoPdto) => {
    itemCatalogoPdto.addEventListener("click", () => {
      document.location.replace(
        `ampliacion-pdto.html?id=${itemCatalogoPdto.id}`
      );
    });
  });
};

const mostrarErrorPdtos = (error) => {
  imprimir("catalogo-pdtos", error);
};

document
  .querySelector("#input-filtro-nombre-dsk")
  .addEventListener("input", () => {
    const filtroNombre = obtenerValorInput("input-filtro-nombre-dsk");

    RequestsAPI.getProductos({ filtroNombre })
      .then(cargarProductos)
      .catch(mostrarErrorPdtos);
  });

const urlParams = new URLSearchParams(window.location.search);
const filtroCategoria = urlParams.get("categoria");

if (filtroCategoria) {
  document.querySelector("#input-filtro-categoria-dsk").value = filtroCategoria;

  RequestsAPI.getProductos({ filtroCategoria })
    .then(cargarProductos)
    .catch(mostrarErrorPdtos);
}

const selectorCategoria = document.querySelector("#input-filtro-categoria-dsk");
selectorCategoria.addEventListener("change", () => {
  const nuevaCategoria = selectorCategoria.value;

  RequestsAPI.getProductos({ filtroCategoria: nuevaCategoria })
    .then(cargarProductos)
    .catch(mostrarErrorPdtos);
});

document
  .querySelector("#input-filtro-oferta-dsk")
  .addEventListener("change", () => {
    const filtroOferta = document.querySelector(
      "#input-filtro-oferta-dsk"
    ).checked;

    const filtros = filtroOferta ? { filtroOferta } : {}; // Si no está activo, no agrega filtro de oferta

    RequestsAPI.getProductos(filtros)
      .then(cargarProductos)
      .catch(mostrarErrorPdtos);
  });

document
  .querySelector("#input-filtro-precio-dsk")
  .addEventListener("click", () => {
    const precioMin = obtenerValorInput("txt_nroMin");
    const precioMax = obtenerValorInput("txt_nroMax");

    if (!precioMin && !precioMax) {
      console.log("No hay rango de precios");
    }

    RequestsAPI.getProductos({ precioMin, precioMax })
      .then(cargarProductos)
      .catch(mostrarErrorPdtos);
  });

RequestsAPI.getProductos()
  .then((data) => {
    if (data.length === 0) {
      imprimir("catalogo-pdtos", "No hay productos que mostrar.");
    } else {
      cargarProductos(data);
    }
  })
  .catch(mostrarErrorPdtos);
