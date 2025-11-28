// Objects
const menu = document.querySelector('#menu-icon i');
const navlist = document.querySelector('.navlist');
const submit_telegram = document.querySelector('.submit-telegram');
const textarea = document.querySelector('#message');

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

// Send Message to Telegram
submit_telegram.addEventListener('click', function(){
    // Form objects
    const name = document.querySelector('#name');
    const email = document.querySelector('#email');
    const message = document.querySelector('#message');
  
    // labels
    const name_label = document.querySelector('#label_name');
    const email_label = document.querySelector('#label_email');
    const message_label = document.querySelector('#label_message');

    // Reset fields
    let danger = 'border:red 2px solid';
    name.removeAttribute('style', danger);
    email.removeAttribute('style', danger);
    message.removeAttribute('style', danger);
    
    // Check write fields
    if (!checkInput(name, name_label) ) name.setAttribute('style', danger);
    if (!checkInput(email, email_label) ) email.setAttribute('style', danger);
    if (!checkEmail(email, email_label) ) email.setAttribute('style', danger);
    if (!checkInput(message, message_label) ) message.setAttribute('style', danger);

    // Sending message
    if (checkInput(name, name_label) && checkInput(email, email_label) && checkInput(message, message_label) && checkEmail(email, email_label)){
        let send_message = `🖐🏻Hello friend, I'm writing to you from your website, my name is:[ 👤 ${name.value} ], and my email is:[ 📧 ${email.value} ]\n, my message is: [ ✉️ ${message.value} ].`;
        window.location.href = `tg://resolve?domain=DeskFIXall&text=${send_message}`;
    }
});

// Check fields
const checkInput = (input, label) => {
    if (input.value === ''){
        label.innerText = 'Your must be complete this field.';
        return false; 
    }
    label.innerText = '';
    return true; 
}

// Check email
const checkEmail = (email, label) => {
    const regex = /^[^s@]+@[^s@]+.[^s@]+.[^s@]+$/;
    if (!regex.test(email)) label.innerText = 'Your email is not correct.';
    return regex.test(email); 
}