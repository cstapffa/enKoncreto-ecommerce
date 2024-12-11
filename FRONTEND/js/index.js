import Producto from "./Models/Producto.js";
import Taller from "./Models/Taller.js";
import {
  ocultar,
  mostrar,
  imprimir /*  
  obtenerValorInput, */,
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

/* PROXIMO TALLER */
const cargarProximoTaller = (data) => {
  imprimir("proximo-taller", "");
  const ahora = new Date();
  const proximoTaller = data
    .filter((taller) => new Date(taller.fecha) > ahora)
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))[0];
  if (proximoTaller) {
    const taller = new Taller(
      proximoTaller.id,
      proximoTaller.nombre,
      proximoTaller.precio,
      proximoTaller.descripcion,
      proximoTaller.img,
      proximoTaller.fecha,
      proximoTaller.hora,
      proximoTaller.cupos,
      proximoTaller.disponibles
    );

    imprimir("proximo-taller", taller.mostrarProximoTaller());
  }
};

const mostrarErrorProximoTaller = (error) => {
  imprimir("proximo-taller", error);
};

RequestsAPI.getTalleres()
  .then((data) => {
    if (data.length === 0) {
      ("no hay talleres que mostrar");
    } else {
      cargarProximoTaller(data);
    }
  })
  .catch(mostrarErrorProximoTaller);

/* PDTOS OFERTA */
const cargarProductosEnOferta = (data) => {
  // Limpia el contenedor de ofertas antes de insertar contenido nuevo
  imprimir("ofertas", "");

  // Filtra los productos en oferta y genera el HTML
  const productosEnOferta = data
    .filter((producto) => producto.oferta) // Filtrar productos en oferta
    .map((producto) => {
      // Crear una instancia de Producto y generar HTML
      const nuevoProducto = new Producto(
        producto.id,
        producto.nombre,
        producto.categoria,
        producto.precio,
        producto.descripcion,
        producto.img,
        producto.stock,
        producto.oferta
      );
      return nuevoProducto.mostrarPdtoEnCatalogo(); // Retorna el HTML
    })
    .join(""); // Combina todos los strings en uno solo

  // Inserta el HTML en el contenedor
  imprimir("ofertas", productosEnOferta);
};

const mostrarErrorPdtosOferta = (error) => {
  imprimir("ofertas", error);
};

RequestsAPI.getProductos()
  .then((data) => {
    if (data.length === 0) {
      console.log("no hay productos que mostrar");
      ("no hay productos que mostrar");
    } else {
      cargarProductosEnOferta(data);
    }
  })
  .catch(mostrarErrorPdtosOferta);
