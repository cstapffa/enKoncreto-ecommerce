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

// FAVORITOS
const agregarAFavoritos = (productoId) => {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (!favoritos.includes(productoId)) {
    favoritos.push(productoId);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    console.log("Producto agregado a favoritos:", productoId);
  } else {
    console.log("Este producto ya está en favoritos.");
  }
};

const eliminarDeFavoritos = (productoId) => {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  favoritos = favoritos.filter((id) => id !== productoId);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  console.log("Producto eliminado de favoritos:", productoId);
};

const actualizarImagenFavoritos = (productoId, btnFav) => {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (favoritos.includes(productoId)) {
    btnFav.src = "path/to/heart-filled-icon.png"; // imagen "rellena"
  } else {
    btnFav.src = "path/to/heart-empty-icon.png"; // imagen "vacía"
  }
};

/* btn-fav */
export const manejarBtnFav = (productoId, btnFav) => {
  validarSesion(() => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.includes(productoId)) {
      eliminarDeFavoritos(productoId);
      actualizarImagenFavoritos(productoId, btnFav); // vacia
    } else {
      agregarAFavoritos(productoId);
      actualizarImagenFavoritos(productoId, btnFav); // rellena
    }
  });
};

/* agregar-fav */
export const manejarAgregarFav = (productoId) => {
  validarSesion(() => {
    agregarAFavoritos(productoId);
    console.log("Producto agregado a favoritos:", productoId);
  });
};

/* eliminar-fav */
export const manejarEliminarFav = (productoId) => {
  eliminarDeFavoritos(productoId);
  console.log("Producto eliminado de favoritos:", productoId);
};

export const obtenerFavoritos = () => {
  return JSON.parse(localStorage.getItem("favoritos")) || [];
};
