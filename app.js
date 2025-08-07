let numeroSecreto = 0;
let intentos =0;
// agregar un limitador al juego
let listaNumerosSorteado = [];
let numeroMaximo = 10;
let intentosMaximos= 3;
function asignarTextoElemento (elemento,texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);
    
    if (numeroSecreto === numeroDeUsuario) {
        asignarTextoElemento("p",`Acertaste el número en ${intentos} ${(intentos === 1) ? "vez" : "veces"}`);
        document.getElementById("reiniciar").removeAttribute("disabled");
        
    } else {
        // el usuario no acertó
        /* tambien se puede poner if junto con el else ejemplo
        else if (){}
        */ 
       if (numeroSecreto > numeroDeUsuario) {
        asignarTextoElemento ("p", "El número secreto es mayor"); 
       }else {
        asignarTextoElemento ("p", "El número secreto es menor");
       } 
       intentos++;
       if (intentos>intentosMaximos){
        asignarTextoElemento ("p", `Llegaste al máximo de números de ${intentosMaximos} intentos`)
        document.getElementById("reiniciar").removeAttribute("disabled");
        console.log(intentos);
        listaNumerosSorteado.pop();
       }
       limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    // es mejor este ya que es más limpio
    document.querySelector("#valorUsuario").value = "";
    /* se puede utilizar let valorCaja = document.querySelector("#valorUsuario");
    valorCaja.value = "";*/
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    //si ya  sorteamos todos los numero
    if(listaNumerosSorteado.length == numeroMaximo){
        asignarTextoElemento("p","Ya se sortearon todos los números");
    }else{

        //si el numero generado esta en incluido en la lista 
        console.log (listaNumerosSorteado);
        if (listaNumerosSorteado.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        }else {
            listaNumerosSorteado.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento ("h1","Juego del número secreto");
    asignarTextoElemento ("p",`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos =1;
    console.log(numeroSecreto);
}

function reiniciarJuego() {
    //limpiar la caja 
    limpiarCaja();
    //indicar mensaje de intervalo de numeros
    //inicializar el numero de intentos
    //generar el numero aleatorio 
    condicionesIniciales();
    // deshabilita el boton de nuevo juegos
    document.querySelector("#reiniciar").setAttribute("disabled","true");
    
}

condicionesIniciales();
