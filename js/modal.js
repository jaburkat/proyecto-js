// MODAL
const showModal = () => {
    let count = 4;
    const modal = document.createElement("div");
    modal.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;">
        <div style="background-color: #DB5461; padding: 20px; color: #E0CA3C; border-radius: 10px;">
          <h2>¡Gracias por su compra! </h2>
          <p style="color: black;">Usted será redireccionado en <span id="count">${count}</span> segundos 🕑</p>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  
    const countElement = document.getElementById("count");
    const intervalId = setInterval(() => {
      count -= 1;
      countElement.innerText = count;
      if (count === 0) {
        clearInterval(intervalId);
        document.body.removeChild(modal);
        location.href = "https://jaburkat.github.io/proyecto-js/";
        clearCart(); 
      }
    }, 1000);
  };
  