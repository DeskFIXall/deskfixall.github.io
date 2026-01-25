// List products for SEO
const contenedor = document.getElementById('listado-articulos');

database.files.forEach(file => {
    const articulo = document.createElement('article');

    const titulo = document.createElement('h3');
    const enlace = document.createElement('a');
    enlace.href = file.image;
    enlace.textContent = `Boardview ${file.name}`;
    enlace.target = '_blank'; // abre la imagen en nueva pestaña
    enlace.rel = 'noopener noreferrer'; // recomendaciones de seguridad
    titulo.appendChild(enlace);
    articulo.appendChild(titulo);

    contenedor.appendChild(articulo);
});