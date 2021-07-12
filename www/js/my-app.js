
/// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'Cash Admin',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {path: '/index/', url: 'index.html',},
      {path: '/registro/', url: 'registro.html',},
      {path: '/inicio/', url: 'inicio.html',},
      {path: '/ingresos/', url: 'ingresos.html',},
      {path: '/ingresos_01/', url: 'ingresos_01.html',},
      {path: '/gastos/', url: 'gastos.html',},
      {path: '/gastos_01/', url: 'gastos_01.html',},
      {path: '/cuentas/', url: 'cuentas.html',},
      {path: '/cuentas_01/', url: 'cuentas_01.html',},
      {path: '/informes/', url: 'informes.html',},
      {path: '/config/', url: 'config.html',},
      {path: '/mas/', url: 'mas.html',},
      {path: '/selectCateIn/', url: 'selectCateIn.html',},
      {path: '/selectCateGa/', url: 'selectCateGa.html',},
      {path: '/beneficiario/', url: 'beneficiario.html',},
      {path: '/pagador/', url: 'pagador.html',},
      {path: '/notas/', url: 'notas.html',},
    ]
    // ... other parameters
  });

/*-----------------------------------------------------------------*/
/*------------------------VARIABLES GLOBALES-----------------------*/
/*-----------------------------------------------------------------*/
var mainView = app.views.create('.view-main');
var userOn = "";
var ingreTotal = 0;
var gastoTotal = 0;
var saldoTotal = 0;
var db = firebase.firestore();
var colCategoIn = db.collection("catIngreso");
var colCategoGa = db.collection("catGasto");
var colIngresos = db.collection("ingresos");
var colGastos = db.collection("gastos");
var colCuentas = db.collection("listCuentas");
var colIdRegistros = db.collection("idRegistros");
var saldoCConvert = "";
var montoGConvert = "";
var montoIConvert = "";
//var idIngreso = 0;
//var idGasto = 0;


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");

  //  fnIdReg();
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized

  //  fnActualizarIds();
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
document.getElementById('navi').style.visibility='hidden';
$$("#regis_1").on("click",fnIrARegis);
$$("#access").on("click",fnLogin);// Ingreso de usuario en Firebase
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="inicio"]', function (e) {
$$("#title_top").html("Cash Admin");
$$("#irALogin").on("click",fnIrALogin);
$$("#irAIngresos").on("click",fnIrAIngresos); //Redirecciona a la página Ingresos
$$("#irAGastos").on("click",fnIrAGastos); //Redirecciona a la página Gastos
$$("#irACuentas").on("click",fnIrACuentas); //Redirecciona a la página Cuentas
$$("#irAInformes").on("click",fnIrAInformes); //Redirecciona a la página Informes
$$("#irAMas").on("click",fnIrAMas); //Redirecciona a la página Más
$$("#irAConfig").on("click",fnIrAConfig); //Redirecciona a la página Configuraciones
})

$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
$$("#userCreate").on("click",fnCrearUser);
})

$$(document).on('page:init', '.page[data-name="ingresos"]', function (e) {
$$("#title_top").html("Ingresos");
$$("#irAtras").on("click",fnIrAInicio);
$$("#irAIngre01").on("click",fnIrAIngre01);
fnSaldoTI();
fnGetIngresos();
})

$$(document).on('page:init', '.page[data-name="ingresos_01"]', function (e) {
$$("#title_top").html("Añadir Ingreso");
$$("#ingCancel").on("click",fnIngCancel);
$$("#ingSave").on("click",fnCrearIngreso);
fnGetCateInS();
fnGetCuentaSeI();
fnCalendario();
fnColorPicker();
})

$$(document).on('page:init', '.page[data-name="gastos"]', function (e) {
$$("#title_top").html("Gastos");
$$("#irAtras").on("click",fnIrAInicio);
$$("#irAGasto01").on("click",fnIrAGastos01);
fnSaldoTG();
fnGetGastos();
})

$$(document).on('page:init', '.page[data-name="gastos_01"]', function (e) {
$$("#title_top").html("Añadir Gasto");
$$("#gasCancel").on("click",fnGasCancel);
$$("#gasSave").on("click",fnCrearGasto);
fnGetCateGaS();
fnGetCuentaSeG();
fnCalendario();
fnColorPicker();
})

