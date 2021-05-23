"use strict";
// 2. BÚSQUEDA
// GLOBAL VAR. Arrays vacías para que se llenen con lo que añada la usuaria.
let series = []; // array vacío para llenar con los datos de la API
let favorite = []; // array para almacenar las series favoritas

// Call to API. Obtener los datos del API y guardarlos en JSON
const search = document.querySelector(".js-search");

const getFromApi = () => {
  const inputValue = search.value;

  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`) // para construir la URL de búsqueda hay que recoger el texto que ha introducido la usuaria en el campo de búsqueda
    .then((response) => response.json()) // Le pido en el primer then que devuelva la respuesta en json
    .then((data) => {
      series = data; // guardo los datos en el array de series
      paintSeries(); // llamo a la función que pinta los datos en el HTML
    });
};

// Guardar los datos de la búsqueda en un array.
const listSeries = document.querySelector(".js-result");
const defaultImage =
  "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";

const getSerieHtmlCode = (serie) => {
  let htmlCode = ""; // creo una array vacía para la tarjeta
  // por cada show contenido en el resultado de la búsqueda hay que pintar una tarjeta donde mostramos:
  htmlCode += `<article class="serieCard"`;
  htmlCode += `<id="${serie.show.id}">`;
  htmlCode += `<h3>${serie.show.name}</h3>`; // muestra el nombre de la serie
  if (serie.show.image === null) {
    htmlCode += defaultImage; // imagen por defecto para aquellas series que no tienen
  } else {
    htmlCode += `<img src="${serie.show.image.medium} class= "serieImage" alt="Image ${serie.show.name}`; // muestra la imagen de la serie
  }
  htmlCode += `</article>`;
  return htmlCode;
};

// Pinto en el HTML.
const paintSeries = () => {
  let seriesCode = "";
  for (const serie of series) {
    seriesCode += getSerieHtmlCode(serie);
  }
  listSeries.innerHTML = seriesCode;
};

// Evento listener al botón de búsqueda
const btnSearch = document.querySelector(".js-button");

function handleSearch() {
  getFromApi();
}

btnSearch.addEventListener("click", handleSearch);

// 3. FAVORITOS.
const listFav = document.querySelector(".js-favorite");

// Funciones al ARRANCAR LA PÁGINA
debugger;
getFromApi();
