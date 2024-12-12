import Producto from "./Models/Producto.js";
import {
  imprimir,
  validarSesion,
  manejarBtnFav,
  manejarAgregarFav,
  agregarAlCarrito,
} from "./utils/helpers.js";
import { RequestsAPI } from "./RequestsAPI.js";

const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id");

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

// AMPLIACION PRODUCTO ------------------------------------------------------------------------------------------------
const cargarAmpliacionPdto = (producto) => {
  const pdto = new Producto(
    producto.id,
    producto.nombre,
    producto.categoria,
    producto.precio,
    producto.descripcion,
    producto.img
  );

  imprimir("ampliacion-pdto", pdto.mostrarAmpliacion());

  cargarProductosRelacionados(pdto.categoria, pdto.id);

  document.querySelectorAll(".agregar-carrito").forEach((btnCarrito) => {
    btnCarrito.addEventListener("click", (e) => {
      const productoId = e.target.getAttribute("data-producto-id");
      agregarAlCarrito(productoId); // Agregar el producto al carrito
    });
  });

  document.querySelectorAll(".item-pdto").forEach((itemCatalogoPdto) => {
    const productoId = itemCatalogoPdto.id;

    itemCatalogoPdto
      .querySelector(".agregar-fav")
      .addEventListener("click", () => {
        manejarAgregarFav(productoId);
      });
  });
};

const mostrarError = (error) => {
  imprimir("ampliacion-pdto", error);
};

// Relacionados
const cargarProductosRelacionados = (categoria, idProductoActual) => {
  RequestsAPI.getProductos({ filtroCategoria: categoria })
    .then((productos) => {
      const productosRelacionados = productos
        .filter((producto) => producto.id !== idProductoActual)
        .slice(0, 4); // solo los primeros 4 productos

      const contenido = productosRelacionados
        .map((producto) =>
          new Producto(
            producto.id,
            producto.nombre,
            producto.categoria,
            producto.precio,
            producto.descripcion,
            producto.img
          ).mostrarPdtoEnCatalogo()
        )
        .join("");

      imprimir("pdtos-relacionados", contenido);

      document.querySelectorAll(".item-pdto").forEach((itemCatalogoPdto) => {
        const productoId = itemCatalogoPdto.id;

        itemCatalogoPdto
          .querySelector(".btn-fav")
          .addEventListener("click", () => {
            manejarBtnFav(
              productoId,
              itemCatalogoPdto.querySelector(".btn-fav")
            );
          });
      });
    })
    .catch((error) => {
      imprimir(
        "pdtos-relacionados",
        "No se pudieron cargar productos relacionados."
      );
      console.error(error);
    });
};

RequestsAPI.getProducto(idProducto)
  .then((data) => {
    if (data.length === 0) {
      imprimir("pdtos-relacionados", "No hay productos que mostrar.");
    } else {
      cargarAmpliacionPdto(data);
    }
  })
  .catch(mostrarError);
