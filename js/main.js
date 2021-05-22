"use strict";
// 2. BÚSQUEDA
// GLOBAL VAR. Arrays vacías para que se llenen con lo que añada la usuaria.
let series = []; // variable de datos que nos devuelve la API
let favorite = []; // array para almacenar las series favoritas

// Call to API. Obtener los datos de la API y guardarlos en JSON
const search = document.querySelector(".js-search");

function getSeries() {
  const inputValue = search.value;
  console.log(getSeries);
  fetch(`https://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json()) // Le pido en el primer then que devuelva la respuesta en json
    .then((data) => {
      let series = [];
      series = data; // guardo los datos en el array de series
      paintSeries(); // llamo a la función que pinta los datos en el HTML
      handleSearch(); // función escuchadora
    });
}

// Evitar el envío por defecto del input del formulario
function handleForm(ev) {
  ev.preventDefault();
}
search.addEventListener("submit", handleForm);

// Pintar los datos de la búsqueda de la usuaria en el HTML (recorro el array)
const listSeries = document.querySelector(".js-result");

function paintSeries() {
  let htmlCode = ""; // creo una array vacía para la tarjeta
  for (let serie of series) {
    let id = serie.show.id;
    let name = serie.show.name;
    let image = serie.show.image;
    // por cada show contenido en el resultado de la búsqueda hay que pintar una tarjeta donde mostramos:
    htmlCode = `<li class="js-card serieCard" id="${id}">`; // el id de la serie
    htmlCode += `<h3 class="js-name">${name}</h3>`; // muestra el nombre de la serie
    if (image === null) {
      htmlCode += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="no image available"/>`; // imagen por defecto para aquellas series que no tienen
    } else {
      htmlCode += `<img src="${image.medium} class= "serieImage" alt="Image ${name}`; // muestra la imagen de la serie
    }
    htmlCode += `</li>`;
    return htmlCode;
  }
  listSeries.innerHTML += htmlCode;
  console.log(listSeries);
}

// Evento listener al botón de búsqueda

const btnSearch = document.querySelector(".js-button");

function handleSearch() {
  getSeries();
}

btnSearch.addEventListener("click", handleSearch);

// 3. FAVORITOS.
const listFav = document.querySelector(".js-favorite");

// Funciones al ARRANCAR LA PÁGINA
