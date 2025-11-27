const scrollUp = document.querySelector('.scrollup');
const header = document.querySelector("header");

// Scroll button
window.addEventListener("scroll", function() {
    if (window.scrollY > 100) {
        scrollUp.style.display = 'block'; // Mostrar
    } else {
        scrollUp.style.display = 'none'; // Ocultar
    }
});

document.addEventListener("DOMContentLoaded", function(){
    header.classList.remove("sticky");
});

window.addEventListener("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 100);
});
