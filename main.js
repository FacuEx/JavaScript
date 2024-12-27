
let historialUsuarios = [];

function loguear(){

    let identificar = true;
    let intentos = 3;

  do{
    let usuario = prompt("Ingrese su nombre de usuario");
    let password = prompt("Ingrese su contraseña");

    //Caso de usuario y contraseña vacios
    if(usuario == "" && password == ""){
        alert("Vuelva a intentar en 15 minutos")
            break;  
    }
    
    //Caso de usuario y contraseña correctos
    if(usuario.toLowerCase() === "facundo" && password === "123456"){
        alert(`Bienvenido a su cuenta ${usuario}`)
        identificar = false;
           //Historial de usuarios agrados
    historialUsuarios.push({
        usuario: usuario.toLowerCase(),
        estado: "Aprovado",
        fecha: new Date().toLocaleString()
    });
    break;
    }


    //Caso de usuario y contraseña incorrectos
    intentos--;
    if(intentos > 0){
        alert(`Usuario o contraseña incorrectos. Le quedan ${intentos} itentos.`)
    //Historial de intentos fallidos
    historialUsuarios.push({
        usuario: usuario.toLowerCase(),
        estado: "Fallido",
        fecha: new Date().toLocaleString(),
    });
}
    else{
        alert("Usted supero los tres intentos. Vuelva a intentar mas tarde.");
            break;
            }
    }
    while(identificar === true);
}
    //Busqueda
    function buscarUsuario(nombre){
        const resultado = historialUsuarios.filter(user => user.usuario === nombre.toLowerCase());
        if (resultado.length > 0){
            console.log(`Usuarios encontrados:`, resultado);
        }else{
            console.log("No se encontraron usuarios con ese nombre");
        }
    }
    //Filtrado
    function filtrarPorEstado(estado){
        const resultado = historialUsuarios.filter(user => user.estado === estado);
        if(resultado.length >0){
            console.log(`Usuarios con estado '${estado}':`, resultado);
        }else{
            console.log(`No se encontraron usuarios con el estado '${estado}'.`);
        }
    }

loguear();

buscarUsuario("facundo");
filtrarPorEstado("Exito");
filtrarPorEstado("Fallido");