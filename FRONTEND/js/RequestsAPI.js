const obtenerUrl = (ruta) => `${RequestsAPI.urlBaseBackend}/${ruta}`;

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const token = sessionStorage.getItem("session");

if (token) {
  headers.authorization = token;
}

const procesarRespuesta = (res) => {
  return res.json().then((data) => {
    if (data.error) {
      throw new Error(data?.error);
    }

    return data;
  });
};

const manejarErrores = (error = new Error("Error desconocido")) => {
  console.error("Ha ocurrido un error:", error.message);
  throw error.message;
};

export class RequestsAPI {
  /* static urlBaseBackend = "https://pw-enkoncreto.onrender.com"; */ // URL de la API
  static urlBaseBackend = "http://localhost:3000"; // LOCALHOST

  // post /login
  static login(email, password) {
    const body = JSON.stringify({ email, password });

    return fetch(obtenerUrl("login"), { method: "POST", body, headers })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  static logout() {
    return fetch(obtenerUrl("logout"), { method: "POST", headers })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // post /registrar
  static register(body) {
    return fetch(obtenerUrl("registrar"), { method: "POST", body, headers })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // get /usuarios
  static getUsuario() {
    return fetch(obtenerUrl("usuario"), { headers })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // get /productos
  static getProductos(opciones = {}) {
    const queryParams = new URLSearchParams({});

    if (opciones.filtroNombre) {
      queryParams.set("nombre", opciones.filtroNombre);
    }

    if (opciones.filtroCategoria) {
      queryParams.set("categoria", opciones.filtroCategoria);
    }

    if (opciones.filtroOferta !== undefined) {
      queryParams.set("oferta", opciones.filtroOferta); // Booleano o string "true"/"false"
    }

    if (opciones.precioMin) {
      queryParams.set("precioMin", opciones.precioMin);
    }

    if (opciones.precioMax) {
      queryParams.set("precioMax", opciones.precioMax);
    }

    return fetch(obtenerUrl("productos?" + queryParams), { headers })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // get /pdto/:idProducto
  static getProducto(idProducto) {
    return fetch(obtenerUrl(`producto/${idProducto}`), { headers })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // post /pdto
  static postProducto(body) {
    return fetch(obtenerUrl("producto"), { method: "POST", headers, body })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // put /pdto/:idProducto
  static putProducto(
    idProducto,
    nombre,
    categoria,
    precio,
    descripcion,
    img,
    stock,
    oferta
  ) {
    const body = JSON.stringify({
      nombre,
      categoria,
      precio,
      descripcion,
      img,
      stock,
      oferta,
    });
    return fetch(obtenerUrl(`producto/${idProducto}`), {
      method: "PUT",
      headers,
      body,
    })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // delete /pdto/:idProducto
  static deleteProducto(idProducto) {
    return fetch(obtenerUrl(`producto/${idProducto}`), {
      method: "DELETE",
      headers,
    })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // get /talleres
  static getTalleres(opciones = {}) {
    const queryParams = new URLSearchParams({});

    if (opciones.filtroNombre) {
      queryParams.set("nombre", opciones.filtroNombre);
    }

    return fetch(obtenerUrl("talleres?" + queryParams), { headers })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // get /taller/:idTaller
  static getTaller(idTaller) {
    return fetch(obtenerUrl(`taller/${idTaller}`), { headers })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // post /taller
  static postTaller(body) {
    return fetch(obtenerUrl("taller"), { method: "POST", headers, body })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // put /taller/:idTaller
  static putTaller(
    idTaller,
    nombre,
    precio,
    descripcion,
    img,
    fecha,
    hora,
    cupos,
    disponibles
  ) {
    const body = JSON.stringify({
      nombre,
      precio,
      descripcion,
      img,
      fecha,
      hora,
      cupos,
      disponibles,
    });
    return fetch(obtenerUrl(`taller/${idTaller}`), {
      method: "PUT",
      headers,
      body,
    })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // delete /taller/:idTaller
  static deleteTaller(idTaller) {
    return fetch(obtenerUrl(`taller/${idTaller}`), {
      method: "DELETE",
      headers,
    })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }
}
