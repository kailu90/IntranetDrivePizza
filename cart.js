const productsList = document.getElementById('list');
const productsCount = document.getElementById('total-amount');
const totalPriceParagraph = document.getElementById('valor-neto-amount');
const finalPriceParagraph = document.getElementById('valor-servicio-amount');
const sedeParagraph = document.getElementById('sede-name');
const deliberyDateParagraph = document.getElementById('delibery-date');
const commentParagraph = document.getElementById('comment');
const listContainer = document.getElementById('table-body');

let products = 0;
let localStorageData;
let orderWithPrices;

if (localStorage.getItem('order')) {
  localStorageData = localStorage.getItem('order');
  const order = Object.entries(JSON.parse(localStorageData));

  const storageApiData = localStorage.getItem('productsInfo');
  const productsInfo = Object.entries(JSON.parse(storageApiData));
  const dataCorrected = productsInfo.map(product => {
    const corrected = [product[0], {...product[1], name: product[1].nombre.trim()}];
    return corrected;
  })
  console.log(dataCorrected);

  if (dataCorrected) {
    cart(order, dataCorrected);
  }
}

function cart(order, apiData) {
  let totalPrice = 0;

  order.forEach((keyValue, current) => {
    if (keyValue[0] === "SEDE") {
      sedeParagraph.textContent = keyValue[1];
    } else if (keyValue[0] === "FECHA ENTREGA") {
      deliberyDateParagraph.textContent = keyValue[1];      
    } else if (keyValue[0] === "OBSERVACIONES") {
      commentParagraph.textContent = keyValue[1];
    } else {
      const item = document.createElement('tr');
      
      const itemName = document.createElement('td');
      itemName.textContent = keyValue[0];
      
      const count = document.createElement('td');
      count.textContent = keyValue[1];
      
      let quantityPrice;
      
      apiData.forEach(product => {
        if (product[1].nombre === keyValue[0]) {
          const productPrice = parseFloat(product[1].precio.split('$').join('').split('.').join('').trim());
          
          const priceTimesQuantity = productPrice * parseInt(keyValue[1]);
          
          const formattedPrice = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2 
  
          }).format(priceTimesQuantity);
          totalPrice += priceTimesQuantity;
          quantityPrice = document.createElement('td');
           quantityPrice.textContent = formattedPrice;
           order[current].push(formattedPrice);
           return;
          }
        })
        
        item.append(itemName, count, quantityPrice);
        listContainer.append(item);
        if (keyValue[0] !== "SEDE" && keyValue[0] !== "OBSERVACIONES" && keyValue[0] !== "FECHA ENTREGA") {
          products++;
        }
      }
      });
      
      let finalPrice = ((15 * totalPrice) / 100) + totalPrice;
      totalPriceParagraph.textContent = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2 
      }).format(totalPrice);
      finalPriceParagraph.textContent = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2 
      }).format(finalPrice);
      
      productsCount.textContent = products;
      
      orderWithPrices = {
        products: []
      }

      order.forEach(item => {
        if (item[0] === "SEDE") {
          orderWithPrices.SEDE = item[1];
        } else if (item[0] === "FECHA ENTREGA") {
          orderWithPrices['FECHA ENTREGA'] = item[1];
        } else if (item[0] === "OBSERVACIONES") {
          orderWithPrices['OBSERVACIONES'] = item[1];
        } else {
          orderWithPrices.products.push({name: item[0], quantity: item[1], totalPrice: item[2]});
        }
      });
      
      orderWithPrices.orderPrice = totalPrice;
      orderWithPrices.finalPrice = finalPrice;
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
    event.target.disabled = true;
    if (!orderWithPrices) {
      throw new Error("No se encontró el pedido en el localStorage");
    }
    console.log(orderWithPrices);
    await postData(orderWithPrices);

    window.location.href = 'envioOK.html';
  } catch (error) {
    console.error("Error al procesar el pedido: ",error);
  }
});