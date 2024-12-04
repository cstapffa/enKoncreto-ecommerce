export default class Taller {
    id;
    nombre;
    precio;
    descripcion;
    img;
    fecha;
    hora;
  
    constructor(
      id = 0,
      nombre = "",
      precio = "",
      descripcion = "",
      img = "",
      fecha = "",
      hora = ""
    ) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.descripcion = descripcion;
      this.img = img;
      this.fecha = fecha;
      this.hora = hora;
    }
  
    mostrarTallerEnCatalogo() {
      return `
        <article id="${this.id}" class="item-taller">
          <img src="${this.img}" alt="${this.nombre}" title="${this.nombre}"/>
          <h3>${this.nombre}</h3>
          <p>${this.fecha} | ${this.hora}</p>
        </article>
      `;
    }
  
    mostrarDetalle() {
      return `
        <div id="${this.id}">
          <img src="${this.img}" alt="${this.nombre}" title="${this.nombre}"/>
          <h3>${this.nombre}</h3>
          <p>${this.fecha}</p>
          <p>${this.hora}</p>
          <p>${this.descripcion}</p>
          <p>$${this.precio}</p>
        </div>
      `;
    }
  }