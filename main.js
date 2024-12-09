function loguear(){

    let identificar = true;
    let intentos = 1;

  do{
    let usuario = prompt("Ingrese su nombre de usuario");

    if(usuario == null || usuario !== "Facundo"){
        alert("Su usuario es incorrecto vuelva a intentar en 15 minutos");
        break;
    }

    if(usuario === "Facundo"  || intentos <= 3){
        let password = prompt("Ingrese su contraseña");
        if(password == null){
            break;
        }

        if(password === "123456"){
            alert("Bienvenido a su cuenta " + usuario);
            identificar = false;
        }
        else{
            alert("Contraseña incorrecta");
            intentos++
            if(intentos > 3){
                alert("Usted supero los tres intentos");
                break;
            }
        }
    }

  }

  while(identificar)
    
}

loguear()


