/* Creación de clase Personaje */
class Personaje {
  constructor(nombre, estatura, peso) {
    this.nombre = nombre;
    this.estatura = estatura;
    this.peso = peso;
  }
}

/* Función para obtener los datos de un personaje desde la API */
const getPersonaje = async (id) => {
  try {
    const response = await fetch(`https://swapi.dev/api/people/${id}/`);
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }
    const data = await response.json();
    const personaje = new Personaje(data.name, data.height, data.mass);
    return personaje;
  } catch (error) {
    console.error(error);
  }
};

/* Generador de personajes */
function* personajes(inicio, termino) {
  let contador = inicio;
  while (contador <= termino) {
    yield getPersonaje(contador);
    contador++;
  }
}

/* Función para cargar los datos de un personaje en el contenedor */
const cargarDatos = (personaje, contenedor, color) => {
  contenedor.innerHTML += `
    <div class="single-timeline-content d-flex wow fadeInLeft 2021 col-4" data-wow-delay="0.3s" style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
      <div class="timeline-icon" style="background-color: ${color};"><i class="fa fa-address-card" aria-hidden="true"></i></div>
      <div class="timeline-text">
        <h6>${personaje.nombre}</h6>
        <p>Estatura: ${personaje.estatura}. Peso: ${personaje.peso} kg.</p>
      </div>
    </div>
  `;
};

/* Función para cargar los personajes en el contenedor al hacer hover */
const cargarPersonajes = async (inicio, fin, contenedor, color) => {
  contenedor.innerHTML = ""; // Limpiamos el contenido existente en el contenedor

  const generador = personajes(inicio, fin);
  let resultado = generador.next();

  while (!resultado.done && resultado.value) {
    const personaje = await resultado.value;
    cargarDatos(personaje, contenedor, color);
    resultado = generador.next();
  }

  if (resultado.done) {
    console.log("No hay más elementos por mostrar.");
  }
};

/* Eventos para cargar los personajes en los contenedores */
const contenedorPrincipal = document.getElementById("contenedor");
const contenedorSecundarios = document.getElementById("contenedorsegundo");
const contenedorOtros = document.getElementById("contenedortercero");

const primero = document.getElementById("primero");
primero.addEventListener("mouseenter", () => {
  cargarPersonajes(1, 5, contenedorPrincipal, "salmon");
});
primero.addEventListener("mouseleave", () => {
  contenedorPrincipal.innerHTML = "";
});

const segundo = document.getElementById("segundo");
segundo.addEventListener("mouseenter", () => {
  cargarPersonajes(6, 11, contenedorSecundarios, "lightgreen");
});
segundo.addEventListener("mouseleave", () => {
  contenedorSecundarios.innerHTML = "";
});

const tercero = document.getElementById("tercero");
tercero.addEventListener("mouseenter", () => {
  cargarPersonajes(12, 17, contenedorOtros, "lightskyblue");
});
tercero.addEventListener("mouseleave", () => {
  contenedorOtros.innerHTML = "";
});
