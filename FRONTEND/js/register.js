import { obtenerValorInput, imprimir } from "./utils/helpers.js";
import { RequestsAPI } from "./RequestsAPI.js";

document
  .querySelector("#boton-register-submit")
  .addEventListener("click", () => {
    const nombre = obtenerValorInput("form-register-nombre");
    console.log("nombre", nombre);
    const apellido = obtenerValorInput("form-register-apellido");
    console.log("apellido", apellido);
    const email = obtenerValorInput("form-register-email");
    console.log("email", email);
    const password = obtenerValorInput("form-register-password");
    console.log("password", password);

    if (!nombre || !apellido || !email || !password) {
      imprimir("form-register-error", "Por favor, complete todos los campos.");
      return;
    }

    const body = JSON.stringify({ nombre, apellido, email, password });

    RequestsAPI.registrar(body)
      .then(() => {
        alert("Usuario registrado correctamente.");
        document.location.replace("/login.html");
      })
      .catch((error) => {
        imprimir("form-register-error", error);
      });
  });