$$(document).on('page:init', '.page[data-name="cuentas"]', function (e) {
$$("#title_top").html("Cuentas");
$$("#irAtras").on("click",fnIrAInicio);
$$("#irACuen01").on("click",fnIrACuen01);
fnSaldoT();
fnGetCuentas();
})

$$(document).on('page:init', '.page[data-name="cuentas_01"]', function (e) {
$$("#title_top").html("Añadir Cuenta");
$$("#cueCancel").on("click",fnCueCancel);
$$("#cueSave").on("click",fnCrearCuenta);
fnColorPicker();
})

$$(document).on('page:init', '.page[data-name="informes"]', function (e) {
$$("#title_top").html("Informes");
$$("#irAtras").on("click",fnIrAInicio);
})

$$(document).on('page:init', '.page[data-name="mas"]', function (e) {
$$("#title_top").html("Más");
$$("#irAtras").on("click",fnIrAInicio);
$$("#catIng").on("click",fnIrACateIn);
$$("#catGas").on("click",fnIrACateGa);
$$("#catBen").on("click",fnIrABenefi);
$$("#catPag").on("click",fnIrAPagador);
$$("#catNot").on("click",fnIrANotas);
})

$$(document).on('page:init', '.page[data-name="selectCateIn"]', function (e) {
$$("#title_top").html("Categoría Ingresos");
$$("#irAtras").on("click",fnIrAMas);
fnGetCateIn();
})

$$(document).on('page:init', '.page[data-name="selectCateGa"]', function (e) {
$$("#title_top").html("Categoría Gastos");
$$("#irAtras").on("click",fnIrAMas);
fnGetCateGa();

})

$$(document).on('page:init', '.page[data-name="beneficiario"]', function (e) {
$$("#title_top").html("Beneficiario");
$$("#irAtras").on("click",fnIrAMas);
})

$$(document).on('page:init', '.page[data-name="pagador"]', function (e) {
$$("#title_top").html("Pagador");
$$("#irAtras").on("click",fnIrAMas);
})

$$(document).on('page:init', '.page[data-name="notas"]', function (e) {
$$("#title_top").html("Notas");
$$("#irAtras").on("click",fnIrAMas);
})

$$(document).on('page:init', '.page[data-name="config"]', function (e) {
$$("#title_top").html("Configuraciones");
$$("#irAtras").on("click",fnIrAInicio);
})


/*-----------------------------------------------------------------*/
/*-----------------------------FUNCIONES---------------------------*/
/*-----------------------------------------------------------------*/

/*-----------------------------------------------------------------*/
/*-------------------Login y Registro de Usuario-------------------*/

/**Función Inicio de Sesión de Usuario**/
function fnLogin(){
  var email = $$("#emailLogin").val();
	var password = $$("#passLogin").val();

	firebase.auth().signInWithEmailAndPassword(email, password)
  	.then((userCredential) => {
    	// Signed in
        userOn = email;
    		var user = userCredential.user;
        mainView.router.navigate("/inicio/", {transition:"f7-fade"});
    	// ...
  	})
  	.catch((error) => {
    		var errorCode = error.code;
    		var errorMessage = error.message;

        console.error(error.code);
        console.error(error.message);
        if (error.code == "auth/invalid-email") {
        alert("El e-mail ingresado no es válido");
      } else if (error.code == "auth/wrong-password") {
        alert("La contraseña ingresada no es válida");
      } else if (error.code == "auth/user-not-found") {
        alert("El usuario ingresado no existe en nuestra base de datos");
      } else {
        alert(error.message);
      }
  	});
}

/**Función Creación de Usuario**/
function fnCrearUser(){
  var email = $$("#emailRegis").val();
	var password = $$("#passRegis").val();

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
      alert("Se ha creado el usuario");
      fnIrALogin();
    })
    .catch(function(error){
      console.error(error.code);
      console.error(error.message);
      if (error.code == "auth/invalid-email") {
        alert("El e-mail ingresado no es válido");
      } else if (error.code == "auth/weak-password") {
        alert("La contraseña debe tener al menos 6 caractéres");
      } else if (error.code == "auth/email-already-in-use") {
        alert("La cuenta de e-mail ingresado ya existe");
      } else {
        alert(error.message);
      }
    });
}

