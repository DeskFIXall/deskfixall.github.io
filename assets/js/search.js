// Elements
const filesFilterInput = document.getElementById('filesFilter');
const texto = document.getElementById('texto');
const lastest = document.getElementById('lastest');
const files_container = document.getElementById('services-content');
const FILES_PER_PAGE = 8;
let filteredFiles = database.files.slice(); // copia completa inicialmente
let currentPage = 1;
let pagination = document.getElementById('pagination');

// Función para renderizar una página con paginación
renderPage = (page) => {
    files_container.innerHTML = '';
    texto.innerHTML = '';

    const startIndex = (page - 1) * FILES_PER_PAGE;
    const endIndex = startIndex + FILES_PER_PAGE;
    const pageFiles = filteredFiles.slice(startIndex, endIndex);

    if (pageFiles.length === 0) {
        texto.innerHTML = 'Not found anything.';
        lastest.innerHTML = '<a target="_blank" href="ftp.html"><i class="fa fa-folder-open" title="Redirect to page"></i> Click to more files in ftp mode.</a>';
        pagination.remove();
        return;
    }

    pageFiles.forEach(file => {
        const articleItem = document.createElement('article');
        articleItem.classList.add('item-service');
        articleItem.innerHTML = `
                    <a target="_blank" href="${file.image}" title="📷 Click to view.">
                        <img src='assets/images/loading.webp'
                             data-src="${file.image}" 
                             alt="${file.image}"
                             loading="lazy"
                             onload="if(this.dataset.src){this.src=this.dataset.src; delete this.dataset.src;}"
                             onerror="this.onerror=null;this.src='assets/images/unlink.webp' "/>
                    </a>
                        <div class="layer">
                            <p class="name-search" title="${file.name}"><strong>${file.name}</strong></p></br>
                            <button class="addCart" onclick="addProduct( '${file.image}', '${file.name}' )">
                                <i class="fa fa-cart-plus"></i> <strong>Add to Cart</strong>
                            </button>                                
                        </div>
                    `;
                    
        files_container.appendChild(articleItem);
    });

    renderPaginationControls();
}

// Mostrar los controles de paginación
renderPaginationControls = () => {
    if (!pagination) {
        pagination = document.createElement('div');
        pagination.id = 'pagination';
        pagination.style.marginTop = '10px';
        files_container.parentNode.insertBefore(pagination, files_container.nextSibling);
    }
    pagination.innerHTML = '';

    if (filteredFiles.length / FILES_PER_PAGE > 1){
            const prevButton = document.createElement('button');
            prevButton.textContent = 'Previous';
            prevButton.disabled = currentPage === 1;
            if (prevButton.disabled) prevButton.classList.add('disabled');
            prevButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderPage(currentPage);
                }
            });
            pagination.appendChild(prevButton);

            // Info página
            const pageInfo = document.createElement('span');
            pageInfo.textContent = ` Page ${currentPage} of ${Math.ceil(filteredFiles.length / FILES_PER_PAGE)} `;
            pageInfo.style.margin = '0 10px';
            pagination.appendChild(pageInfo);

            // Botón siguiente
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.disabled = currentPage >= Math.ceil(filteredFiles.length / FILES_PER_PAGE);
            if (nextButton.disabled) nextButton.classList.add('disabled');

            nextButton.addEventListener('click', () => {
                if (currentPage < Math.ceil(filteredFiles.length / FILES_PER_PAGE)) {
                    currentPage++;
                    renderPage(currentPage);
                }
            });
            pagination.appendChild(nextButton);
    }
}

// Filtrar, actualizar lista y reiniciar paginación
filesFilterInput.addEventListener('input', () => {
    search(filesFilterInput);
});

// Filtrar, actualizar lista y reiniciar paginación
search = (filter) => {
    lastest.innerHTML = '<a target="_blank" href="ftp.html"><i class="fa fa-folder-open" title="Redirect to page"></i> Click to more files in ftp mode.</a>';
    const filterValue = filter.value.toLowerCase();
    filteredFiles = database.files.filter(file => file.name.toLowerCase().includes(filterValue));
    currentPage = 1;

    if (filterValue === '') {
       return renderEightFiles();
    }
     renderPage(currentPage);
}

// Función para obtener n elementos aleatorios sin repetición de un array
getRandomItems = (arr, n) => {
    const result = [];
    const taken = new Set();
    n = Math.min(n, arr.length); // No exceder la cantidad disponible

    while (result.length < n) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        if (!taken.has(randomIndex)) {
            taken.add(randomIndex);
            result.push(arr[randomIndex]);
        }
    }

    return result;
}

// Render inicial: mostrar 8 archivos aleatorios sin filtro
renderEightFiles = () => {
    lastest.innerHTML = `<i class="fa fa-calendar"></i> Random ${FILES_PER_PAGE} files:`;
    filteredFiles = getRandomItems(database.files, FILES_PER_PAGE);
    currentPage = 1;
    renderPage(currentPage);
}

// Lanzar al cargar
renderEightFiles();