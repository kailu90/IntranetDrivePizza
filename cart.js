const productsList = document.getElementById('list');
const productsCount = document.getElementById('total-amount');
let products = 0;
let localStorageData;

if (localStorage.getItem('order')) {
  localStorageData = localStorage.getItem('order');
  const order = Object.entries(JSON.parse(localStorageData));
  console.log(order)
  
  cart(order);
}

function cart(order) {
  order.forEach(keyValue => {
    const item = document.createElement('li');
    item.classList = "car_product car_subtitle_container";
    
    const itemName = document.createElement('p');
    itemName.classList = "car_subtitle";
    itemName.textContent = keyValue[0];
    
    const count = document.createElement('p');
    count.classList = "product_amount";
    count.textContent = keyValue[1];
    
    const deleteBtn = document.createElement('button');
    const imageBtn = document.createElement('img');
    imageBtn.src = "./Imagenes/papelera.png";
    
    deleteBtn.append(imageBtn);
    item.append(itemName, count, deleteBtn);
    productsList.append(item);
    
    if (keyValue[0] !== "SEDE" && keyValue[0] !== "OBSERVACIONES" && keyValue[0] !== "Para que día es el pedido?") {
      products++;
    }
  });
  
  productsCount.textContent = products;
  
}

async function postData(orderData) {
  try {
    const response = await fetch("https://api-pizzeria.vercel.app/api/v1/orders", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });
    
    if(!response.ok) {
      throw new Error(`error status: ${respond.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
   console.error(error);
  } 
}
 
document.getElementById('btn_edit').addEventListener('click', function(event) {
  event.preventDefault(); // Evita el comportamiento predeterminado del botón
  history.back(); // Regresa a la página anterior sin refrescar
  console.log("botón editar");
});

document.getElementById('btn_confirm').addEventListener('click', async function(event) {
  event.preventDefault();

  try {
    const order = JSON.parse(localStorage.getItem('order'));
    if (!order) {
      throw new Error("No se encontró el pedido en el localStorage");
    }
    await postData(order);

    window.location.href = 'envioOK.html';
  } catch (error) {
    console.error("Error al procesar el pedido: ",error);
  }
});