import Taller from "./Models/Taller.js";
import {
  ocultar,
  mostrar,
  imprimir,
  validarSesion,
  eventoClickCerrarSesion,
} from "./utils/helpers.js";
import { RequestsAPI } from "./RequestsAPI.js";

eventoClickCerrarSesion();

document.querySelector("#searchIcon").addEventListener("click", () => {
  if (document.querySelector("#menu-buscador").style.display === "none") {
    mostrar("#menu-buscador");
  } else {
    ocultar("#menu-buscador");
  }
});
document.querySelector("#heartIcon").addEventListener("click", () => {
  validarSesion("Debes iniciar sesión para ver los favoritos.", () => {
    const menuFavoritos = document.querySelector("#menu-favoritos");
    if (menuFavoritos.style.display === "none") {
      mostrar("#menu-favoritos");
    } else {
      ocultar("#menu-favoritos");
    }
  });
});
document.querySelector("#cartIcon").addEventListener("click", () => {
  validarSesion("Debes iniciar sesión para ver tu carrito.", () => {
    const menuCarrito = document.querySelector("#menu-carrito");
    if (menuCarrito.style.display === "none") {
      mostrar("#menu-carrito");
    } else {
      ocultar("#menu-carrito");
    }
  });
});
document.querySelector("#profileIcon").addEventListener("click", () => {
  if (document.querySelector("#menu-perfil").style.display === "none") {
    mostrar("#menu-perfil");
  } else {
    ocultar("#menu-perfil");
  }
});

// CATALOGO DE TALLERES
// ------------------------------------------------------------------------------------------------------------------
const cargarTalleres = (data) => {
  imprimir("catalogo-talleres", "");

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

  imprimir("catalogo-talleres", `${listadoTalleres}`);

  document.querySelectorAll(".item-taller").forEach((itemCatalogoTaller) => {
    itemCatalogoTaller.addEventListener("click", () => {
      document.location.replace(
        `ampliacion-taller.html?id=${itemCatalogoTaller.id}`
      );
    });
  });
};

const mostrarErrorTalleres = (error) => {
  imprimir("catalogo-talleres", error);
};

RequestsAPI.getTalleres()
  .then((data) => {
    if (data.length === 0) {
      imprimir("catalogo-talleres", "No hay talleres que mostrar.");
    } else {
      cargarTalleres(data);
    }
  })
  .catch(mostrarErrorTalleres);
