import {
  /* validarSesion, */
  validarAccesoBackoffice,
  obtenerValorInput,
  imprimir,
} from "./utils/helpers.js";
import { RequestsAPI } from "./RequestsAPI.js";

/* validarSesion(); */
validarAccesoBackoffice();

document
  .querySelector("#boton-register-submit")
  .addEventListener("click", () => {
    const nombre = obtenerValorInput("form-register-nombre");
    console.log("nombre", nombre);
    const apellido = obtenerValorInput("form-register-apellido");
    console.log("apellido", apellido);
    const email = obtenerValorInput("form-register-email");
    console.log("user", email);
    const password = obtenerValorInput("form-register-password");
    console.log("password", password);

    if (!nombre || !apellido || !email || !password) {
      imprimir("form-register-error", "Por favor, complete todos los campos.");
      return;
    }

    const body = JSON.stringify({ nombre, apellido, email, password });

    RequestsAPI.register(body)
      .then(() => {
        document.location.replace("login.html");
      })
      .catch((error) => {
        imprimir("form-register-error", error);
      });
  });
