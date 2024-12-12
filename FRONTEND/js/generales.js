import {
  ocultar,
  mostrar,
  validarSesion,
  eventoClickCerrarSesion,
} from "./utils/helpers.js";

validarSesion();
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
