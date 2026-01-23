var urlPay = `tg://resolve?domain=DeskFixAll&text=🖐🏻 Hello, I am interested in pay💳 for: \n`

// Función para asignar el evento de eliminar a los botones
 function asignarEventoEliminar() {
       const botones = document.querySelectorAll('.btnEliminar');
       botones.forEach(boton => {
            boton.onclick = function() {
                    const fila = this.parentElement.parentElement; // td -> tr
                    fila.remove();
                    updateCartCount();
            };
        });
     }
    
// Ejecutar al cargar la página para los botones existentes
asignarEventoEliminar();

// Add row
function addProduct(imageProductURl, nameProdduct) {

    if (isExistProduct(nameProdduct)) {
        alert(`✅ The product [ ${nameProdduct} ] is already in the cart.`);
        return
    };

    const tabla = document.getElementById('cartTable');
    const nuevaFila = tabla.insertRow();

    const celdaImg = nuevaFila.insertCell();
    celdaImg.innerHTML = `<a target="_blank" href="${imageProductURl}"><img src="${imageProductURl}" alt="Product"/></a>`;
    
    const celdaProducto = nuevaFila.insertCell();
    celdaProducto.textContent = nameProdduct;
    celdaProducto.classList.add('producto-nombre');

    const celdaAccion = nuevaFila.insertCell();
    const btnRemove = document.createElement('button');
    btnRemove.innerHTML = '<i class="fa fa-trash"></i>';
    btnRemove.className = 'btnEliminar';
    btnRemove.setAttribute('title', 'Remove this product');
    celdaAccion.appendChild(btnRemove);

    // Asignar evento al nuevo botón
    btnRemove.onclick = () => {
        nuevaFila.remove();
    };

    asignarEventoEliminar();
    updateCartCount();
}


// Show / Hide Cart
const car_button = document.querySelector('.car-button');
const shopping_car = document.querySelector('.shopping-car');
car_button.addEventListener('click', () => {
    const style = window.getComputedStyle(shopping_car);
    if (style.display === 'none') {
        shopping_car.style.display = 'block';
    } else {
        shopping_car.style.display = 'none';
    }
});


// Count products
const updateCartCount = () => {
    const tbody = document.querySelector('table tbody');
    const count = tbody.querySelectorAll('tr').length;
    const requestCart = document.getElementById('requestCart');
    const countNumber = document.getElementById('countNumber');
    const message = document.querySelector('.shopping-car span');

    if (countNumber) countNumber.innerText = count;
    if (count > 0) {
        requestCart.setAttribute('style', 'display: inline');
        message.setAttribute('style', 'display: none');
    }else {
        requestCart.setAttribute('style', 'display: none');
        message.setAttribute('style', 'display: inline');
    }
    return count;
};


// Send request car
const requestCart = document.getElementById('requestCart');
requestCart.addEventListener('click', () => {
    const products = document.querySelectorAll('.producto-nombre');
    const setList = new Set();

    products.forEach(product => {
        const texto = product.innerText.trim();
        setList.add(texto);
    });

    const result = Array.from(setList).join(', ');

    window.location.href = urlPay + '```\n' + result + '\n' + '```' ;
})

// Check product

const isExistProduct = (requestProduct) =>{
    const tabla = document.getElementById('cartTable');
    const products = tabla.querySelectorAll('.producto-nombre');

    return Array.from(products).some(product => product.innerText.trim() === requestProduct.trim());

};
