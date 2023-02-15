const label = document.getElementById("label");
const shoppingCart = document.getElementById("shopping-cart");

let cart = JSON.parse(localStorage.getItem("productsData")) || [];

// GENERAR TOTAL ITEMS EN ICONOCARRITO
const calculate = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = cart.map((p)=>p.item).reduce((x,y)=>x + y, 0);
};

// OBTENER DATOS DEL .JSON
let productsData = [];

const getData = async () => {
    try {
    const res = await fetch("../database/db.json");
    productsData = await res.json();
    generateCart ();
    } catch (error) {
        console.log(error);
    };
};

// CALCULAR PRECIO TOTAL DEL CARRITO
const totalPrice = () => {
    if (cart.length !== 0) {
      let totalPrice = cart
        .map((x) => {
          const { id, item } = x;
          let search = productsData.find((y) => y.id === id) || [];
          return item * search.price;
        })
        .reduce((x, y) => x + y, 0)
        .toFixed(2);
      label.innerHTML = `
          <h2 class="total-carrito">Total del carrito: $ ${totalPrice}</h2>
          <div class="text-center mt-4">
          <button class="btn btn-primary checkOut mb-3" id="buyBtn">Comprar</button>
          <button onClick="clearCart()" class="btn btn-danger removeAll mb-3">Vaciar</button></div>
          `;
      document
        .getElementById("buyBtn")
        .addEventListener("click", function () {
          showModal();
        });
    } else return;
  };
  

// GENERAR ITEMS CARRITO
let generateCart = () => {
    totalPrice();
    if (cart.length !==0){
        return shoppingCart.innerHTML = cart.map((c)=>{
            const {id, item} = c;
            let search = productsData.find((p)=>p.id === id) || [];
            const {img, name, price} = search;
            return `
            <div class="cart-item">
                <img width="100" src="../${img}" alt""><img/>
                <div class="details">
                    <div class="title-price-cart">
                        <h4 class="title-price">
                            <p class="m-0">${name} <i onClick="removeProduct(${id})" class="chau fa-solid fa-square-xmark fa-1x"></i></p>
                            <p class="cart-item-price m-0">$ ${price}</p>
                        </h4>
                    </div>
                    <div class="quantity">
                        <h4 class="m-0">Cantidad: ${item}</h4>
                        <i onClick="removeItem(${id})" class="menos fa-solid fa-square-minus fa-1x"></i>
                        <i onClick="addProduct(${id})" class="mas fa-solid fa-square-plus fa-1x"></i>
                    </div>
                    <h3 class="m-0">Total $ ${(item * price).toFixed(2)}</h3>
                </div>
            </div>`
        })
        .join ("");
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h3 class="text-center fw-bolder fs-2 mt-5 mb-5">Tu carrito está vacío 🛒</h3>
        <div class="d-flex justify-content-center">
            <a href="../index.html">
                <button class="btn btn-primary buttons mt-3 btn-lg">Volver</button>
            </a>
        </div>
        `;
    }
};

// AGREGAR PRODUCTO AL CARRITO
const addProduct = (id) => {
    let search = cart.find((p) => p.id === id);
    search === undefined 
    ? cart.push({
        id: id,
        item: 1,
    })
    : search.item += 1;
    
    calculate();
    generateCart();
    localStorage.setItem("productsData", JSON.stringify(cart));
};

// REMOVER UN ITEM DEL CARRITO
const removeItem = (id) => {
    let search = cart.find((p) => p.id === id);
    if(search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    };
    cart = cart.filter((p) => p.item !==0);
    calculate();
    generateCart();
    localStorage.setItem("productsData", JSON.stringify(cart));
};

// REMOVER TOTAL DE ITEMS DE UN PRODUCTO DEL CARRITO
const removeProduct = (id) => {
    cart = cart.filter((p) => p.id !== id);
    calculate();
    generateCart();
    localStorage.setItem("productsData", JSON.stringify(cart));
};

// VACIAR CARRITO
const clearCart = () => {
    cart = [];
    calculate();
    generateCart();
    localStorage.setItem ("productsData", JSON.stringify(cart));
};


// FUNCIONES
calculate();
getData();