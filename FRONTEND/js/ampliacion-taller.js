import Taller from "./Models/Taller.js";
import Producto from "./Models/Producto.js";
import { RequestsAPI } from "./RequestsAPI.js";
import { imprimir, validarSesion, manejarBtnFav } from "./utils/helpers.js";

const params = new URLSearchParams(window.location.search);
const idTaller = params.get("id");

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

// Detalle TALLER
// ------------------------------------------------------------------------------------------------------------------
const cargarAmpliacionTaller = (data) => {
  const taller = new Taller(
    data.id,
    data.nombre,
    data.precio,
    data.descripcion,
    data.img,
    data.fecha,
    data.hora
  );
  imprimir("ampliacion-taller", taller.mostrarAmpliacion());
};

const mostrarError = (error) => {
  imprimir("ampliacion-taller", error);
};

RequestsAPI.getTaller(idTaller)
  .then(cargarAmpliacionTaller)
  .catch((error) => {
    mostrarError(error);
  });
// ------------------------------------------------------------------------------------------------------------------

// Relacionados
const cargarPdtosRelacionados = (data) => {
  imprimir("pdtos-relacionados", "");

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

  imprimir("pdtos-relacionados", `${listadoProductos}`);

  document.querySelectorAll(".item-pdto").forEach((itemCatalogoPdto) => {
    itemCatalogoPdto.addEventListener("click", () => {
      document.location.replace(
        `ampliacion-pdto.html?id=${itemCatalogoPdto.id}`
      );
    });
  });

  document.querySelectorAll(".item-pdto").forEach((itemCatalogoPdto) => {
    const productoId = itemCatalogoPdto.id;

    itemCatalogoPdto.querySelector(".btn-fav").addEventListener("click", () => {
      manejarBtnFav(productoId, itemCatalogoPdto.querySelector(".btn-fav"));
    });
  });
};

RequestsAPI.getProductos({ filtroCategoria: "moldes" })
  .then((data) => {
    if (data.length === 0) {
      imprimir("pdtos-relacionados", "No hay productos que mostrar.");
    } else {
      cargarPdtosRelacionados(data);
    }
  })
  .catch((error) => {
    imprimir("pdtos-relacionados", error);
  });
