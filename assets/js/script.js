// Typewriter
const words = ["Motherboards.","Graphics Cards.", "Schematics.","Boardviews.","Notebooks." ];
const text = document.querySelector('.text-services');

i = 0, j = 0, del = false;

function type(){
    text.textContent = words[i].slice(0, del ? --j : ++j) + ' | ';

    if (!del && j == words[i].length){
        return setTimeout(()=> del = true, 300, type());
    }
    if (del && j == 0){
        del = false, i = (i + 1) % words.length;
    }
    setTimeout(type, 80);
}
type();

const submit_telegram = document.querySelector('.submit-telegram');

// Form objects
const fullname = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');

// labels
const name_label = document.getElementById('label_name');
const email_label = document.getElementById('label_email');
const message_label = document.getElementById('label_message');


// Send Message to Telegram
submit_telegram.addEventListener('click', () =>{

    // Reset fields
    let danger = 'border:red 2px solid';
    fullname.removeAttribute('style', danger);
    email.removeAttribute('style', danger);
    message.removeAttribute('style', danger);
    
    // Check write fields
    if (!checkInput(fullname, name_label) ) fullname.setAttribute('style', danger);
    if (!checkEmail(email, email_label) ) email.setAttribute('style', danger);
    if (!checkInput(message, message_label) ) message.setAttribute('style', danger);

    // Sending message
    if (checkInput(fullname, name_label) && checkInput(message, message_label) && checkEmail(email, email_label)){
        let send_message = `🖐🏻Hello friend, I'm writing to you from your website.\n
        👤 My name is: [  ${fullname.value} ]\n
        📧 My email is: [ ${email.value} ]\n
        ✉️ My message is: 
        [ ${message.value} ]`;
        window.location.href = `tg://resolve?domain=DeskFIXall&text=${encodeURIComponent(send_message)}`;
    }
});

// Check fields
checkInput = (input, label) => {
    if (input.value === ''){
        label.innerText = 'Your must be complete this field.';
        return false; 
    }
    label.innerText = '';
    return true; 
}

// Check email
checkEmail = (email, label) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[^,s@]+.[a-zA-Z]{2,}$/;

    if (email.value.trim() === ''){
        label.innerText = 'Your email is blank.';
        return false;
    }

    if (!emailRegex.test(email.value)) {
        label.innerText = 'Your email is not correct.';
        return false;
    } 
    resetColor(email);
    return true;
}

// Remove all danger borders 
fullname.addEventListener('input', function(){
    name_label.innerText = '';
    resetColor(this);
});
email.addEventListener('input', function(){
    email_label.innerText = '';
    resetColor(this);
});
message.addEventListener('input', function(){
    message_label.innerText = '';
    resetColor(this);
});

// Reset color
resetColor = (object) =>{
    object.removeAttribute('style', 'border:red 2px solid');
};