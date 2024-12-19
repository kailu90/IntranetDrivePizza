const users = {
    "CarlosZ": "Carlos123",
    "MegaMall": "Mega123",
    "Cañaveral": "Caña123",
    "Cabecera": "Cabe123",
    "Piedecuesta": "Piede123",
    "Acropolis": "Acro123",
    "Planta": "Planta123",
    "Unico": "Unico123"
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
    if (users[username] && users[username] === password) {
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