"use strict";
// 2. BÚSQUEDA
// GLOBAL VAR. Arrays vacías para que se llenen con lo que añada la usuaria.
let series = []; // array vacío para llenar con los datos de la API
let favorite = []; // array para almacenar las series favoritas de la usuaria

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

const getSerieHtmlCode = (serie) => {
  let htmlCard = "";
  // por cada show contenido en el resultado de la búsqueda hay que pintar una tarjeta donde mostramos:
  htmlCard += `<li class="serieCard">`;
  htmlCard += `<data-id="${serie.show.id}">`;
  if (serie.show.image === null) {
    htmlCard += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="" class="serieImage" />`; // imagen por defecto para aquellas series que no tienen
  } else {
    htmlCard += `<img src="${serie.show.image.medium} class= "serieImage" alt="Image ${serie.show.name}/>`; // muestra la imagen de la serie
  }
  htmlCard += `<h3>${serie.show.name}</h3>`; // muestra el nombre de la serie
  htmlCard += `</li>`;
  return htmlCard;
};

// Pinto en el HTML.
const paintSeries = () => {
  let seriesCards = "";
  for (const serie of series) {
    seriesCards += getSerieHtmlCode(serie);
  }
  listSeries.innerHTML = seriesCards;
};

// Escuchar al evento click en botón de búsqueda
const btnSearch = document.querySelector(".js-button");

function handleSearch() {
  getFromApi();
}

btnSearch.addEventListener("click", handleSearch);

// 3. FAVORITOS. Una vez aparecen los resultados de la búsqueda, la usuaria puede indicar cuáles son sus series favoritas.
// Función para añadir a favoritos
const listFav = document.querySelector(".js-favorite");

const addToFav = (ev) => {
  ev.preventDefault();
  const clickedCard = parseInt(ev.currentTarget.id);
  const isFav = favorite.findIndex((elemId) => elemId.show.id === clickedCard);
  if (isFav === -1) {
    const favEl = series.find((serie) => serie.show.id === clickedCard);
    favorite.push(favEl);
  } else {
    alert("Esta serie ya está en favoritos");
  }
};

// Función para pintar el listado de las series favoritas
function paintFav() {
  let htmlFav = "";
  for (const htmlFav of favorite) {
    htmlFav += `<li class="serieFav">`;
    htmlFav += `<data-id="${serie.show.id}">`;
    if (serie.show.image === null) {
      htmlFav += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="" class="serieImage" />`;
    } else {
      htmlFav += `<img src="${serie.show.image.medium} class= "serieImage" alt="Image ${serie.show.name}/>`;
    }
    htmlFav += `<h3>${serie.show.name}</h3>`;
    htmlFav += `</li>`;
    listFav.innerHTML = htmlFav;
  }
}

// Funciones al ARRANCAR LA PÁGINA

getFromApi();
paintSeries();