/*-----------------------------------------------------------------*/
/*----------------------------NAVEGACIÓN---------------------------*/

/* Login de Usuario */
function fnIrALogin(){ // Pantalla Inicial Login
  mainView.router.navigate("/index/", {transition:"f7-fade"});
}

/* Registro de Usuario */
function fnIrARegis(){ // Pantalla de Registro
  mainView.router.navigate("/registro/", {transition:"f7-fade"});
}

/* Inicio Cash Admin */
function fnIrAInicio(){ // Pantalla Principal Cash Admin
  mainView.router.navigate("/inicio/", {transition:"f7-fade"});
}

/* Configuraciones */
function fnIrAConfig(){ // Pantalla Configuraciones
  mainView.router.navigate("/config/", {transition:"f7-fade"});
}

/* Ingresos */
function fnIrAIngresos(){ // Pantalla Ingresos
  mainView.router.navigate("/ingresos/", {transition:"f7-fade"});
}
function fnIrAIngre01(){ // Pantalla Añadir Ingreso
  mainView.router.navigate("/ingresos_01/", {transition:"f7-fade"});
}
function fnIngCancel(){
  mainView.router.navigate("/ingresos/");
}
function fnIngSave(){
  mainView.router.navigate("/ingresos/");
}

/* Gastos */
function fnIrAGastos(){ // Pantalla Gastos
  mainView.router.navigate("/gastos/", {transition:"f7-fade"});
}
function fnIrAGastos01(){ //Pantalla Añadir Gasto
  mainView.router.navigate("/gastos_01/", {transition:"f7-fade"});
}
function fnGasCancel(){ //Cancelar Añadir Gasto
  mainView.router.navigate("/gastos/");
}
function fnGasSave(){ //Guardar y Volver Atrás de Añadir Gasto
  mainView.router.navigate("/gastos/");
}

/* Cuentas */
function fnIrACuentas(){// Pantalla Cuentas
  mainView.router.navigate("/cuentas/", {transition:"f7-fade"});
}
function fnIrACuen01(){
  mainView.router.navigate("/cuentas_01/", {transition:"f7-fade"});
}
function fnCueCancel(){
  mainView.router.navigate("/cuentas/");
}

/* Informes */
function fnIrAInformes(){ // Pantalla Informes
  mainView.router.navigate("/informes/", {transition:"f7-fade"});
}

/* Más */
function fnIrAMas(){ // Pantalla Más
  mainView.router.navigate("/mas/", {transition:"f7-fade"});
}
function fnIrACateIn(){ // Pantalla Categoría Ingresos
  mainView.router.navigate("/selectCateIn/", {transition:"f7-fade"});
}
function fnIrACateGa(){ // Pantalla Categoría Gastos
  mainView.router.navigate("/selectCateGa/", {transition:"f7-fade"});
}
function fnIrABenefi(){ // Pantalla Beneficiario
  mainView.router.navigate("/beneficiario/", {transition:"f7-fade"});
}
function fnIrAPagador(){ // Pantalla Pagador
  mainView.router.navigate("/pagador/", {transition:"f7-fade"});
}
function fnIrANotas(){ // Pantalla Gestión de Notas
  mainView.router.navigate("/notas/", {transition:"f7-fade"});
}

/*-----------------------------------------------------------------*/
/*-------------------------FUNCIONES GENERALES---------------------*/

/*----Función Calendario----*/
function fnCalendario(){
  calendarModal = app.calendar.create({
          inputEl: '#demo-calendar-modal',
          openIn: 'customModal',
          header: true,
          footer: true,
        });
}

/*----Función Elegir Color----*/
function fnColorPicker() {
  var colorPickerSpectrum = app.colorPicker.create({
    inputEl: '#demo-color-picker-spectrum',
    targetEl: '#demo-color-picker-spectrum-value',
    targetElSetBackgroundColor: true,
    modules: ['sb-spectrum', 'hue-slider'],
    openIn: 'popover',
    value: {
    hex: '#ff0000',
    },
  });
}

