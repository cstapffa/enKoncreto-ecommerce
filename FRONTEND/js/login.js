import {
  obtenerValorInput,
  imprimir,
} from "./utils/helpers.js";
import { RequestsAPI } from "./RequestsAPI.js";


const botonLogin = document.querySelector("#form-login-submit");
botonLogin.addEventListener("click", () => {
  const email = obtenerValorInput("form-login-email");
  const password = obtenerValorInput("form-login-password");

  RequestsAPI.login(email, password)
    .then((data) => {
      sessionStorage.setItem("session", data.session);
      localStorage.setItem("usuario", JSON.stringify(data.user));
      /* console.log("Datos del usuario logueado:", data.user); */
      alert("Sesión iniciada correctamente.");
      document.location.replace("/index.html");
    })
    .catch((error) => {
      console.error(error);
      imprimir("form-login-error", "Usuario o contraseña incorrectos");
    });
});
