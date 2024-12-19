function loguear(){

    let identificar = true;
    let intentos = 3;

  do{
    let usuario = prompt("Ingrese su nombre de usuario");
    let password = prompt("Ingrese su contraseña");


    if(usuario == "" && password == ""){
        alert("Vuelva a intentar en 15 minutos")
            break;  
    }

    if((usuario !== "Facundo" || password !=="123456") && intentos < 1){
        alert("Su cuenta es incorrecta vuelva a intentarlo");
        if(intentos < 1){
            alert("Usted supero los tres intentos");
            break;
        }
    }

    if(usuario === "Facundo" && password === "123456"){
        alert("Bienvenido a su cuenta " + usuario)
        identificar = false;     
    }

    else{
        alert(`No se reconoce a ${usuario} usted tiene ${intentos} intentos`)
        intentos--
        if(intentos < 1){
            alert("Usted supero los tres intentos");
            break;
            }
        }
    }
    
    while(identificar === true)
    
}
loguear()


