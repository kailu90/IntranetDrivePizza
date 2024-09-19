const ordersList = document.getElementById('ordersContainer');

let orders = [];

async function getOrders(url) {
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
    return data;
  } catch (error) {
    console.error('Error al conectar con la API:', error);
  }
}

getOrders('https://api-pizzeria.vercel.app/api/v1/orders')
  .then(data => {
    orders = Object.entries(data);
    console.log(orders);
    orders.forEach(order => {
      const row = document.createElement('tr');

      const orderNumber = document.createElement('td');
      orderNumber.textContent = order[1]['ID PEDIDO'];
      
      const deliveryDate = document.createElement('td');
      deliveryDate.textContent = order[1]['FECHA ENTREGA'];
      
      const sede = document.createElement('td');
      sede.textContent = order[1].SEDE;

      const state = document.createElement('td');
      state.textContent = order[1].ESTADO;

      const anchorsContainer = document.createElement('td');

      const print = document.createElement('a');
      print.textContent = "Ver";

      const archive = document.createElement('a');
      archive.textContent = " Imprimir";

      anchorsContainer.append(print, "|", archive);

      const orderValue = document.createElement('td');
      orderValue.textContent = order[1].netCost;

      const totalOrderValue = document.createElement('td');
      totalOrderValue.textContent = order[1].costWithService;

      row.append(orderNumber, deliveryDate, sede, state, anchorsContainer, orderValue, totalOrderValue);

      ordersList.append(row);
    })
  })
  .catch(error => console.error('Error:', error));
