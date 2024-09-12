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
    orders.forEach(order => {
      const tr = document.createElement('tr');

      const sede = document.createElement('td');
      sede.textContent = order[1].SEDE;

      const deliveryDate = document.createElement('td');
      deliveryDate.textContent = order[1]['Para que día es el pedido?'];

      const sent = document.createElement('td');
      sent.textContent = "Esperando";

      const anchorsContainer = document.createElement('td');

      const print = document.createElement('a');
      print.textContent = "Ver";

      const archive = document.createElement('a');
      archive.textContent = "Archivar";

      anchorsContainer.append(print, "|", archive);

      tr.append(sede, deliveryDate, sent, anchorsContainer);
      ordersList.append(tr);
    })
  })
  .catch(error => console.error('Error:', error));
