function recuperaraTexto(idComponente){
    let componente;
    let valorIngresado;
    componente=document.getElementById(idComponente);
    valorIngresado=componente.value;
    return valorIngresado;
    }
    
    function recuperarInt(idComponente){
        let valorCaja=recuperaraTexto(idComponente);
        let valorEntero=parseInt(valorCaja);
        return valorEntero;
    }
    function recuperarFloat(idComponente){
        let valorCaja=recuperaraTexto(idComponente);
        let valorFlotante=parseFloat(valorCaja);
        return valorFlotante;
    }
    function mostrarTexto(idComponente,mensaje){
        let componente;
        componente=document.getElementById(idComponente);
        componente.innerText=mensaje;
    }
    function mostrarTextoEnCaja(idComponente,mensaje){
        let componente;
        componente=document.getElementById(idComponente);
        componente.value=mensaje;
    }
    
    function mostrarImagen(idComponente,rutaImagen){
        let componente;
        componente=document.getElementById(idComponente);
        componente.src = rutaImagen;
    
    }
    function limpiarCaja(idComponente) {
    let componente = document.getElementById(idComponente);
    componente.value = "";
}

//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO
 function calcularDisponible(ingresos, egresos) {
    let valorDisponible=ingresos-egresos;
    if(valorDisponible<0){
        return 0;
    }
    return valorDisponible;
}

function calcularCapacidadPago(montoDisponible){
    let capacidadPago=montoDisponible/2;
    return capacidadPago;


}

function mostrarEnSpan(idSpan,valor){
    let componente=document.getElementById(idSpan);
    componente.textContent=valor;
}

function CalcularInteresSimple(monto,tasa,plazoAnios){
    let interes = plazoAnios*monto*(tasa/100);
    return interes;

}

function calcularTotalPagar(monto,interes){
    let total = monto+interes+100;
    return total;
}

function calcularCuotaMesual(total,plazoAnios){
    let cuotaMensual=total/(plazoAnios*12);
    return cuotaMensual;
}

function aprobarCredito(capacidadPago,cuotaMesual){
    if(capacidadPago>cuotaMesual){
        return "CREDITO APROBADO";
    }
    return "CREDITO RECHAZADO";
}