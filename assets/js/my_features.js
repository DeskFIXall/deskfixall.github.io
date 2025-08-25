/*-- Root */
var telegram_user = 'DeskFixAll';
var callUser = "tg://resolve?domain=" + telegram_user +  "&text=Hello, I am interested in "


// Verificar imagen de PCB
function verificarImagen(urlImagen, onSuccess, onError) {
    const img = new Image();

    img.onload = function() {
        onSuccess();
    };
    
    img.onerror = function() {
        console.clear();
        onError();
    };
    
    img.src = urlImagen;    
}

// Dialog View Image
function mostrarDialog(){
    var windowHeight = document.body.clientHeight;
    var content = document.getElementById('viewfile_content');

    content.style.height = (windowHeight - 80) + 'px';
    content.style.top = '30px';

    var lightbox = document.getElementById('viewfile_lightbox');

    lightbox.style.opacity = 0;
    lightbox.style.display = 'block';

    var op = 0;
    var fadeInInterval = setInterval(function() {
        if (op >= 1){
            clearInterval(fadeInInterval);
        }
        lightbox.style.opacity = op;
        op += 0.1; // ajusta la velocidad
    }, 30);
        
}		

// CallPay
function pay(archive){
    window.open(callUser + " " + archive, "_blank"); 
}


// Call image PCB
function imageView(nombreArchivo){			
    const file = nombreArchivo.slice(0, nombreArchivo.lastIndexOf('.'));
    let fileName = file;
    let url = "./images/" + file + ".webp";
    const img = document.getElementById('file');
    const titleDialogView = document.getElementById('titleDialogView');
    const linkFullImage = document.getElementById('full');
    const pay_button = document.getElementById('pay_button');

    verificarImagen(url,
    () => {
        img.src = url;
        titleDialogView.innerText = fileName;
        linkFullImage.href = url;
        pay_button.href = callUser + " " + file;
        mostrarDialog();        
    },
    () => {
        alert("The boardview image of: " + fileName + " is not available at the moment. \n\nPlease contactme for Telegram.");
    });
}