import Producto from "./Models/Producto.js";
import Taller from "./Models/Taller.js";
import {
  ocultar,
  mostrar,
  imprimir,
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

const cargarProductosEnOferta = (data) => {
  imprimir("ofertas", "");

  const productosEnOferta = data
    .filter((producto) => producto.oferta)
    .map((producto) => {
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
      return nuevoProducto.mostrarPdtoEnCatalogo();
    })
    .join("");

  imprimir("ofertas", productosEnOferta);

  document.querySelectorAll(".item-pdto").forEach((itemCatalogoPdto) => {
    itemCatalogoPdto.addEventListener("click", () => {
      document.location.replace(
        `ampliacion-pdto.html?id=${itemCatalogoPdto.id}`
      );
    });
  });
};

const mostrarErrorPdtosOferta = (error) => {
  imprimir("ofertas", error);
};

RequestsAPI.getProductos()
  .then((data) => {
    if (data.length === 0) {
      console.log("no hay productos que mostrar");
    } else {
      cargarProductosEnOferta(data);
    }
  })
  .catch(mostrarErrorPdtosOferta);
