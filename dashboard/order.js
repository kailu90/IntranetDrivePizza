const productsList = document.getElementById('list');
console.log(productsList);


const recivedOrders = JSON.parse(localStorage.getItem('recivedOrders'));
console.log(recivedOrders)

recivedOrders.forEach(order => {
  const data = Object.entries(order)
  console.log(data);
  data.forEach(keyValue => {
    console.log(keyValue);
  //   const item = document.createElement('li');
  // item.classList = "car_product car_subtitle_container";
  
  // const itemName = document.createElement('p');
  // itemName.classList = "car_subtitle";
  // itemName.textContent = keyValue[0];
  
  // const count = document.createElement('p');
  // count.classList = "product_amount";
  // count.textContent = keyValue[1];

  // item.append(itemName, count)

  // productsList.append(item) 

  })
})