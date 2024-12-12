export default class Producto {
  id;
  nombre;
  categoria;
  precio;
  descripcion;
  img;
  stock;
  oferta;

  constructor(
    id = 0,
    nombre = "",
    categoria = "",
    precio = "",
    descripcion = "",
    img = "",
    stock = 0,
    oferta = false
  ) {
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;
    this.descripcion = descripcion;
    this.img = img;
    this.stock = stock;
    this.oferta = oferta;
  }

  mostrarPdtoEnCatalogo() {
    return `
    <article id="${this.id}" class="col-5 col-md-3 item-pdto">
          <div class="btn btn-fav agregar-fav"></div>
          <img src="${this.img}" alt="${this.nombre}" title="${this.nombre}"/>
          <div>
            <h3>${this.nombre}</h3>
            <div class="d-flex justify-content-between align-items-baseline">
              <p>$${this.precio}</p>
              <button class="btn btn-secondary agregar-carrito">COMPRAR</button>
            </div>
          </div>
        </article>
    `;
  }

  mostrarAmpliacion() {
    return `<div id="${this.id}"  class="row">
          <figure class="col-12 col-md-6">
            <img
              class="bg-light img-fluid"
              src="${this.img}"
              alt="${this.nombre}" title="${this.nombre}"
            />
          </figure>
          <article class="col-12 col-md-6 d-flex flex-column justify-content-between">
            <div class="descripcion-ampliacion">
              <h1>${this.nombre}</h1>
              <h2>Descripción</h2>
              <p>${this.descripcion}</p>
              <h3 class="text-black">$${this.precio}</h3>
            </div>
            <div class="botones-ampliacion">
              <button class="btn btn-primary agregar-carrito">Añadir al Carrito</button>
              <button class="btn btn-secondary agregar-fav">Favoritos</button>
            </div>
          </article>
        </div>`;
  }

  mostrarDetalle() {
    return `
      <div id="${this.id}">
        <img src="${this.img}" alt="${this.nombre}" title="${this.nombre}"/>
        <h3>${this.nombre}</h3>
        <p>$${this.precio}</p>
        <p>${this.descripcion}</p>
        <p>${this.categoria}</p>
        <p>${this.tags}</p>
        <p>${this.color}</p>
      </div>
    `;
  }
}
