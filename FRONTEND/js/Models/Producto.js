export default class Producto {
  id;
  nombre;
  categoria;
  precio;
  descripcion;
  img;

  constructor(
    id = 0,
    nombre = "",
    categoria = "",
    precio = "",
    descripcion = "",
    img = "",
  ) {
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;
    this.descripcion = descripcion;
    this.img = img;
  }

  mostrarPdtoEnCatalogo() {
    return `
      <article id="${this.id}" class="item-pdto">
        <img src="${this.img}" alt="${this.nombre}" title="${this.nombre}"/>
        <h3>${this.nombre}</h3>
        <p>$${this.precio}</p>
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
