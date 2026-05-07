
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  function ocultarSecciones(){
    let componente = document.getElementById("parametros");
    let listaClass = componente.classList;
    listaClass.remove("activa");

    let componente2 = document.getElementById("clientes");
    let listaClass2 = componente2.classList;
    listaClass2.remove("activa");

    let componente3 = document.getElementById("credito");
    let listaClass3 = componente3.classList;
    listaClass3.remove("activa");

    let componente4 = document.getElementById("listaCreditos");
    let listaClass4 = componente4.classList;
    listaClass4.remove("activa");
  };

  function mostrarSeccion(id){
    ocultarSecciones();
    let componente = document.getElementById(id);
    let listaClass = componente.classList;
    listaClass.add("activa");

  }

  function guardarTasa(){
    let tasa=recuperarFloat("tasaInteres");
    if(tasa>=10 && tasa<=20){
      mostrarTexto("mensajeTasa","Tasa configurada correctamente: " + tasa+"%")
    }else{
      mostrarTexto("mensajeTasa","La tasa debe estar entre 10% y 20%")
    }
  }


  function guardarClientes(){
    let cmpCedula =recuperaraTexto("idCedula");
    let cmpNombre =recuperaraTexto("idNombre");
    let cmpApellido = recuperaraTexto("idApellido");
    let cmpIngresos = recuperarInt("idIngresos");
    let cmpEgresos = recuperarInt("idEgresos");

    let clienteEncontrado = buscarCliente(cmpCedula);

    if(clienteEncontrado == null){
    let cliente ={
        cedula: cmpCedula,
        nombre: cmpNombre,
        apellido: cmpApellido,
        ingresos: cmpIngresos,
        egresos: cmpEgresos
    };
    clientes.push(cliente);
    console.log("Se ha creado un nuevo registro.");
    }else{
      clienteEncontrado.nombre = cmpNombre;
        clienteEncontrado.apellido = cmpApellido;
        clienteEncontrado.ingresos = cmpIngresos;
        clienteEncontrado.egresos = cmpEgresos;
        console.log("Se han actualizado los datos del cliente.");
    }
    pintarClientes();
    limpiar();
  
  }


  function pintarClientes(){
    let tablaClientes = document.getElementById("tablaClientes");
    let contenido=""
    for( let i = 0; i<clientes.length; i++){
      let cliente = clientes[i];
      contenido += `<tr>
          <td>${cliente.cedula}</td>
          <td>${cliente.nombre}</td>
          <td>${cliente.apellido}</td>
          <td>${cliente.ingresos}</td>
          <td>${cliente.egresos}</td>
          <td>
            <button onclick="seleccionarCliente('${cliente.cedula}')">Actualizar</button>
          </td>
        </tr>`

    }
    tablaClientes.innerHTML = contenido;
  }


  function buscarCliente(cedula){
    let elementoCliente;
    let clienteEncontrado = null
    for(let i = 0; i < clientes.length; i++){
      let elementoCliente = clientes [i];
      if(elementoCliente.cedula == cedula){
        clienteEncontrado = elementoCliente;
        break;
      }
    }
    return clienteEncontrado;
  }


  function seleccionarCliente(cedula) {
  let clienteEncontrado = buscarCliente(cedula);

  if (clienteEncontrado != null) {

    clienteSeleccionado = clienteEncontrado;

    mostrarTextoEnCaja("idCedula", clienteSeleccionado.cedula);
    mostrarTextoEnCaja("idNombre", clienteSeleccionado.nombre);
    mostrarTextoEnCaja("idApellido", clienteSeleccionado.apellido);
    mostrarTextoEnCaja("idIngresos", clienteSeleccionado.ingresos);
    mostrarTextoEnCaja("idEgresos", clienteSeleccionado.egresos);
    
    console.log("Cliente seleccionado: " + clienteSeleccionado.nombre);
  }
}

function limpiar() {
    limpiarCaja("idCedula");
    limpiarCaja("idNombre");
    limpiarCaja("idApellido");
    limpiarCaja("idIngresos");
    limpiarCaja("idEgresos");
}

function buscarClienteCredito(){
  let creditoCedula =recuperarInt("buscarCedulaCredito");
  let creditoEncontrado = buscarCliente(creditoCedula);
  clienteSeleccionado = creditoEncontrado;
  if( creditoEncontrado != null){
    let datos=`<h3>Datos del Cliente</h3>
<p><strong>Cédula:</strong>${creditoEncontrado.cedula}</p>
<p><strong>Nombre:</strong>${creditoEncontrado.nombre}</p>
<p><strong>Apellido:</strong>${creditoEncontrado.apellido}</p>
<p><strong>Ingresos:</strong>${creditoEncontrado.ingresos}</p>
<p><strong>Egresos:</strong>${creditoEncontrado.egresos}</p>
`;
       
    document.getElementById("datosClienteCredito").innerHTML = datos;
  }else{
     document.getElementById("datosClienteCredito").innerHTML = "CLIENTE NO ENCONTRADO";
  }
 
}