/*----Carga de IDs de los Registros de Ingresos y Gastos----*/
/*-function fnIdReg() {
  // Cargo el ID Ingresos de Base a la variable
  colIdRegistros.doc('idRIngresos').get()
    .then(function(insert) {
      idIngreso = insert.data().id;
      console.log("Se cargó el ultimo ID de Ingresos.")
    })
    .catch(function(error){
      console.log("Error: "+ error);
    });

  // Cargo el ID Gastos de Base a la variable
  colIdRegistros.doc('idRGastos').get()
    .then(function(insert) {
      idGasto = insert.data().id;
      console.log("Se cargó el ultimo ID de Gastos.")
    })
    .catch(function(error){
      console.log("Error: "+ error);
    });
}--*/

/*----Actualización de los IDs de Registros de Ingresos y Gastos----*/
/*-function fnActualizarIds() {
// Actualizo ID Registros Gastos
  var idRI = idIngreso;
  var actRegI = {
    id: idRI,
  };
  colIdRegistros.doc('idRIngresos').set(actRegI)
  .then(function(docRef){
    console.log('Se actualizó el id a '+idRI);
  })
  .catch(function(error){
    console.log(error);
  });
// Actualizo ID Registros Gastos
  var idRG = idGasto;
  var actRegG = {
    id: idRG,
  };
  colIdRegistros.doc('idRGastos').set(actRegG)
  .then(function(docRef){
    console.log('Se actualizó el id a '+idRG);
  })
  .catch(function(error){
    console.log(error);
  });
} --*/

/*-----------------------------------------------------------------*/
/*-----------------------------INGRESOS----------------------------*/
/*----Función Crear Ingreso----*/
function fnCrearIngreso() {
  var montoi = $$("#montoIngre").val();
  var account = $$("#listaCuentasI").val();
  var date = $$("#demo-calendar-modal").val();
  var categoI = $$("#categoIngre").val();
  var paga = $$("#addPaga").val();
  var notes = $$("#addNotasI").val();
  var colorI = $$("#demo-color-picker-spectrum").val();
  var miId = paga; //idIngreso.toString()
  var newIngreso = {
    monto: montoi,
    cuenta: account,
    fecha: date,
    categoria: categoI,
    pagador: paga,
    notas: notes,
    color: colorI,
    userId: userOn,
    };

  colIngresos.doc(miId).set(newIngreso)
  .then(function(docRef){
    app.dialog.alert('Se creó el registro correctamente');
    //idIngreso++;
    fnIrAIngresos();
  })
  .catch(function(error){
    console.log(error);
  });
}

/*----Función Acceso a BD Listado de Ingresos Registrados----*/
function fnGetIngresos() {
colIngresos.where("userId","in",["cashapp",userOn]).get()
  .then(function(querySnapshot) {
    querySnapshot.forEach((doc) => {
      console.log("data: "+ doc.id);
      var idI1 = doc.id;
      var cateI = doc.data().categoria;
      var montoReg = doc.data().monto;
      var paga = doc.data().pagador;
      var notes = doc.data().notas;
      var colorIn = doc.data().color;
      var date = doc.data().fecha;

      fnFormatPesoArI(montoReg); //Transforma el monto en $

      $$("#ingresosRegis").append(`<li>
        <a href="#" onclick="fnDialogDelI(`+"`"+idI1+"`"+`)">
        <div class="box_date">`+date+`</div>
          <div class="item-link item-content">
          <div class="item-media" style="background-color:`+colorIn+`;"><i class="material-icons"></i></div>
          <div class="item-inner">
            <div class="item-title">
              <div class="item-header">`+paga+`</div><div>`+cateI+`</div><div class="item-footer">`+notes+`</div>
            </div>
            <div class="item-after">`+montoIConvert+`</div>
          </div>
          </div>
        </a>
      </li>`);
    });
  })
  .catch(function(error){
    console.log("Error: "+ error);
  });

}

/*----Función para convertir los valores en decimal----*/
function fnFormatPesoArI(value) {
   var numDec = parseFloat(value).toFixed(2);
   console.log(numDec);
   montoIConvert = "$ "+ numDec;
   console.log(montoIConvert);
}

/*----Función Eliminar Registros de la Lista Ingresos----*/
function fnDialogDelI(i) {
  app.dialog.confirm('¿Desea eliminar este registro?', function () {
    $$("#totalIngreso").html("");
    $$("#ingresosRegis").html("");
  colIngresos.doc(i).delete()
    .then(function(){
      console.log("El registro "+i+" ha sido eliminado.");
      fnSaldoTI();
      fnGetIngresos();
    })
    .catch(function(error){
      console.log("Error: "+ error);
});
  console.log("Elimino "+i)
    app.dialog.alert('Eliminado');
  });
}

