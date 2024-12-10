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

/* export const validarSesion = () => {
  // obtenemos el valor de la sesion del sessionStorage
  const usuarioLogueado = sessionStorage.getItem("session");
  // verificamos si estamos en la pagina de login o register
  const estaEnLogin = document.location.pathname.includes("login.html");
  const estaEnRegister = document.location.pathname.includes("register.html");
  const estaEnPaginaPublica = estaEnLogin || estaEnRegister;

  // si el usuario esta logueado y esta en una pagina publica, lo redirigimos al index
  if (usuarioLogueado) {
    if (estaEnPaginaPublica) {
      document.location.replace("index.html");
    }
  } else {
    // si no estas logueado,y esta en una pagina restringida, redirigimos al login
    if (!estaEnPaginaPublica) {
      document.location.replace("login.html");
    }
  }
}; */

export const validarAccesoBackoffice = () => {
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuario"));
  const usuarioEsAdmin = usuarioLogueado?.admin;
  const estaEnBackoffice = window.location.pathname.includes("/backoffice/");

  if (estaEnBackoffice) {
    if (!usuarioLogueado) {
      alert("Debes iniciar sesión para acceder al backoffice.");
      document.location.replace("/login.html");
    } else if (!usuarioEsAdmin) {
      alert(
        "ACCESO DENEGADO. Solo los administradores pueden acceder al backoffice."
      );
      document.location.replace("/index.html");
    }
  }
};

export const eventoClickCerrarSesion = () => {
  document.querySelector("#boton-logout").addEventListener("click", () => {
    sessionStorage.removeItem("session");
    sessionStorage.removeItem("usuario");
    RequestsAPI.logout()
      .then(() => {
        document.location.replace("index.html");
      })
      .catch((error) => {
        alert(error);
      });
  });
};
