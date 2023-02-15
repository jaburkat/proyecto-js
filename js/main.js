const products = document.getElementById ("products");
let cart = JSON.parse(localStorage.getItem("productsData")) || [];

// OBTENER DATOS DEL .JSON
let productsData = [];

const getData = async () => {
    try {
    const res = await fetch("./database/db.json");
    productsData = await res.json();
    generateProducts ();
    } catch (error) {
        console.log(error);
    };
};

// GENERAR GRILLAS DE PRODUCTOS
let generateProducts = () => {
    return (products.innerHTML = `
        <div class="d-flex flex-wrap justify-content-center align-items-center mt-3 mb-5">
            ${productsData.map((p)=>{
                const {id, name, description, price, img} = p;
                return `
                <div id="product-id-${id}" class="item col-lg-2 mb-2 me-2 ">
                <div class="card ">
                    <img src="${img}" class="card-img-top" alt="img not found">
                    <div class="card-body">
                        <div class="card-title">${name}</div>
                        <div class="card-text">
                            <p class="description">${description}</p>
                            <p class="price">$ ${price}</p>
                            <button onClick="addProduct(${id})" class="btn btn-primary">Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
            })
            .join("")}
        </div>
    `);
};

// CALCULAR TOTAL DE PRODUCTOS DEL CARRITO
const calculate = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = cart.map((p)=>p.item).reduce((x,y)=>x + y, 0);
};

// AGREGAR PRODUCTOS AL CARRITO
const addProduct = (id) => {
    let search = cart.find((p) => p.id === id);
    search === undefined
    ? cart.push({
        id: id,
        item: 1,
    })
    : search.item +=1;
        
    calculate();
    let productToast = productsData.find ((p) => p.id===id);
    Toastify({
        text: `Producto agregado al carrito:\n${productToast.name}\n$ ${productToast.price}`,
        duration: 2000,
        gravity: 'bottom',
        position: 'center',
        className: 'notification',
        style: {
            background: "#686963",
            color: "#fff",
        },
    }).showToast();

    localStorage.setItem("productsData", JSON.stringify(cart));
};

// LOGO
const logo = document.querySelector('.logo');

logo.addEventListener('mouseover', function() {
  this.style.transform = 'scale(1.2)';
});

logo.addEventListener('mouseout', function() {
  this.style.transform = 'scale(1)';
});

// FUNCIONES
getData();
calculate();





