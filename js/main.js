"use strict";
// 2. BÚSQUEDA
// GLOBAL VAR. Arrays vacías para que se llenen con lo que añada la usuaria.
let series = []; // array vacío para llenar con los datos de la API
let favorite = []; // array para almacenar las series favoritas

// Call to API. Obtener los datos de la API y guardarlos en JSON
const search = document.querySelector(".js-search");

function getFromApi() {
  const inputValue = search.value;
  console.log(inputValue);
  fetch(`https://api.tvmaze.com/search/shows?q=${inputValue}`) // para construir la URL de búsqueda hay que recoger el texto que ha introducido la usuaria en el campo de búsqueda
    .then((response) => response.json()) // Le pido en el primer then que devuelva la respuesta en json
    .then((data) => {
      series = data; // guardo los datos en el array de series
      paintSeries(); // llamo a la función que pinta los datos en el HTML
    });
}

// Pintar los datos de la búsqueda de la usuaria en el HTML (recorro el array)
const listSeries = document.querySelector(".js-result");

function paintSeries() {
  let htmlCode = ""; // creo una array vacía para la tarjeta
  for (const serie of series) {
    console.log(serie);
    // por cada show contenido en el resultado de la búsqueda hay que pintar una tarjeta donde mostramos:
    htmlCode += `<li class="serieCard" id="${serie.show.id}">`; // el id de la serie
    htmlCode += `<h3>${serie.show.name}</h3>`; // muestra el nombre de la serie
    if (serie.show.image === null) {
      htmlCode += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" class= "serieImage" alt="no image available"/>`; // imagen por defecto para aquellas series que no tienen
    } else {
      htmlCode += `<img src="${serie.show.image.medium} class= "serieImage" alt="Image ${serie.show.name}`; // muestra la imagen de la serie
    }
    htmlCode += `</li>`;
  }
  listSeries.innerHTML = htmlCode;
}

// Evento listener al botón de búsqueda
const btnSearch = document.querySelector(".js-button");

function handleSearch() {
  getFromApi();
}

btnSearch.addEventListener("click", handleSearch);

// 3. FAVORITOS.
const listFav = document.querySelector(".js-favorite");

// Funciones al ARRANCAR LA PÁGINA
