async function callApi(URL) {
    try {
      const respuesta = await fetch(URL) 
      const datos = await respuesta.json()
      console.log(datos) 
    } catch (error) {
        console.log(error)
    }
}

async(callApi("https://api-pizzeria.vercel.app/api/v1/products"))()

document.getElementById('login_form').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el envío del formulario por defecto
  window.location.href = 'products.html'; // Redirige a index.html
})