/*----Función para Sumar el Total de los Ingresos Registrados----*/
function fnSaldoTI() {
  var sumaTotalIngresos = 0;
  colIngresos.where("userId","in",["cashapp",userOn]).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach((doc) => {
        var valor = parseFloat(doc.data().monto);
         console.log(valor);
        sumaTotalIngresos = sumaTotalIngresos + valor;
         console.log(sumaTotalIngresos);
      });
      $$("#totalIngreso").html("$ "+sumaTotalIngresos);
    })
    .catch(function(error){
      console.log("Error: "+ error);
    });
}

/*----Función Select Categoría Ingresos----*/
function fnGetCateInS(){
colCategoIn.where("userId","in",["cashapp",userOn]).get()
  .then(function(querySnapshot) {
    querySnapshot.forEach((doc) => {
      console.log("data: "+ doc.id);
      var catId = doc.id;
      $$("#categoIngre").append(`
        <option>`+catId+`</option>`);
    });
  })
  .catch(function(error){
    console.log("Error: "+ error);
  });
}

/*----Función Select Cuenta----*/
function fnGetCuentaSeI(){
colCuentas.where("userId","in",["cashapp",userOn]).get()
  .then(function(querySnapshot) {
    querySnapshot.forEach((doc) => {
      console.log("data: "+ doc.id);
      var cuentaId = doc.data().nombre;
      $$("#listaCuentasI").append(`
        <option>`+cuentaId+`</option>`);
    });
  })
  .catch(function(error){
    console.log("Error: "+ error);
  });
}

/*-----------------------------------------------------------------*/
/*------------------------------GASTOS-----------------------------*/

/*----Función Crear Gasto----*/
function fnCrearGasto() {
  var montog = $$("#montoGasto").val();
  var account = $$("#listaCuentasG").val();
  var date = $$("#demo-calendar-modal").val();
  var categoG = $$("#categoGasto").val();
  var benefi = $$("#addBene").val();
  var notes = $$("#addNotasG").val();
  var colorG = $$("#demo-color-picker-spectrum").val();
  var miId = benefi; //idGasto.toString()
  var newGasto = {
    monto: montog,
    cuenta: account,
    fecha: date,
    categoria: categoG,
    beneficiario: benefi,
    notas: notes,
    color: colorG,
    userId: userOn,
    };

  colGastos.doc(miId).set(newGasto)
  .then(function(docRef){
    app.dialog.alert('Se creó el registro correctamente');
  //  idGasto++;
    fnIrAGastos();
  })
  .catch(function(error){
    console.log(error);
  });
}

/*----Función Acceso a BD Listado de Gastos Registrados----*/
function fnGetGastos() {
colGastos.where("userId","in",["cashapp",userOn]).get()
  .then(function(querySnapshot) {
    querySnapshot.forEach((doc) => {
      console.log("data: "+ doc.id);
      var idG1 = doc.id;
      var cateG = doc.data().categoria;
      var montoReg = doc.data().monto;
      var bene = doc.data().beneficiario;
      var notes = doc.data().notas;
      var colorGa = doc.data().color;
      var date = doc.data().fecha;

      fnFormatPesoArG(montoReg); //Transforma el monto en $

      $$("#gastosRegis").append(`<li>
      <a href="#" onclick="fnDialogDelG(`+"`"+idG1+"`"+`)">
      <div class="box_date">`+date+`</div>
          <div class="item-link item-content">
          <div class="item-media" style="background-color:`+colorGa+`;"><i class="material-icons"></i></div>
          <div class="item-inner">
            <div class="item-title">
              <div class="item-header">`+bene+`</div><div>`+cateG+`</div><div class="item-footer">`+notes+`</div>
            </div>
            <div class="item-after">`+montoGConvert+`</div>
          </div>
          </div>
        </a>
      </li>`);
    });
  })
  .catch(function(error){
    console.log("Error: "+ error);
  });

}

