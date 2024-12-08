import {
  obtenerValorInput,
  imprimir,
  validarSesion,
} from "../utils/helpers.js";
import { RequestsAPI } from "../RequestsAPI.js";

validarSesion();

const botonLogin = document.querySelector("#form-login-submit");

botonLogin.addEventListener("click", () => {
  const email = obtenerValorInput("form-login-email");
  const password = obtenerValorInput("form-login-password");

  RequestsAPI.login(email, password)
    .then((data) => {
      sessionStorage.setItem("session", data.session);
      sessionStorage.setItem("email", JSON.stringify(data.email));

      document.location.replace("index.html");
    })
    .catch((error) => {
      console.error(error);
      imprimir("form-login-error", "Usuario o contraseña incorrectos");
    });
});
