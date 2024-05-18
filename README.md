# TV Series Search App

Este proyecto es una aplicación de búsqueda de series de TV creada con Node.js y Express. La aplicación permite buscar series de TV en un archivo JSON y mostrar los resultados en una página web utilizando EJS para la vista y CSS para el estilo.

## Estructura del Proyecto

El proyecto tiene la siguiente estructura de carpetas y archivos:

myapp/
├── controller/
│ └── searchController.js
├── data/
│ └── data.json
├── public/
│ └── styles.css
├── views/
│ └── index.ejs
├── app.js
└── package.json


### Descripción de Archivos

- **controller/searchController.js**: Contiene las funciones necesarias para leer el archivo JSON y buscar series de TV.
- **data/data.json**: Archivo JSON que contiene los datos de las series de TV.
- **public/styles.css**: Archivo CSS para dar estilo a la página web.
- **views/index.ejs**: Vista principal de la aplicación.
- **app.js**: Archivo principal del servidor Express.

## Cómo se Creó el Proyecto

1. **Configuración del Servidor**: Se configuró un servidor Express en el archivo `app.js` que sirve la vista principal y un endpoint para buscar series en el archivo JSON.
2. **Vista con EJS**: Se creó un archivo `index.ejs` que contiene el HTML y un script JavaScript para realizar la búsqueda.
3. **Controlador**: Se añadió una carpeta `controller` con un archivo `searchController.js` que maneja la lógica de lectura y búsqueda en el archivo JSON.
4. **Estilos CSS**: Se añadió un archivo `styles.css` en la carpeta `public` para darle estilo a la página web.
5. **Archivo JSON**: Se creó un archivo `data.json` en la carpeta `data` con datos de series de TV.

### Código del Archivo `searchController.js`

```javascript
const path = require('path');
const fs = require('fs');

const searchItems = (searchQuery, callback) => {
    const filePath = path.join(__dirname, '..', 'data', 'data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }
        const jsonData = JSON.parse(data);
        const results = jsonData.filter(item => 
            item.name.toLowerCase().includes(searchQuery) ||
            item.description.toLowerCase().includes(searchQuery) ||
            item.genre.toLowerCase().includes(searchQuery) ||
            item.director.toLowerCase().includes(searchQuery)
        );
        callback(null, results);
    });
};

module.exports = {
    searchItems
};
