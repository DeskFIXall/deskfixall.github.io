let menu = document.querySelector('#menu-icon i');
let navlist = document.querySelector('.navlist');

menu.onclick = () =>{
    navlist.classList.toggle('open');
    if (menu.classList.contains('fa-bars')) { 
        menu.classList.remove('fa-bars');
        menu.classList.add('fa-close');
    }else menu.classList.add('fa-bars');
}

window.onscroll = () =>{
    navlist.classList.remove('open');
    if (menu.classList.contains('fa-close')) { 
        menu.classList.remove('fa-close');
        menu.classList.add('fa-bars');
    }
}
