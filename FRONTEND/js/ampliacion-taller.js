import Taller from "./Models/Taller.js";
import Producto from "./Models/Producto.js";
import { RequestsAPI } from "./RequestsAPI.js";
import {
  imprimir,
  /*   obtenerValorInput,
  validarSesion, */
} from "./utils/helpers.js";

/* validarSesion(); */

const params = new URLSearchParams(window.location.search);
const idTaller = params.get("id");

const mostrarError = (error) => {
  imprimir("ampliacion-taller", error);
};

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