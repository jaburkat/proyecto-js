const btnLitrosPinturas = document.querySelector('.litrosPinturas');

// FUNCION CALCULAR LITROS DE PINTURAS SEGUN TIPO DE PINTURA PARA UN AREA DETERMINADA
function litrosPinturas() {
  const ancho = document.getElementById("ancho").value;
  const alto = document.getElementById("alto").value;
  const tipoPintura = document.getElementById("tipoPintura").value;
  const superficie = ancho * alto;
  let cantidadPintura;

  if (tipoPintura === "Látex") {
    cantidadPintura = superficie / 10;
  } else {
    cantidadPintura = superficie / 8;
  }

  const resultado = document.getElementById("resultado");

  resultado.innerHTML = `
    <div class="mt-3" id="resultado">
      <h3>Resultado:</h3>
      <p>Para <span id="superficie">${superficie.toFixed(2)}</span> metros cuadrados 📏</p>
      <p>Se necesitan <span id="litros">${cantidadPintura.toFixed(2)}</span> litros de pintura 🎨</p>
      <hr>
      <small>Te preparamos el color que quieras haciendo click 👉<a href="colores.html">aquí.</a></small>
    </div>
  `;
}

btnLitrosPinturas.addEventListener('click', litrosPinturas);
