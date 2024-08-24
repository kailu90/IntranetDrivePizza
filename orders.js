document.getElementById('btn_edit').addEventListener('click', function() {
    window.location.href = 'products.html';
    console.log("botón editar")
  });

  
  document.getElementById('btn_confirm').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'envioOK.html';
    console.log("botón confirmar pedido")
  });