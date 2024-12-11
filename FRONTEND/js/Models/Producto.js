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
          <div class="btn btn-fav"></div>
          <img src="${this.img}" alt="${this.nombre}" title="${this.nombre}"/>
          <div>
            <h3>${this.nombre}</h3>
            <div class="d-flex justify-content-between align-items-baseline">
              <p>$${this.precio}</p>
              <button class="btn btn-secondary">COMPRAR</button>
            </div>
          </div>
        </article>
    `;
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
