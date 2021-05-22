"use strict";

// Constantes para enlazar con los elementos del HTML.
const search = document.querySelector(".js-search");
const btnSearch = document.querySelector(".js-button");
const listFav = document.querySelector(".js-favorite");
const listSeries = document.querySelector(".js-result");

// Arrays vacías para que se llenen con lo que añada la usuaria.
let series = []; // variable de datos que nos devuelve la API
let favorite = []; // array para almacenar las series favoritas

// Obtener los datos de la API y guardarlos en JSON
function getSeries() {
  const inputValue = search.value;
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json()) // Le pido en el primer then que devuelva la respuesta en json
    .then((data) => {
      series = data; // guardo los datos en el array de series
      paintSeries(); // llamo a la función que pinta los datos en el HTML
    });
}

// Pintar los datos de la búsqueda de la usuaria en el HTML (recorro el array)
function paintSeries() {
  let htmlCode = ""; // creo una array vacía para la tarjeta
  for (i = 0; i < series.length; i++) {
    let id = series[i].show.id;
    let name = series[i].show.name;
    let image = series[i].show.image;
    // por cada show contenido en el resultado de la búsqueda hay que pintar una tarjeta donde mostramos:
    htmlCode = `<li class="js-card" id="${id}">`; // el id de la serie
    htmlCode += `<h3 class="js-name">${name}</h3>`; // muestra el nombre de la serie
    if (image === null) {
      htmlCode += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="no image avaliable"/>`; // imagen por defecto para aquellas series que no tienen
    } else {
      htmlCode += `<img src="${image.medium} class= "js-image" alt="Image ${name}`; // muestra una imagen de la serie
    }
    htmlCode += `</li>`;
  }
  listSeries.innerHTML += htmlCode;
}

// Evento listener al botón de búsqueda

btnSearch.addEventListener("click", getSeries);

// Funciones al ARRANCAR LA PÁGINA

getSeries();
