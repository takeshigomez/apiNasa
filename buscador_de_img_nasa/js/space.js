
// const busqueda = document.getElementById("inputBuscar").value;

// const URL_API = "https://images-api.nasa.gov/search?={q}"
// const contenedor = document.getElementById("contenedor")
// const url = URL_API + busqueda
// const btn = document.getElementById("btnBuscar")

// btn.addEventListener('click', () => {
//     fetch(url)
//         .then(response => response.json())
//         .then(data => { console.log(data) })
//         .catch(error => {
//             console.error('Error:', error);

//         });

// })
// Obtener elementos del DOM
const searchInput = document.getElementById('inputBuscar');
const searchButton = document.getElementById('btnBuscar');
const imageResults = document.getElementById('contenedor');

// Función para realizar la búsqueda
function searchNASAImages() {
    const q = searchInput.value;
    if (!q) return;

    // Construir la URL de la API
    const apiUrl = `https://images-api.nasa.gov/search?q=${q}`;

    // Realizar la solicitud GET usando fetch
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Limpiar resultados anteriores
            imageResults.innerHTML = '';

            // Mostrar resultados
            const items = data.collection.items;
            if (items.length === 0) {
                imageResults.innerHTML = 'No se encontraron imágenes.';
            } else {
                items.forEach(item => {
                    const title = item.data[0].title;
                    const image = item.links[0].href;
                    const description = item.data[0].description;
                    const date = item.data[0].date_created;

                    // Crear elementos HTML para mostrar los resultados
                    const resultDiv = document.createElement('div');
                    resultDiv.classList.add('result');

                    const contenedorimg = document.createElement('div');   

                
                
                    const imageElement = document.createElement('img');
                    imageElement.src = image;

                    const titleElement = document.createElement('h2');
                    titleElement.textContent = title;

                    const descriptionElement = document.createElement('p');
                    descriptionElement.textContent = description;

                    const dateElement = document.createElement('p');
                    dateElement.textContent = `Fecha de creación: ${date}`;

                    // Agregar elementos al DOM
                    
                    contenedorimg.appendChild(imageElement);
                    resultDiv.appendChild(contenedorimg)
                    resultDiv.appendChild(titleElement);
                    resultDiv.appendChild(descriptionElement);
                    resultDiv.appendChild(dateElement);
                    imageResults.appendChild(resultDiv);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Asociar la función de búsqueda al botón
searchButton.addEventListener('click', searchNASAImages);