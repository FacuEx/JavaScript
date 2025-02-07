// Objetos y Arrays. Métodos de Arrays. 
// Funciones y condicionales.--
// Generacion del DOM de forma dinAmica. Eventos.
// Sintaxis avanzada.
// Al menos una libreria de uso relevante para el proyecto.
// Manejo de promesas con fetch. 
// Carga de datos desde un JSON local o desde una API externa.


//-------------------------------------------------------------------LOGIN-------------------------------------------------------------------

// Variables globales
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const rememberMeCheckbox = document.getElementById("rememberMe");
const usernameInput = document.getElementById("username");
const messageDiv = document.getElementById("message");
const recPassForm = document.getElementById("recPassForm");
const resetPassForm = document.getElementById("resetPassForm");
const maxIntentos = 3; // Límite de intentos
let intentosFallidos = 0; // Contador de intentos
let historialUsuarios = JSON.parse(localStorage.getItem("historialUsuarios")) || [];

if (resetPassForm) {
    resetPassForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const codigo = document.getElementById("codigo").value.trim();
        const newPassword = document.getElementById("newPassword").value.trim();
        const messageDiv = document.getElementById("message");

        try {
            const response = await fetch("http://localhost:3000/resetpass", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, codigo, newPassword })
            });

            const data = await response.json();
            console.log("Respuesta del servidor (Restablecer):", data);

            messageDiv.textContent = data.message;
            messageDiv.style.color = response.ok ? "green" : "red";

            if (response.ok) {
                setTimeout(() => {
                    window.location.href = "index.html"; // Redirigir al login después del restablecimiento
                }, 2000);
            }
        } catch (error) {
            console.error("Error al restablecer la contraseña:", error);
            messageDiv.textContent = "Error al restablecer la contraseña. Intenta nuevamente.";
            messageDiv.style.color = "red";
        }
    });
}

if (recPassForm) {
    recPassForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const messageDiv = document.getElementById("message");

        try {
            const response = await fetch("http://localhost:3000/recuperar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            messageDiv.textContent = data.message;
            messageDiv.style.color = response.ok ? "green" : "red";

        } catch (error) {
            console.error("Error al recuperar contraseña:", error);
            messageDiv.textContent = "Error al recuperar la contraseña, intenta nuevamente.";
            messageDiv.style.color = "red";
        }
    });
}

// Función para cargar el usuario desde localStorage
function cargarUsuarioRecordado() {
    const usuarioRecordado = localStorage.getItem("usuarioRecordado");
    if (usuarioRecordado && usernameInput) {
        usernameInput.value = usuarioRecordado;
        rememberMeCheckbox.checked = true;
    }
}

// Función para mostrar mensajes en pantalla
function mostrarMensaje(mensaje, tipo) {
    messageDiv.classList.remove("success", "error");
    messageDiv.classList.add(tipo === "success" ? "success" : "error");
    messageDiv.textContent = mensaje;

    setTimeout(() => {
        messageDiv.textContent = "";
    }, 3000);
}

// Evento de carga de página
window.onload = function () {
    cargarUsuarioRecordado();
    mostrarHistorialUsuarios();
};

// Manejo del Login
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const usuario = usernameInput.value.trim();
        const password = document.getElementById("password").value.trim();

        if (rememberMeCheckbox.checked) {
            guardarUsuarioRecordado(usuario);
        } else {
            borrarUsuarioRecordado();
        }

        // Verificar si el usuario está bloqueado
        if (intentosFallidos >= maxIntentos) {
            mostrarMensaje("Has alcanzado el número máximo de intentos. Intenta más tarde.", "error");
            guardarHistorialUsuario(usuario, false);
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario, password })
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data);

            if (response.ok) {
                mostrarMensaje(`Bienvenido, ${usuario}!`, "success");
                guardarHistorialUsuario(usuario, true);
                localStorage.setItem("intentosFallidos", 0); // Reiniciar intentos si es exitoso
                setTimeout(() => {
                    window.location.href = "dashboard.html"; // Redirige si el login es exitoso
                }, 2000);
            } else {
                intentosFallidos++; // Incrementar intentos fallidos
                localStorage.setItem("intentosFallidos", intentosFallidos);
                const intentosRestantes = maxIntentos - intentosFallidos;
                mostrarMensaje(`Usuario o contraseña incorrectos. Intentos restantes: ${intentosRestantes}`, "error");

                if (intentosFallidos >= maxIntentos) {
                    mostrarMensaje("Demasiados intentos fallidos. Intenta de nuevo en 20 segundos.", "error");
                    desactivarFormulario();
                }
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            mostrarMensaje("Error al iniciar sesión, intenta nuevamente.", "error");
        }
    });
}

