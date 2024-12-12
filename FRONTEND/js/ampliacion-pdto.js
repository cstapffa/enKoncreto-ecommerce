import Producto from "./Models/Producto.js";
import { imprimir } from "./utils/helpers.js";
import { RequestsAPI } from "./RequestsAPI.js";

const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id");

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
};

const mostrarError = (error) => {
  imprimir("ampliacion-pdto", error);
};

// Relacionados
const cargarProductosRelacionados = (categoria, idProductoActual) => {
  RequestsAPI.getProductos({ filtroCategoria: categoria }) // Cambia a tu endpoint de productos
    .then((productos) => {
      // Filtrar productos de la misma categoría y excluir el actual
      const productosRelacionados = productos
        .filter((producto) => producto.id !== idProductoActual)
        .slice(0, 4); // Tomar solo los primeros 4 productos

      // Generar HTML para los productos relacionados
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

      // Imprimir los productos relacionados
      imprimir("pdtos-relacionados", contenido);
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
