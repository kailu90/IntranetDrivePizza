async function callApi(URL) {
    try {
      const respuesta = await fetch(URL);
      const datos = await respuesta.json();
      console.log(datos);
    } catch (error) {
        console.log(error);
    }
}

callApi("https://api-pizzeria.vercel.app/api/v1/products");

const productForm = document.getElementById('form');

productForm.addEventListener('submit', function (event) {
 event.preventDefault();
 
 const form = event.target;
 const order = createOrder(form);
 postData(order);
});

function createOrder(data) {
  console.log(data.elements)

  const newOrder = {};
  
  Array.from(data.elements).forEach(element => {
    if (element.name) {
      if (element.value !== "0") {
       const key = element.name.split('_').join(' ');
        newOrder[key] = element.value;
      }
    }
  });
  
  console.log(newOrder)

  return newOrder;
}

async function postData(orderData) {
 try {
  const respond = await fetch("https://api-pizzeria.vercel.app/api/v1/orders", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData)
  });
  
  if(!respond.ok) {
    throw new Error(`error status: ${respond.status}`);
  }

  const data = await respond.json();
  console.log(data);
 } catch (error) {
  console.error(error);
 } 
}

document.getElementById('btn_orders').addEventListener('click', function() {
  window.location.href = 'car.html';
  console.log("botón enviar orden")
});