// Función para bloquear el formulario
function desactivarFormulario() {
    usernameInput.disabled = true;
    document.getElementById("password").disabled = true;
    document.querySelector("button[type='submit']").disabled = true;

    setTimeout(() => {
        usernameInput.disabled = false;
        document.getElementById("password").disabled = false;
        document.querySelector("button[type='submit']").disabled = false;
        intentosFallidos = 0; // Reiniciar intentos después de 20 segundos
        localStorage.setItem("intentosFallidos", 0);
        mostrarMensaje("Puedes intentar nuevamente.", "success");
    }, 20000); // Bloqueo por 20 segundos
}

// Manejo del Registro
if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombreCompleto = document.getElementById("nombreCompleto").value.trim();
        const usuario = document.getElementById("usuario").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmarPassword = document.getElementById("confirmarPassword").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const mensaje = document.getElementById("mensaje");

        mensaje.textContent = ""; // Limpiar mensaje anterior

        // Validar que las contraseñas coincidan antes de enviar el formulario
        if (password !== confirmarPassword) {
            mensaje.textContent = "Las contraseñas no coinciden.";
            mensaje.style.color = "red";
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombreCompleto, usuario, password, email, phone })
            });

            const data = await response.json();
            console.log("Respuesta del servidor (Registro):", data);

            if (response.ok) {
                mensaje.textContent = data.message;
                mensaje.style.color = "green";
                setTimeout(() => {
                    window.location.href = "index.html"; // Redirige al login despues del registro
                }, 2000);
            } else {
                mensaje.textContent = data.message;
                mensaje.style.color = "red";
            }
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            mensaje.textContent = "Error en el registro, intenta nuevamente.";
            mensaje.style.color = "red";
        }
    });
}

// Funciones auxiliares
function guardarUsuarioRecordado(usuario) {
    localStorage.setItem("usuarioRecordado", usuario);
}

function borrarUsuarioRecordado() {
    localStorage.removeItem("usuarioRecordado");
}

function desactivarFormulario() {
    usernameInput.disabled = true;
    document.getElementById("password").disabled = true;
    document.querySelector("button[type='submit']").disabled = true;

    setTimeout(() => {
        usernameInput.disabled = false;
        document.getElementById("password").disabled = false;
        document.querySelector("button[type='submit']").disabled = false;
        intentosFallidos = 0;
        mostrarMensaje("Puedes intentar nuevamente.", "success");
    }, 20000);
}

function guardarHistorialUsuario(usuario, exito) {
    const historialUsuarios = JSON.parse(localStorage.getItem("historialUsuarios")) || [];

    const registro = {
        usuario: usuario || "desconocido",
        exito: exito,
        fecha: new Date().toLocaleString(),
    };

    historialUsuarios.push(registro);
    localStorage.setItem("historialUsuarios", JSON.stringify(historialUsuarios));
}

function mostrarHistorialUsuarios() {
    const historial = JSON.parse(localStorage.getItem("historialUsuarios")) || [];
    console.log("Historial de usuarios:", historial);
}

// contraseña
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

if (passwordInput && togglePassword) {
    togglePassword.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text"; // Mostrar contraseña
            togglePassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        } else {
            passwordInput.type = "password"; // Ocultar contraseña
            togglePassword.innerHTML = '<i class="fa-solid fa-eye"></i>'; 
        }
    });
}