/*----Función para convertir los valores en decimal----*/
function fnFormatPesoArG(value) {
   var numDec = parseFloat(value).toFixed(2);
   console.log(numDec);
   montoGConvert = "$ "+ numDec;
   console.log(montoGConvert);
}

/*----Función Eliminar Registros de la Lista Gastos----*/
function fnDialogDelG(g) {
  app.dialog.confirm('¿Desea eliminar este registro?', function () {
    $$("#totalGasto").html("");
    $$("#gastosRegis").html("");
  colGastos.doc(g).delete()
    .then(function(){
      console.log("El registro "+g+" ha sido eliminado.");
      fnSaldoTG();
      fnGetGastos();
    })
    .catch(function(error){
      console.log("Error: "+ error);
});
  console.log("Elimino "+g)
    app.dialog.alert('Eliminado');
  });
}

/*----Función para Sumar el Total de los Gastos Registrados----*/
function fnSaldoTG() {
  var sumaTotalGastos = 0;
  colGastos.where("userId","in",["cashapp",userOn]).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach((doc) => {
        var valor = parseFloat(doc.data().monto);
         console.log(valor);
        sumaTotalGastos = sumaTotalGastos + valor;
         console.log(sumaTotalGastos);
      });
      $$("#totalGasto").html("$ "+sumaTotalGastos);
    })
    .catch(function(error){
      console.log("Error: "+ error);
    });
}

/*----Función Select Categoría Gastos----*/
function fnGetCateGaS(){
colCategoGa.where("userId","in",["cashapp",userOn]).get()
  .then(function(querySnapshot) {
    querySnapshot.forEach((doc) => {
      console.log("data: "+ doc.id);
      var catId = doc.id;
      $$("#categoGasto").append(`
        <option>`+catId+`</option>`);
    });
  })
  .catch(function(error){
    console.log("Error: "+ error);
  });
}

/*----Función Select Cuenta----*/
function fnGetCuentaSeG(){
colCuentas.where("userId","in",["cashapp",userOn]).get()
  .then(function(querySnapshot) {
    querySnapshot.forEach((doc) => {
      console.log("data: "+ doc.id);
      var cuentaId = doc.data().nombre;
      $$("#listaCuentasG").append(`
        <option>`+cuentaId+`</option>`);
    });
  })
  .catch(function(error){
    console.log("Error: "+ error);
  });
}


/*-----------------------------------------------------------------*/
/*------------------------------CUENTAS----------------------------*/

/*----Función Crear Cuenta----*/
function fnCrearCuenta() {
  var nombre = $$("#nameCuenta").val();
  var saldo = $$("#montoCuenta").val();
  var colorC = $$("#demo-color-picker-spectrum").val();
  var miId = nombre;

  var newCuenta = {
    nombre: nombre,
    saldoInicial: saldo,
    userId: userOn,
    color: colorC,
    };
  colCuentas.doc(miId).set(newCuenta)
  .then(function(docRef){
    app.dialog.alert('Se creó la cuenta correctamente');
    fnIrACuentas();
  })
  .catch(function(error){
    console.log(error);
  });
}

/*----Función Acceso a BD Listado de Cuentas----*/
function fnGetCuentas() {
colCuentas.where("userId","in",["cashapp",userOn]).get()
  .then(function(querySnapshot) {
    querySnapshot.forEach((doc) => {
      console.log("data: "+ doc.id);
      var idC = doc.id;
      var name = doc.data().nombre;
      var colorC = doc.data().color;
      var saldoC = doc.data().saldoInicial;

      fnFormatPesoAr(saldoC);

      $$("#listaC").append(`<li>
      <a href="#" onclick="fnDialogDelC(`+"`"+idC+"`"+`)">
          <div class="item-link item-content">
            <div class="item-media" style="background-color:`+colorC+`;"></div>
            <div class="item-inner">
              <div class="item-title">`+name+`</div>
              <div class="item-after">`+saldoCConvert+`</div>
            </div>
          </div>
        </a>
      </li>`);
    });
  })
  .catch(function(error){
    console.log("Error: "+ error);
  });
}

/*----Función para convertir los valores en decimal----*/
function fnFormatPesoAr(value) {
   var numDec = parseFloat(value).toFixed(2);
   console.log(numDec);
   saldoCConvert = "$ "+ numDec;
   console.log(saldoCConvert);
}

