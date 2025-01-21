
// let historialUsuarios = [];

// function loguear(identificar, intentos){

//   do{
//     let usuario = prompt("Ingrese su nombre de usuario");
//     let password = prompt("Ingrese su contraseña");

// //     //Caso de usuario y contraseña vacios
//     if(usuario == "" && password == ""){
//         alert("Vuelva a intentar en 15 minutos")
//             break;  
//     }
    
//     //Caso de usuario y contraseña correctos
//     if(usuario.toLowerCase() === "facundo" && password === "123456"){
//         alert(`Bienvenido a su cuenta ${usuario}`)
//         identificar = false;

//            //Historial de usuarios agrados
//     historialUsuarios.push({
//         usuario: usuario.toLowerCase(),
//         estado: "Aprobado",
//         fecha: new Date().toLocaleString()
//     });
//     break;
//     }

//     //Caso de usuario y contraseña incorrecto
//     intentos--;
//     if(intentos > 0){
//         alert(`Usuario o contraseña incorrectos. Le quedan ${intentos} itentos.`)
        
//     //Historial de intentos fallidos
//     historialUsuarios.push({
//         usuario: usuario.toLowerCase(),
//         estado: "Fallido",
//         fecha: new Date().toLocaleString(),
//     });
// }
//     else{
//         alert("Usted supero los tres intentos. Vuelva a intentar mas tarde.");
//             break;
//             }
//     }
//     while(identificar === true);
// }
//     //Busqueda
//     function buscarUsuario(nombre){
//         const resultado = historialUsuarios.filter(user => user.usuario === nombre.toLowerCase());
//         if (resultado.length > 0){
//             console.log(`Usuarios encontrados:`, resultado);
//         }else{
//             console.log("No se encontraron usuarios con ese nombre");
//         }
//     }
//     //Filtrado
//     function filtrarPorEstado(estado){
//         const resultado = historialUsuarios.filter(user => user.estado === estado);
//         if(resultado.length >0){
//             console.log(`Usuarios con estado '${estado}':`, resultado);
//         }else{
//             console.log(`No se encontraron usuarios con el estado '${estado}'.`);
//         }
//     }

// loguear(true, 3);

// buscarUsuario("facundo");
// filtrarPorEstado("Exito");
// filtrarPorEstado("Fallido");
// //--------------------------------------------+

// const users =[
//     {username: "facundo", password: "1234"},
//     {username: "admin", password: "admin123"}
// ];

//            //Caso de usuario y contraseña correctos
//            if(username.toLowerCase() === "facundo" && password === "123456"){
//             mensaje.textContent = (`Bienvenido a su cuenta ${usuario}`)
//             mensaje.style.color = "green";
//         }
//             identificar = false;

// //Elementos del DOM
// const loginForm = document.getElementById("login-form");
// const mensaje = document.getElementById("mensaje");

// //Envio de formulario
// loginForm.addEventListener("submit", (e) => {e.preventDefault();

//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;

//     //verificar credenciales
//     const user = users.find(
//         (u) => u.username === username && u.password === password);

//         if(user){
//             //guardar en localStorage
//             localStorage.setItem("loggedInUser", JSON.stringify(user));

//             //redirigir contenido adicional
//             setTimeout(() => {
//                 window.location.href = "dashboard.html;"
//             }, 1000);
//             }else{
//                 mensaje.textContent = "Usuario o Contraseña incorrectos."
//                 mensaje.style.color = "red"; 
//             }


// })
//-------------------------------------------------------------------------------------------------------------------------------
// const historialUsuarios = JSON.parse(localStorage.getItem('historialUsuarios')) || [];

// document.getElementById('loginForm');
// document.addEventListener('submit', function(e){e.preventDefault();
    
//     const usuario = document.getElementById('username').value.trim();
//     const password = document.getElementById('password').value.trim();
//     const mensaje = document.getElementById('mensaje');

//     let intentos = 3;
//     let identificar = true;

//     if(usuario === "" || password === ""){
//         mensaje.textContent = "Usuario y contraseña no pueden estar vacion. Intente nuevamente."
//     }

//     if(usuario.toLowerCase() === "facundo" && password === "123456"){
//         mensaje.textContent = `Bienvenido a su cuenta ${usuario}!`;
//         identificar = false;

//         //Historial aprobado
//         historialUsuarios.push({
//             usuario: usuario.toLowerCase(),
//             estado: "Aprovado",
//             fecha: new Date().toDateString(),
//         });

//         localStorage.setItem("historialUsuarios", JSON.stringify(historialUsuarios));
//     }
        
//         intentos--;
//         if(intentos > 0){
//             mensaje.textContent = `Usuario o contraseña incorrectos. Le quedan ${intentos} intentos`;
//         }else{
//             mensaje.textContent = "Ha superado los tres intentos. Intente mas tarde.";
//             identificar = false;
//         }
//             //Historial aprobado
//             historialUsuarios.push({
//                 usuario: usuario.toLowerCase(),
//                 estado: "Fallido",
//                 fecha: new Date().toDateString(),
//             });
    
