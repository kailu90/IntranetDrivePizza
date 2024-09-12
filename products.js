const productForm = document.getElementById('form');

productForm.addEventListener('submit', function (event) {
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
