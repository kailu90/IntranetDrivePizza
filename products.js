const productForm = document.getElementById('form');

productForm.addEventListener('submit', function (event) {
 event.preventDefault();
 
 const form = event.target;
 const order = saveOrder(form);
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
