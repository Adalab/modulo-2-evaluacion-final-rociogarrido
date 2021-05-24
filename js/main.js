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
  htmlCard += `<li class="js-serieCard serieCard" `;
  htmlCard += `data-id="${serie.show.id}">`;
  if (serie.show.image === null) {
    htmlCard += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="" class="serieImage" />`; // imagen por defecto para aquellas series que no tienen
  } else {
    htmlCard += `<img src="${serie.show.image.medium}" class= "serieImage" alt="Image ${serie.show.name}"/>`; // muestra la imagen de la serie
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
  addListeners();
};

// Escuchar al evento click en el botón "buscar"
const btnSearch = document.querySelector(".js-button");

function handleSearch() {
  getFromApi();
}

btnSearch.addEventListener("click", handleSearch);

// 3. FAVORITOS. Una vez aparecen los resultados de la búsqueda, la usuaria puede indicar cuáles son sus series favoritas.

// Función escuchadora, sobre la que hago click para agregar a favoritos
function addListeners() {
  console.log("entre");
  let allSerieCards = document.querySelectorAll(".js-serieCard");
  for (const serieCard of allSerieCards) {
    serieCard.addEventListener("click", addToFav);
  }
}

// Función para añadir la serie clicada al array "favorite"
const addToFav = (ev) => {
  const clickedCard = ev.currentTarget.dataset; // Añado un currentTarget a la tarjeta
  const clickedCardId = parseInt(clickedCard.id); // Identifico el ID de la tarjeta clicada.
  console.log(clickedCard);
  // Busco el elemento clicado por su ID. Si es el mismo, lo meto en la variable
  const foundSerie = series.find((serie) => serie.show.id === clickedCardId);
  // Busco si la serie clicada está en la lista de favoritas comparando ids
  console.log(favorite.length);
  const isFav = favorite.find(
    (favoriteId) => favoriteId.show.id === clickedCardId
  );

  // si la serie clicada no está en el array de favoritas
  if (isFav === undefined) {
    favorite.push(foundSerie); // la añadimos
  } else {
    favorite = favorite.filter(
      (favoriteId) => favoriteId.show.id !== clickedCardId
    );
  }
  keepInLocalStorage();
  paintFav();
};

// Función para pintar el listado de las series favoritas
const listFav = document.querySelector(".js-favorite");

const paintFav = () => {
  // creo la variable vacía para pintar en el HTML
  let htmlFav = "";
  // bucle para recorrer el array
  for (const favSerie of favorite) {
    htmlFav += `<li class="favCard">`;
    htmlFav += `<data-id="${favSerie.show.id}">`;
    if (favSerie.show.image === null) {
      htmlFav += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="" class="favImage" />`;
    } else {
      htmlFav += `<img src="${favSerie.show.image.medium}" class= "favImage" alt="Image ${favSerie.show.name}"/>`;
    }
    htmlFav += `<h3>${favSerie.show.name}</h3>`;
    htmlFav += `</li>`;
    // lo pinto en el HTML
    listFav.innerHTML = htmlFav;
  }
  addListeners();
};

/*function paintFav() {
  let htmlFav = getSerieHtmlCode(favorite, true);
  listFav.innerHTML = htmlFav;
}*/

// 4. ALMACENAMIENTO LOCAL
// Almacenar el listado de favoritas en el localStorage
const keepInLocalStorage = () => {
  localStorage.setItem("favorite", JSON.stringify(favorite));
};

// Recuperar la lista de favoritas del localStorage
const getFromLocalStorage = () => {
  favorite = JSON.parse(localStorage.getItem("favorite"));
  paintFav();
};

// Funciones al ARRANCAR LA PÁGINA

getFromApi();
paintSeries();
