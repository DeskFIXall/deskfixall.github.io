/*-- Root */
var telegram_user = 'DeskFixAll';
var callUser = `tg://resolve?domain=${telegram_user}&text=🖐🏻 Hello, I am interested in pay💳 for`
var grados = 0;
var zoom = 100;

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
    window.open(`${callUser} ${archive}`, "_blank"); 
}

// Call image PCB
function imageView(nombreArchivo){			
    const file = nombreArchivo.slice(0, nombreArchivo.lastIndexOf('.'));
    const ext = nombreArchivo.toLowerCase();
    let fileName = file;
    let url = "./images/" + file + ".webp";
    const urlPDF = "./assets/pdfView.png";
    const img = document.getElementById('file');
    const titleDialogView = document.getElementById('titleDialogView');
    const linkFullImage = document.getElementById('full');
    const pay_button = document.getElementById('pay_button');

    if (ext.includes('pdf')){
        url = urlPDF;
    }

    verificarImagen(url,
    () => {
        img.src = url;
        linkFullImage.href = url;
        titleDialogView.innerText = fileName;
        pay_button.href = callUser + " " + file;
        mostrarDialog();        
    },
    () => {
        alert(`The resource image 📷 of: ${fileName} is not available😥 at the moment. \n\n🤝Please contactme for Telegram. `);
    });
}

// Copy Text
function copiarAlPortapapeles(texto) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto)
      .then(() => {
        alert('✅ Link copied! ');
      })
      .catch(err => {
        console.error('⛔️ Link error: ', err);
      });
  } 
}

// Button Copy URL boardview image
document.getElementById('btnCopy').addEventListener('click', () => {
  const img = document.getElementById('file');
  if (img) {
    const filename = document.getElementById('titleDialogView').textContent;
    copiarAlPortapapeles("```🌐: https://deskfixall.github.io``` " + "```" + filename + "``` " +
                         "```👤Contactme: @" + telegram_user + "``` " + img.src);
  }
});

// Rotate
function rotar(){
    const img = document.getElementById('file');
    grados = grados + 90 ;  // Siempre aumenta 90 grados
    if (grados > 270){ grados = 0 }
    img.style.transform = `rotate(${grados}deg)`; // Aplicar la rotación    
}

// Zoom in
const zoom_in = document.getElementById('zoom_in');
zoom_in.addEventListener('click', 
    () => {
        const img = document.getElementById('file');
        zoom = zoom - 10;
        if (zoom > 10) img.style.width = `${zoom}%`;
    }
);
// Zoom out
const zoom_out = document.getElementById('zoom_out');
zoom_out.addEventListener('click', 
    () => {
        const img = document.getElementById('file');
        zoom = zoom + 10;
        if (zoom < 100) img.style.width = `${zoom}%`;
    }
);


