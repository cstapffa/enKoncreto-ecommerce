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
    hora = "",
    cupos = "",
    disponibles = ""
  ) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.img = img;
    this.fecha = fecha;
    this.hora = hora;
    this.cupos = cupos;
    this.disponibles = disponibles;
  }

  mostrarTallerEnCatalogo() {
    return `
        <article id="${this.id}" class="col-12 col-md-3 item-taller">
            <div class="text-center hoverDiv">
                <h3 class="mt-5">${this.nombre}</h3>
                <p>$${this.fecha} | ${this.hora}</p>
                <p>Alzáibar 1324, 11000 Montevideo, Departamento de Montevideo, Uruguay</p>
                <p>${this.descripcion}</p>
                          
              <div class="arrow d-lg-none"><img src="https://res.cloudinary.com/dpushmfs0/image/upload/v1733862633/arrow_hmqfcg.png" alt="bajar"></div>
            </div>
            <img
              src="${this.img}"
              alt="${this.nombre}"
              title="${this.nombre}"
            />
            <div class="text-center  d-flex flex-column justify-content-between align-items-center">
              <h3 class="mt-3">${this.nombre}</h3>
              <p>$${this.fecha} | ${this.hora}</p>
              <button class="btn btn-primary d-none d-lg-block">Ver más</button>
              <div class="arrow d-lg-none"><img src="https://res.cloudinary.com/dpushmfs0/image/upload/v1733862633/arrow_hmqfcg.png" alt="subir"></div>
            </div>
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

  mostrarProximoTaller() {
    return `
      <div class="row featurette">
      <article class="col-md-6 order-1 order-md-2 text-center text-md-start">
        <h2 class="featurette-heading fw-normal lh-1">PRÓXIMO TALLER</h2>
        <h3>${this.nombre}</h3>
        <p>${this.descripcion}</p>
        <p>${this.fecha} a las ${this.hora}</p>
        <p>$${this.precio}</p>
        <div class="d-flex flex-column flex-md-row">
          <button class="btn btn-primary">¡Inscribite YA!</button>
          <a id="/ampliacion-taller.html?id=${this.id}" class="btn btn-secondary">Ver Detalles</a>
        </div>
      </article>
      <figure class="d-none d-md-block col-md-6 order-2 order-md-1 d-flex">
      <img src="${this.img}" alt="${this.nombre}" title="${this.nombre}">
      </figure>
    </div>
      `;
  }
}
