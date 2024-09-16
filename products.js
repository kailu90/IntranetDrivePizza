const productForm = document.getElementById('form');

getProducts('https://api-pizzeria.vercel.app/api/v1/products');

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
  } catch (error) {
    console.error('Error al encontrar la información de los productos:', error);
  }
}