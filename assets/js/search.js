// Elements
const filesFilterInput = document.getElementById('filesFilter');
const texto = document.getElementById('texto');
const lastest = document.getElementById('lastest');
const files_container = document.getElementById('services-content');
const FILES_PER_PAGE = 8;
let filteredFiles = database.files.slice(); // copia completa inicialmente
let currentPage = 1;


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
        return;
    }

    pageFiles.forEach(file => {
        const articleItem = document.createElement('article');
        const text = 'tg://resolve?domain=DeskFixAll&text=🖐🏻 Hello, I am interested in pay💳 for '
        articleItem.classList.add('item-service');
        articleItem.innerHTML = `
                    <a target="_blank" href="${file.image}" title="📷 Click to view ${file.image}">
                        <img src="${file.image}" alt="${file.image}" loading="lazy"/>
                    </a>
                        <div class="layer">
                            <p class="name-search"><strong>${file.name}</strong></p></br>
                            <a style="text-decoration: none" href="${text} ${file.name}">💳Pay Now</a>                                
                        </div>
                    `;
        files_container.appendChild(articleItem);
    });

    renderPaginationControls();
}

// Mostrar los controles de paginación
renderPaginationControls = () => {
    let pagination = document.getElementById('pagination');
    if (!pagination) {
        pagination = document.createElement('div');
        pagination.id = 'pagination';
        pagination.style.marginTop = '10px';
        files_container.parentNode.insertBefore(pagination, files_container.nextSibling);
    }
    pagination.innerHTML = '';

    // Botón anterior
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderPage(currentPage);
        }
    });
    pagination.appendChild(prevButton);

    // Info página
    const pageInfo = document.createElement('span');
    pageInfo.textContent = ` Page ${currentPage} de ${Math.ceil(filteredFiles.length / FILES_PER_PAGE)} `;
    pageInfo.style.margin = '0 10px';
    pagination.appendChild(pageInfo);

    // Botón siguiente
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.disabled = currentPage >= Math.ceil(filteredFiles.length / FILES_PER_PAGE);
    nextButton.addEventListener('click', () => {
        if (currentPage < Math.ceil(filteredFiles.length / FILES_PER_PAGE)) {
            currentPage++;
            renderPage(currentPage);
        }
    });
    pagination.appendChild(nextButton);
}

// Filtrar, actualizar lista y reiniciar paginación
filesFilterInput.addEventListener('input', () => {
    lastest.innerHTML = '<a target="_blank" href="ftp.html"><i class="fa fa-folder-open" title="Redirect to page"></i> Click to more files in ftp mode.</a>';
    const filterValue = filesFilterInput.value.toLowerCase();
    filteredFiles = database.files.filter(file => file.name.toLowerCase().includes(filterValue));
    currentPage = 1;
    if (filterValue === '') {
        renderLastEightFiles();
    } else {
        renderPage(currentPage);
    }
});

// Render inicial: últimos 8 archivos sin filtro
renderLastEightFiles = () => {
    lastest.innerHTML = '<i class="fa fa-calendar"></i> Lastest 8 files:';
    filteredFiles = database.files.slice(-8);
    currentPage = 1;
    renderPage(currentPage);
}

// Lanzar al cargar
renderLastEightFiles();