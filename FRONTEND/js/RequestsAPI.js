// obtener url es una función que recibe una ruta y retorna la url completa de la ruta que se le pase.
const obtenerUrl = (ruta) => `${RequestsAPI.urlBaseBackend}/${ruta}`;

// headers es un objeto que contiene las cabeceras que se enviarán en las peticiones fetch.
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

// token es una constante que contiene el token de la sesión que se obtiene del sessionStorage.
const token = sessionStorage.getItem("session");

// Si token existe, se añade al objeto headers la cabecera authorization con el valor del token.
if (token) {
  headers.authorization = token;
}

// procesarRespuesta es una función que recibe una respuesta y retorna la respuesta en formato json. Si la respuesta contiene un error, se lanza una excepción con el mensaje de error.
const procesarRespuesta = (res) => {
  return res.json().then((data) => {
    if (data.error) {
      throw new Error(data?.error);
    }

    return data;
  });
};

// manejarErrores es una función que recibe un error y muestra un mensaje de error en la consola. Luego, lanza una excepción con el mensaje de error.
const manejarErrores = (error = new Error("Error desconocido")) => {
  console.error("Ha ocurrido un error:", error.message);
  throw error.message;
};

// RequestsAPI es una clase que contiene las funciones que se encargan de realizar las peticiones fetch al backend de manera ordenada y centralizada.
export class RequestsAPI {
  static urlBaseBackend = "http://localhost:3000";

  // post /login
  static login(email, password) {
    const body = JSON.stringify({ email, password });

    return fetch(obtenerUrl("login"), { method: "POST", body, headers })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // post /logout
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

  static getProductosByType(tipoProducto) {
    return fetch(obtenerUrl(`productos/${tipoProducto}`), { headers })
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
    tags,
    color
  ) {
    const body = JSON.stringify({
      nombre,
      categoria,
      precio,
      descripcion,
      img,
      tags,
      color,
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
    hora
  ) {
    const body = JSON.stringify({
      nombre,
      precio,
      descripcion,
      img,
      fecha,
      hora,
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
