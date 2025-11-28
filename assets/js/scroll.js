const scrollUp = document.querySelector('.scrollup');
const header = document.querySelector("header");

// Scroll button
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        scrollUp.style.display = 'block'; // Mostrar
    } else {
        scrollUp.style.display = 'none'; // Ocultar
    }
});

document.addEventListener("DOMContentLoaded", () =>{
    header.classList.remove("sticky");
});

window.addEventListener("scroll", () =>{
    header.classList.toggle("sticky", window.scrollY > 100);
});

scrollUp.addEventListener('click', () =>{
    window.location.href = "#";
});