function calcularCredito() {
  mostrarTexto("errorMonto", "");
  mostrarTexto("errorPlazo", "");
    
    if (clienteSeleccionado == null) {
        alert("Primero debes buscar y seleccionar un cliente");
        return;
    }

    let monto = parseFloat(document.getElementById("montoCredito").value);
    let plazo = parseInt(document.getElementById("plazoCredito").value);

    let hayError = false;

    if (isNaN(monto) || monto <= 0) {
        mostrarTexto("errorMonto", "Debe ingresar un monto mayor a 0");
        hayError = true;
    }
    
    if (isNaN(plazo) || plazo <= 0) {
        mostrarTexto("errorPlazo", "Debe ingresar un plazo válido");
        hayError = true;
    }

    if (hayError) {
        return;
    }

    // Sacamos los datos directamente del objeto que encontramos en la búsqueda
    let ingresos = clienteSeleccionado.ingresos; // ¡YA NO SALE UNDEFINED!
    let egresos = clienteSeleccionado.egresos;
    
    // La tasa la sacamos del parámetro global
    let tasa = tasaInteres; 

    // 3. LÓGICA DE CÁLCULOS
    // Ahora pasamos los números reales a tus funciones de negocio
    let disponible = calcularDisponible(ingresos, egresos);
    let capacidadPago = calcularCapacidadPago(disponible);
    let interesSimple = CalcularInteresSimple(monto, tasa, plazo);
    let totalPagar = calcularTotalPagar(monto, interesSimple);
    let cuotaMensual = calcularCuotaMesual(totalPagar, plazo);
    let analizarCredito = aprobarCredito(capacidadPago, cuotaMensual);


    let claseResultado ="";
    let btnAsignar = document.getElementById("btnSolicitarCredito")
    if (analizarCredito === "CREDITO APROBADO") {
        claseResultado = "aprobado"; // Esta clase pone el fondo verde
        btnAsignar.disabled = false;
    } else {
        claseResultado = "rechazado"; // Esta clase pone el fondo rojo
        btnAsignar.disabled = true;
    }
    // 4. MOSTRAR RESULTADOS
    document.getElementById("resultadoCredito").innerHTML = `
        <div class="${claseResultado}">
        <h3>Resultado del Análisis</h3>
        <p><strong>Capacidad de pago:</strong> $${capacidadPago.toFixed(2)}</p>
        <p><strong>Total a pagar:</strong> $${totalPagar.toFixed(2)}</p>
        <p><strong>Cuota mensual:</strong> $${cuotaMensual.toFixed(2)}</p>
        <p><strong>Resultado:</strong> ${analizarCredito}</p>
    `;

    montoCalculado = monto; 
    cuotaCalculada = cuotaMensual;
    plazoCalculado = plazo;
}

function asignarCredito(){
  let credito ={
    cedula:clienteSeleccionado.cedula,
    nombre:clienteSeleccionado.nombre,
    apellido:clienteSeleccionado.apellido,
    monto:montoCalculado,
    tasa:tasaInteres,
    plazo:plazoCalculado,
    cuota:cuotaCalculada,
  }
  creditos.push(credito);
}


function buscarCreditos(cedula){
  let creditosEncontrado =[];
  for (let i=0; i<creditos.length; i++){
    let elementoCredito = creditos[i];
    if(elementoCredito.cedula == cedula){
      creditosEncontrado.push(elementoCredito);
    }
  }
  return creditosEncontrado;
  
}

function pintarCreditos(creditos){
  const TABLA = document.getElementById("tablaCreditos");
  let contenido="";
  for(let i=0; i<creditos.length; i++){
    let elementoCredito = creditos[i];
    contenido += `<tr>
          <td>${elementoCredito.cedula}</td>
          <td>${elementoCredito.nombre}</td>
          <td>${elementoCredito.apellido}</td>
          <td>${elementoCredito.monto}</td>
          <td>${elementoCredito.tasa}</td>
          <td>${elementoCredito.plazo}</td>
          <td>${elementoCredito.cuota.toFixed(2)}</td>
          <td><button>Eliminar</button></td>
        </tr>`
  }
  TABLA.innerHTML =contenido;
}

function buscarCreditosCliente(){
  let creditosClCedula = recuperarInt("buscarCedulaListado",)
  let buscarCreditoCl = buscarCreditos(creditosClCedula);

  limpiarCaja("buscarCedulaListado");
  pintarCreditos(buscarCreditoCl);

}