/*----Función Eliminar Ítems de la Lista Cuentas----*/
function fnDialogDelC(c) {
  app.dialog.confirm('¿Desea eliminar esta cuenta?', function () {
    $$("#saldoT").html("");
    $$("#listaC").html("");
  colCuentas.doc(c).delete()
    .then(function(){
      console.log("El registro "+c+" ha sido eliminado.");
      fnSaldoT();
      fnGetCuentas();
    })
    .catch(function(error){
      console.log("Error: "+ error);
});
  console.log("Elimino "+c)
    app.dialog.alert('Eliminado');
  });
}

/*----Función para Sumar los Totales de cada Cuenta----*/
function fnSaldoT() {
  var sumaTotalCuentas = 0;
  colCuentas.where("userId","in",["cashapp",userOn]).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach((doc) => {
        var valor = parseFloat(doc.data().saldoInicial);
        sumaTotalCuentas = sumaTotalCuentas + valor;
         console.log(sumaTotalCuentas);
      });
      $$("#saldoT").html("$ "+sumaTotalCuentas);
    })
    .catch(function(error){
      console.log("Error: "+ error);
    });
}

/*-----------------------------------------------------------------*/
/*------------------------------INFORMES---------------------------*/


/*-----------------------------------------------------------------*/
/*-------------------------------MÁS-------------------------------*/

/*----Función Acceso a BD Categoría Ingresos----*/
function fnGetCateIn(){
colCategoIn.where("userId","in",["cashapp",userOn]).get()
  .then(function(querySnapshot) {
    querySnapshot.forEach((doc) => {
      console.log("data: "+ doc.id);
      var catId = doc.id;
      var catColor = doc.data().color;
      var catIcon = doc.data().icon;

      $$("#listaCat_In").append(`<li>
      <a href="#" onclick="fnDialogDelI(`+"`"+catId+"`"+`)">
          <div class="item-content">
            <div class="item-media" style="background-color:`+catColor+`;">
              <span class="material-icons">`+catIcon+`</span>
            </div>
            <div class="item-inner">
              <div class="item-title">`+catId+`</div>
            </div>
          </div>
        </a>
      </li>`);
    });
  })
  .catch(function(error){
    console.log("Error: "+ error);
  });
}

/*----Función Eliminar Ítems Categoría Ingresos----*/
function fnDialogDelI(a) {
  app.dialog.confirm('¿Desea eliminar esta categoría?', function () {
  $$("#listaCat_In").html("");
  colCategoIn.doc(a).delete()
    .then(function(){
      console.log("El registro "+a+" ha sido eliminado.");
      fnGetCateIn();
    })
    .catch(function(error){
      console.log("Error: "+ error);
});
  console.log("Elimino "+a)
    app.dialog.alert('Eliminado');
  });
}

/*----Función Acceso a BD Categoría Gastos----*/
function fnGetCateGa(){
colCategoGa.where("userId","in",["cashapp",userOn]).get()
  .then(function(querySnapshot) {
    querySnapshot.forEach((doc) => {
      console.log("data: "+ doc.id);
      var catId = doc.id;
      var catColor = doc.data().color;
      var catIcon = doc.data().icon;

      $$("#listaCat_Ga").append(`<li>
        <a href="#" onclick="fnDialogDelG(`+"`"+catId+"`"+`)">
          <div class="item-content">
            <div class="item-media" style="background-color:`+catColor+`;">
              <span class="material-icons">`+catIcon+`</span>
            </div>
            <div class="item-inner">
              <div class="item-title">`+catId+`</div>
            </div>
          </div>
        </a>
      </li>`);
    });
  })
  .catch(function(error){
    console.log("Error: "+ error);
  });
}

/*----Función Eliminar Ítems Categoría Gastos----*/
function fnDialogDelG(b) {
  app.dialog.confirm('¿Desea eliminar esta categoría?', function () {
  $$("#listaCat_Ga").html("");
  colCategoGa.doc(b).delete()
    .then(function(){
      console.log("El registro "+b+" ha sido eliminado.");
      fnGetCateGa();
    })
    .catch(function(error){
      console.log("Error: "+ error);
});
  console.log("Elimino "+b)
    app.dialog.alert('Eliminado');
  });
}