//             localStorage.setItem("historialUsuarios", JSON.stringify(historialUsuarios));

//     }
// )
//----------------------------------------------------------------
//Variales globales
const loginForm = document.getElementById("loginForm");
const rememberMeCheckbox = document.getElementById("rememberMe");
const usernameImput = document.getElementById("username");
const messageDiv = document.getElementById("message");
const maxIntentos = 3; //Limite de intentos
let intentosFallidos = 0; //contador de intentos
let historialUsuarios = JSON.parse(localStorage.getItem('historialUsuarios')) || [];

//Al cargar la pagina verifdica si hay datos guardados
window.onload = function(){
    cargarUsuarioRecordado();
}

// Cargar historial al cargar la página
    window.onload = function() {
    mostrarHistorialUsuarios();
}

//Manejar el evento login
loginForm.addEventListener("submit", (e) => {e.preventDefault(); //Prevenir recarga de pagina

//capturar valores
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if(rememberMeCheckbox.checked){
        guardarUsuarioRecordado(username)//guarda el usuario si esta activada la casilla
    }else{
        borrarUsuarioRecordado();
    }

    //funcion para guardar usuario en localstorage
    function guardarUsuarioRecordado(usuario){
        localStorage.setItem("usuarioRecordado", usuario);
    }
    //funcion para cargar el usuario desde localstorage
    function cargarUsuarioRecordado(){
        const usuarioRecordado = localStorage.getItem("usuarioRecordado");
        if(usuarioRecordado){
            usernameImput.value = usuarioRecordado;
            rememberMeCheckbox.checked = true;
        }
    }
    //funcion para borrar el usuario de localstorage
    function borrarUsuarioRecordado(){
        localStorage.removeItem("usuarioRecordado");
    }

//verificar si el usuario esta bloqueado
    if(intentosFallidos >= maxIntentos){
        mostrarMensaje("Has alcanzado el numero maximo de intentos. Intenta mas tarde.", "error");
        guardarHistorialUsuario(username, false);
        return;
    }

//validar credenciales
    if(username.toLowerCase() === "facundo" && password === "1234"){
        mostrarMensaje(`Bienvenido, ${username}!`,"success");
        guardarHistorialUsuario(username, true); //guardar en el historial usando json
        window.location.href = ".html"; //redirige a la pagina con los datos correctos
        intentosFallidos = 0; //reiniciar intentos al exito

    }else{
        intentosFallidos++;//incrementar contador de intentos
        const intentosRestantes = maxIntentos - intentosFallidos;
        guardarHistorialUsuario(username, false);
        mostrarMensaje("Usuario o contraseña incorrectos.")

        if(intentosFallidos >= maxIntentos){
            mostrarMensaje("Has alcanzado el numero maximo de intentos. Intenta mas tarde.", "error");
            desactivarFormulario();
        }else{
            mostrarMensaje(`Usuario o contraseña incorrectos. Intentos restantes : ${intentosRestantes}`, "error");
        }
    }
});
//funcion para desactivar formulario
function desactivarFormulario(){
    document.getElementById("username").disabled = true;
    document.getElementById("password").disabled = true;
    document.querySelector("button[type='submit']").disabled = true;
}

// Después de 30 segundos, se reactiva el formulario (por ejemplo)
    setTimeout(() => {
        document.getElementById("username").disabled = false;
        document.getElementById("password").disabled = false;
        document.querySelector("button[type='submit']").disabled = false;
        intentosFallidos = 0; // Reiniciar intentos después de esperar
        mostrarMensaje("Puedes intentar nuevamente.", "success");
    }, 20000); // 20 segundos

//funcion para mostrar mensajes
function mostrarMensaje(mensaje, tipo){
    messageDiv.classList.remove("success", "error");

    if(tipo === "success"){
        messageDiv.classList.add("success");
    }else{
        messageDiv.classList.add("error");
    }
    messageDiv.textContent = mensaje;

    setTimeout(() => {
        messageDiv.textContent = "";
    }, 3000); // El mensaje desaparecerá después de 3 segundos
}

//Funcion para guardar historial en LocalStoraage
function guardarHistorialUsuario(usuario, exito){
    const registro ={
        usuario: usuario || "desconocido",
        exito: exito,
        fecha: new Date().toLocaleString(),
    };
    historialUsuarios.push(registro);
    localStorage.setItem("historialUsuarios", JSON.stringify(historialUsuarios));
}

//Mostrar historial de usuarios
function mostrarHistorialUsuarios(){
    const historial = JSON.parse(localStorage.getItem("historialUsuarios")) || [];
    console.log("Historial de usuarios:", historial)
}
