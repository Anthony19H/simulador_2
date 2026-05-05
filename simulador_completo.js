
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
    let listaClass2 = componente.classList;
    listaClass2.remove("activa");
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
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios