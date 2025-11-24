var originalTitle = document.title;


let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () =>{
    navlist.classList.toggle('open');
    if (menu.innerHTML == "x") { 
        menu.innerHTML = "≡"
    }else menu.innerHTML = "x";
}

window.onscroll = () =>{
    navlist.classList.remove('open');
    if (menu.innerHTML == "x") { 
        menu.innerHTML = "≡"
    }
}

