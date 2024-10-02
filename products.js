const productForm = document.getElementById('form');



productForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const form = event.target;
  saveOrder(form);

  window.location.href = 'cart.html';
});

function saveOrder(data) {
  const newOrder = {};

  Array.from(data.elements).forEach(element => {
    if (element.name) {
      if (element.value !== "0" && element.value !== "") {
        const key = element.name.split('_').join(' ');
        newOrder[key] = element.value;
      }
    }
  });


  if (Object.keys(newOrder).length !== 0) {
    localStorage.setItem('order', JSON.stringify(newOrder));
  }
}

async function getProducts(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (Object.keys(data).length !== 0) {
      localStorage.setItem('productsInfo', JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error('Error al encontrar la información de los productos:', error);
  }
}

getProducts('https://api-pizzeria.vercel.app/api/v1/products')
 .then(data => updateProductForm(data))
 .catch(error => console.log(error));

 function createProductElement(product) {
  
  const li = document.createElement('li');
  li.className = 'product';

    const label = document.createElement('label');
    label.textContent = product.nombre;

    li.appendChild(label);

    const stock = parseInt(product.stock);
    
    if (product.presentacion) {
      const select = createPresentationSelect(product, stock);

      if (select) {
        li.appendChild(select);
      } else {
        const outOfStock = createOutOfStockElement();
        li.appendChild(outOfStock);
      }
    } else { // si no existe ningun tipo de presentación
      if (stock > 0) {
        const select = createRegularSelect(product);
        li.appendChild(select);
      } else {
        const outOfStock = createOutOfStockElement();
        li.appendChild(outOfStock);
      }
    }
    return li;  
 }

 function updateProductForm(productsData) {
  const productsContainer = document.getElementById('products-list');

  const existingProducts = productsContainer.querySelectorAll('.product');
  if (existingProducts) {
    existingProducts.forEach(product => product.remove());
  }

  productsData.forEach(product => {
    const productElement = createProductElement(product);
    productsContainer.appendChild(productElement);
  });
}

function createPresentationSelect(product, stock) {
  const presentations = product.presentacion.split(",");
  const select = document.createElement("select");
  select.name = product.nombre;
  select.id = product.id_producto;

  let hasOptions = false;

  // Opción por defecto
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Seleccione presentación";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  select.appendChild(defaultOption);

  const dontCountStock = [ 'MASA x 140gr','MASA x 250gr', 'POLLO', 'MASA x 350gr', 'MASA x 450gr', 'MASA x 700gr'];

  presentations.forEach((presentation) => {
    const presentationValue = parseInt(presentation);
    if (dontCountStock.includes(product.nombre)) {
      const option = document.createElement("option");
      option.value = presentationValue;
      option.textContent = presentationValue > 1 ?`${presentationValue} ${product.categoria}s` : `${presentationValue} ${product.categoria}`;
      select.appendChild(option);
      hasOptions = true;
    } else if (stock >= presentationValue) {
      const option = document.createElement("option");
      option.value = presentationValue;
      option.textContent = presentationValue > 1 ?`${presentationValue} ${product.categoria}s` : `${presentationValue} ${product.categoria}`;
      select.appendChild(option);
      hasOptions = true;
    }
  });

  return hasOptions ? select : null;
}

function createOutOfStockElement() {
  const outOfStock = document.createElement('span');
  outOfStock.className = 'out-of-stock';
  outOfStock.textContent = 'No disponible';
  return outOfStock;
}

function createRegularSelect(product) {
  const select = document.createElement('select');
  select.name = product.nombre;
  select.id = product.id_producto;

  const stock = parseInt(product.stock);

  for (let i = 0; i <= stock; i++) {
      const option = document.createElement('option');
      option.value = i.toString();
      option.textContent = i.toString();
      select.appendChild(option);
  }

  return select;
}