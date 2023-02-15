// BUSQUEDA DE PRODUCTOS
const findProducts = () => {
    const input = document.querySelector("#findProducts");
    input.addEventListener("input", (e) => {
      let lowerCaseInput = e.target.value.toLowerCase();
      document.querySelectorAll(".item").forEach((el) => {
        if (el.textContent.toLowerCase().includes(lowerCaseInput)) {
          el.classList.remove("filter-product");
        } else {
          el.classList.add("filter-product");
        }
      });
    });
  };
  
  // FILTRO POR PRECIOS
  const filterByPrice = () => {
    const minPrice = priceRange.value;
    const maxPrice = priceRange.max;
    productsData.forEach((el) => {
      const price = el.price;
      if (price >= minPrice && price <= maxPrice) {
        document.getElementById(`product-id-${el.id}`).style.display = "block";
      } else {
        document.getElementById(`product-id-${el.id}`).style.display = "none";
      }
    });
  };
  priceRange.addEventListener('input', () => {
    minPriceDisplay.innerHTML = priceRange.value;
    filterByPrice();
  });
  
  
  // FILTRO POR CATEGORIAS
   const categorySelect = document.getElementById('categorySelect');
   const filterByCategory = () => {
    const categorySelect = document.querySelector("#categorySelect");
    const selectedCategory = categorySelect.value;
    productsData.forEach((el) => {
      if (selectedCategory === "all" || el.category === selectedCategory) {
        document.getElementById(`product-id-${el.id}`).style.display = "block";
      } else {
        document.getElementById(`product-id-${el.id}`).style.display = "none";
      }
    });
  };
  categorySelect.addEventListener('change', filterByCategory);
  
  // FILTRO POR COLOR
  const colorCheckboxes = document.querySelectorAll('.color-checkbox');
  const filterByColor = () => {
    const selectedColors = [];
    const colorCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    colorCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedColors.push(checkbox.value);
      }
    });
    productsData.forEach((el) => {
      if (selectedColors.length === 0 || selectedColors.includes(el.color)) {
        document.getElementById(`product-id-${el.id}`).style.display = "block";
      } else {
        document.getElementById(`product-id-${el.id}`).style.display = "none";
      }
    });
  };
  colorCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', filterByColor);
  });


// FILTROS RELACIONADOS
const filterProducts = () => {
  const minPrice = priceRange.value;
  const maxPrice = priceRange.max;
  const selectedCategory = categorySelect.value;
  const selectedColors = [];
  colorCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedColors.push(checkbox.value);
    }
  });

  let foundProducts = 0;

  productsData.forEach((el) => {
    const price = el.price;
    const category = el.category;
    const color = el.color;

    const priceFilter = price >= minPrice && price <= maxPrice;
    const categoryFilter = selectedCategory === "all" || category === selectedCategory;
    const colorFilter = selectedColors.length === 0 || selectedColors.includes(color);

    if (priceFilter && categoryFilter && colorFilter) {
      document.getElementById(`product-id-${el.id}`).style.display = "block";
      foundProducts++;
    } else {
      document.getElementById(`product-id-${el.id}`).style.display = "none";
    }
  });

  if (foundProducts === 0) {
    document.getElementById("no-products-found").style.display = "block";
  } else {
    document.getElementById("no-products-found").style.display = "none";
  }
};

priceRange.addEventListener('input', () => {
  minPriceDisplay.innerHTML = priceRange.value;
  filterProducts();
});

categorySelect.addEventListener('change', filterProducts);

colorCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', filterProducts);
});
  
  // BORRAR FILTROS
  const borrarFiltrosBtn = document.getElementById('borrarFiltrosBtn');
  borrarFiltrosBtn.addEventListener('click', borrarFiltros);
  
  function borrarFiltros() {
    priceRange.value = priceRange.min;
    minPriceDisplay.innerHTML = priceRange.min;
    categorySelect.value = "all";
    colorCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    
    productsData.forEach((el) => {
      document.getElementById(`product-id-${el.id}`).style.display = "block";
    });

    const noProductsFound = document.getElementById('no-products-found');
    noProductsFound.style.display = 'none';
  }
  

// FUNCIONES
findProducts();