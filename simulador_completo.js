
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

    let cliente ={
        cedula: cmpCedula,
        nombre: cmpNombre,
        apellido: cmpApellido,
        ingresos: cmpIngresos,
        egresos: cmpEgresos
    };
    clientes.push(cliente);
    pintarClientes();
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
            <button>Actualizar</button>
            <button>Eliminar</button>
          </td>
        </tr>`

    }
    tablaClientes.innerHTML = contenido;
  }
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios