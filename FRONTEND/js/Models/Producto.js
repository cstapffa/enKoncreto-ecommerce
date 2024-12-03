export default class Producto {
  id;
  nombre;
  categoria;
  precio;
  descripcion;
  img;
  tags;
  color;

  constructor(
    id = 0,
    nombre = "",
    categoria = "",
    precio = "",
    descripcion = "",
    img = "",
    tags = [],
    color = []
  ) {
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;
    this.descripcion = descripcion;
    this.img = img;
    this.tags = tags;
    this.color = color;
  }

  mostrarPdtoEnCatalogo() {
    return `
      <article id="${this.id}" class="item-pdto">
        <img src="${this.img}" alt="${this.nombre}" title="${this.nombre}"/>
        <h3>${this.nombre}</h3>
        <p>${this.precio}</p>
      </article>
    `;
  }

  mostrarPdtoDetalle() {
    return `
      <div id="${this.id}">
        <img src="${this.img}" alt="${this.nombre}" title="${this.nombre}"/>
        <h3>${this.nombre}</h3>
        <p>${this.precio}</p>
        <p>${this.descripcion}</p>
        <p>${this.color}</p>
      </div>
    `;
  }
}
