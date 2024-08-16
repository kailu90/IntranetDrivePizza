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