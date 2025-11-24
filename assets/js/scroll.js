const scrollUp = document.querySelector('.scrollup');

window.addEventListener("scroll", function() {
    if (window.scrollY > 100) {
        scrollUp.style.display = 'block'; // Mostrar
    } else {
        scrollUp.style.display = 'none'; // Ocultar
    }
});