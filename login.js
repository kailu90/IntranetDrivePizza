const users = {
    "Admin": {
       sede : "Admin",
       password : "Admin2025",       
    },
    "MegaMall": {
       sede : "MEGAMALL",
       password : "Mega123",       
    },
    "Cañaveral": {
       sede : "CAÑAVERAL",
       password : "Caña123",       
    },
    "Cabecera": {
       sede : "CABECERA",
       password : "Cabe123",       
    },
    "Piedecuesta": {
       sede : "PIEDECUESTA",
       password : "Piede123",       
    },
    "Planta": {
       sede : "PLANTA",
       password : "Plantas123",       
    },
    "Unico": {
       sede : "UNICO",
       password : "Unico123",       
    },
};

// Función para validar usuario y contraseña
function validateLogin(event) {
    event.preventDefault();  // Prevenir el comportamiento por defecto del formulario
    
    // Obtener valores ingresados por el usuario
    const username = document.getElementById("login_user").value.trim();
    const password = document.getElementById("login_password").value.trim();
    
    // Obtener el elemento del mensaje de error
    const errorMessage = document.getElementById("login_error");
    
    // Ocultar el mensaje de error al iniciar la validación
    errorMessage.style.display = "none";

    // Validar que los campos no estén vacíos
    if (username === "" || password === "") {
        errorMessage.textContent = "Por favor ingrese usuario y contraseña.";
        errorMessage.style.display = "flex";
        return;
    }

    // Verificar si el usuario existe y la contraseña es correcta
    if (users[username] && users[username].password === password) {

        // Almacenar los datos del usuario en localStorage.

        localStorage.setItem("userdata", JSON.stringify(users[username]))

        // Redirigir a la página de home si la validación es correcta
        
        window.location.href = "home.html";
    } else {
        // Mostrar error si el usuario o la contraseña son incorrectos
        errorMessage.textContent = "Usuario o contraseña incorrectos.";
        errorMessage.style.display = "flex";
    }
}

// Asignar evento al formulario
document.getElementById("loginForm").addEventListener("submit", validateLogin);