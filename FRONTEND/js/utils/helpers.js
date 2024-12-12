import { RequestsAPI } from "../RequestsAPI.js";

export const ocultar = (etiquetaId) => {
  document.querySelector(etiquetaId).style.display = "none";
};

export const mostrar = (etiquetaId) => {
  document.querySelector(etiquetaId).style.display = "block";
};

export const obtenerValorInput = (idInput) => {
  const inputElement = document.getElementById(idInput);
  if (inputElement) {
    return inputElement.value;
  } else {
    console.error(`No se encontró ningún elemento con el ID: ${idInput}`);
  }
};

export const imprimir = (elemento, contenido) => {
  const ele = document.querySelector(`#${elemento}`);
  if (ele) {
    ele.innerHTML = contenido;
  } else {
    console.error(`No se encontró ningún elemento con el ID: ${elemento}`);
  }
};

export const validarSesion = (mensajeError, callback) => {
  const session = sessionStorage.getItem("session");

  if (!session) {
    alert(mensajeError);
    document.location.replace("/login.html");
  } else {
    callback();
  }
};

export const validarAccesoAdmin = () => {
  const session = sessionStorage.getItem("session");
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  console.log("Usuario almacenado:", usuario);

  if (!session || !usuario || !usuario.admin) {
    alert("Acceso denegado. Debes iniciar sesión como administrador.");
    document.location.replace("/login.html");
  } else {
    console.log("Acceso autorizado para administradores.");
  }
};

export const eventoClickCerrarSesion = () => {
  document.querySelector("#boton-logout").addEventListener("click", () => {
    sessionStorage.removeItem("session");
    localStorage.removeItem("usuario");
    RequestsAPI.logout().then(() => {
      alert("Sesión cerrada correctamente.");
      document.location.replace("/index.html");
    });
  });
};
