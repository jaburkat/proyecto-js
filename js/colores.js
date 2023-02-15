const colorPicker = document.getElementById("color-picker");
// SE INICIALIZA EN COLOR VIOLETA
colorPicker.value = "#c96bf5";
colorPicker.addEventListener("input", showColorPalette);

// SE INICIALIZA EN FALSE
let eventCreated = false;

function showColorPalette() {
    const color = colorPicker.value;
	// API THECOLORAPI
    fetch(`https://www.thecolorapi.com/scheme?hex=${color.slice(1)}&mode=monochrome&count=10`)
        .then(response => response.json())
        .then(data => {
            const colorPalette = document.getElementById("color-palette");
            colorPalette.innerHTML = "";

            const colors = data.colors.map(c => c.hex.value);
            const colorNames = data.colors.map(c => c.name.value);

            for (let i = 0; i < colors.length; i++) {
                const colorBlock = document.createElement("div");
                colorBlock.classList.add("color-block");
                colorBlock.style.backgroundColor = colors[i];

                const colorName = document.createElement("span");
                colorName.textContent = colorNames[i];

                colorBlock.appendChild(colorName);
                colorPalette.appendChild(colorBlock);
				// SELECCION CIRCULOS
                colorBlock.addEventListener("click", function() {
                    const selectedColor = document.querySelector(".selected");
                    if (selectedColor) {
                        selectedColor.classList.remove("selected");
                    }
                    colorBlock.classList.add("selected");
                });
            }
      		// EVENTO SUBMIT
            if (!eventCreated) {
                const form = document.querySelector("form");
                form.addEventListener("submit", function(event) {
                    event.preventDefault();

                    const liters = document.getElementById("liters").value;
                    const paintType = document.getElementById("paint-type").value;

                    const selectedColor = document.querySelector(".selected");
                    if (selectedColor) {
                        const colorName = selectedColor.querySelector("span").textContent;
                        sendColorViaWhatsApp(colorName, liters, paintType);
                    } else {
                        Toastify({
                            text: "Por favor selecciona un color.",
                            duration: 2000,
							gravity: 'bottom',
							position: 'center',
							className: 'notification',
							style: {
								background: "#686963",
								color: "#fff",
							},
						}).showToast();
                    }
                });

                eventCreated = true;
            }
        })
        .catch(error => console.log(error));
}

// FUNCION ENVIAR POR WHATSAPP
function sendColorViaWhatsApp(colorName, liters, paintType) {
	const message = encodeURIComponent(`Color: ${colorName}\nLitros: ${liters}\nTipo de pintura: ${paintType}`);
	const whatsappLink = `https://wa.me/?text=${message}`;
	window.open(whatsappLink);
  }
  
// FUNCIONES
  showColorPalette();
