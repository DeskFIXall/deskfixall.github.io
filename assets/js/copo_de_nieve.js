function snow() {
  // 1. Defina una plantilla de copo de nieve
  var flake = document.createElement('div');
  // Personaje de copo de nieve ❄❉❅❆✻✼❇❈❊✥✺
  flake.innerHTML = '❄';
  flake.style.cssText = 'position:fixed;color:#fff;';

  // Obtiene la altura de la página, que es equivalente a la posición del eje Y cuando caen los copos de nieve
  var documentHieght = window.innerHeight;
  // Obtenga el ancho de la página, use este número para calcular, el valor de la izquierda cuando comienza el copo de nieve
  var documentWidth = window.innerWidth;

  // Define la cantidad de milisegundos para generar un copo de nieve
  var millisec = 50;
  // 2, establece el primer temporizador, un temporizador periódico y genera un copo de nieve cada vez (milisegundos);
  setInterval(function() { // Una vez que se carga la página, el temporizador comienza a funcionar
      // Genera aleatoriamente el valor de left al principio de la caída del copo de nieve, que es equivalente a la posición del eje X al principio
      var startLeft = Math.random() * documentWidth;

      // Genera aleatoriamente el valor de left al final de la caída del copo de nieve, que es equivalente a la posición del eje X al final
      var endLeft = Math.random() * documentWidth;

      // Generar aleatoriamente el tamaño del copo de nieve
      var flakeSize = 5 + 20 * Math.random();

      // Genera aleatoriamente la duración de la caída de nieve
      var durationTime = 4000 + 7000 * Math.random();

      // Genera aleatoriamente la transparencia al comienzo de la caída del copo de nieve
      var startOpacity = 0.7 + 0.3 * Math.random();

      // Genera aleatoriamente la transparencia al final de la caída de los copos de nieve
      var endOpacity = 0.2 + 0.2 * Math.random();

      // Clonar una plantilla de copo de nieve
      var cloneFlake = flake.cloneNode(true);

      // Modifica el estilo por primera vez, define el estilo del copo de nieve clonado
      cloneFlake.style.cssText += `
              left: ${startLeft}px;
              opacity: ${startOpacity};
              font-size:${flakeSize}px;
              top:-25px;
                  transition:${durationTime}ms;
          `;

      // Empalmado en la página
      document.body.appendChild(cloneFlake);

      // Establecer el segundo temporizador, temporizador de una sola vez,
      // Cuando el primer temporizador genera copos de nieve y los muestra en la página, modifique el estilo de los copos de nieve para que se muevan;
      setTimeout(function() {
          // Modifica el estilo por segunda vez
          cloneFlake.style.cssText += `
                      left: ${endLeft}px;
                      top:${documentHieght}px;
                      opacity:${endOpacity};
                  `;

          // 4. Configure el tercer temporizador y elimine el copo de nieve cuando caiga.
          setTimeout(function() {
              cloneFlake.remove();
          }, durationTime);
      }, 0);

  }, millisec);
}
snow();