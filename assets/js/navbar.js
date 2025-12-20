// Objects
const menu = document.querySelector('#menu-icon i');
const navlist = document.querySelector('.navlist');


// Change menu icon on click
menu.onclick = () =>{
    navlist.classList.toggle('open');
    if (menu.classList.contains('fa-bars')) { 
        menu.classList.remove('fa-bars');
        menu.classList.add('fa-close');
    }else menu.classList.add('fa-bars');
}

// Reset menu icon on scroll
window.onscroll = () =>{
    navlist.classList.remove('open');
    if (menu.classList.contains('fa-close')) { 
        menu.classList.remove('fa-close');
        menu.classList.add('fa-bars');
    }
}