/* import Producto from "../Models/Producto.js";
import Taller from "../Models/Taller.js"; */
import {
  ocultar,
  mostrar,
  /*   imprimir,
  obtenerValorInput, */
  /*   validarSesion,*/
  validarAccesoBackoffice,
  eventoClickCerrarSesion,
} from "./utils/helpers.js";
/* import { RequestsAPI } from "./RequestsAPI.js"; */

/* validarSesion();*/
validarAccesoBackoffice();
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
