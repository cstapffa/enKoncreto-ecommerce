import mongoose from "mongoose";

const urlDB = process.env.MongoDB_URL;

export const conectarDB = () => {
  return mongoose
    .connect(urlDB)
    .then(() => {
      console.log("Conectado a la DB!");
    })
    .catch((error) => {
      // si hay un error, muestro un mensaje en consola
      console.log("Error conectando a la base de datos", error);
    });
};
