import {
  obtenerValorInput,
  imprimir,
  /*   validarSesion, 
  validarAccesoBackoffice,*/
} from "./utils/helpers.js";
import { RequestsAPI } from "./RequestsAPI.js";

/* validarSesion(); */
/* validarAccesoBackoffice(); */

const botonLogin = document.querySelector("#form-login-submit");
botonLogin.addEventListener("click", () => {
  const email = obtenerValorInput("form-login-email");
  console.log("email", email);
  const password = obtenerValorInput("form-login-password");
  console.log("password", password);

  RequestsAPI.login(email, password)
    .then((data) => {
      console.log("Datos recibidos:", data);
      sessionStorage.setItem("session", data.session);
      sessionStorage.setItem("usuario", data.email);
      document.location.replace("/index.html");
    })
    .catch((error) => {
      console.error(error);
      imprimir("form-login-error", "Usuario o contraseña incorrectos");
    });
});
