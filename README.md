
# Buscador de series

Esta aplicación web de búsqueda de series nos permite crear un listado de series favoritas y gestionarlas de manera intuitiva. 

![Captura de pantalla 2021-07-16 a las 11 20 15](https://user-images.githubusercontent.com/77678575/125924868-a9983fec-7e97-4e15-8a5e-954555035d9b.png)

### Requisitos

- Tener instalado git.
- Tener un editor de código.
- Para visualizar la página al momento necesitarás tener la extensión Go Live.

### Instalación del proyecto

Para poder utilizar el proyecto:

1. Descarga o clona el repositorio con ```git clone```.
2. Instala las dependencias con ```npm install```.
3. Arranca el proyecto con ```npm start```.

## Características

### Búsqueda 🔍

- La página consta de un formulario sencillo para realizar búsquedas por título. Para obtener resultados de las serie he utilizado la API pública http://www.tvmaze.com/api a través de una petición.
- La aplicación de búsqueda de series consta de dos partes:
1. Un campo de texto y un botón para buscar series por su título.
2. Un listado de resultados de búsqueda donde aparece el cartel de la serie y el título.
  
### Almacenamiento local 🗄️

- La página utiliza el localStorage para guardar un listado de series favoritas. De esta forma, al recargar la página la información estará de nuevo disponible.
  
### Pintado de resultados 📋

- Por cada resultado de búsqueda se pinta una tarjeta de serie, que incluye imagen y título.
- Si alguna serie devuelta por la API no tuviese imagen, se mostrará una imagen de recurso.

### Guardado de favoritos ❤️

Una vez aparecen los resultados de búsqueda, la usuaria puede indicar cuáles son sus series favoritas. Para ello, al hacer clic sobre una serie debe pasar lo siguiente:

- El color de fondo se intercambia, indicando que es una serie favorita
- Automaticamente, la serie seleccionada pasará a la parte izquierda de la pantalla, en el apartado de series favoritas.
- Las series favoritas siguen apareciendo a la izquierda aunque la usuaria realice otra búsqueda o actualice la página.
  
### Pintado de favoritos 📺

- El listado de series favoritas se mostrará siempre que tenga contenido guardado.
- Cada serie, además de mostrar su imagen y título, incluye un icono que permite eliminarla como favorita.
- Este listado incorpora un botón de "borrar todas".

### Borrar favoritos 💔

- Haciendo click sobre una serie destacada en amarillo entre los resultados de búsqueda. 
- Pulsando el botón "borrar todas" del listado de favoritas.
- Pulsando el icono de borrado individual en cada serie favorita.


### Enlace de la página: https://rociogarrido.github.io/series-finder/

Actualmente el ejercicio no es responsive.

Rocío Garrido Añón ☺
