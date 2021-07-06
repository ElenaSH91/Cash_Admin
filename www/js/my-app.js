
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
      {path: '/selectCateIn/', url: 'selectCateIn.html',},
      {path: '/gastos/', url: 'gastos.html',},
      {path: '/gastos_01/', url: 'gastos_01.html',},
      {path: '/selectCateGa/', url: 'selectCateGa.html',},
      {path: '/cuentas/', url: 'cuentas.html',},
      {path: '/cuentas_01/', url: 'cuentas_01.html',},
      {path: '/informes/', url: 'informes.html',},
      {path: '/config/', url: 'config.html',},
      {path: '/mas/', url: 'mas.html',},


      {path: '/cuentas_01/', url: 'cuentas_01.html',},
    ]
    // ... other parameters
  });

/*******Variables Globales*******/
var mainView = app.views.create('.view-main');
var db = firebase.firestore();
var colCategoIn = db.collection("categoriaIngresos");
var colCategoGa = db.collection("categoriaGastos");
var colAddCuenta = db.collection("cuentas");

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
document.getElementById('navi').style.visibility='hidden';
//$$("#access").on("click",fnIrAInicio);
$$("#regis_1").on("click",fnIrARegis);

// Ingreso de usuario en Firebase
$$("#access").on("click",fnLogin);
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
})

$$(document).on('page:init', '.page[data-name="ingresos_01"]', function (e) {
$$("#title_top").html("Añadir Ingreso");
$$("#ingCancel").on("click",fnIngCancel);
$$("#ingSave").on("click",fnIngSave);
fnCalendario();
})

$$(document).on('page:init', '.page[data-name="selectCateIn"]', function (e) {
$$("#title_top").html("Seleccione una Categoría");
})

$$(document).on('page:init', '.page[data-name="gastos"]', function (e) {
$$("#title_top").html("Gastos");
$$("#irAtras").on("click",fnIrAInicio);
$$("#irAGasto01").on("click",fnIrAGastos01);
})

$$(document).on('page:init', '.page[data-name="gastos_01"]', function (e) {
$$("#title_top").html("Añadir Gasto");
$$("#gasCancel").on("click",fnGasCancel);
$$("#gasSave").on("click",fnGasSave);
fnCalendario();
})

$$(document).on('page:init', '.page[data-name="selectCateGa"]', function (e) {
$$("#title_top").html("Seleccione una Categoría");
})

$$(document).on('page:init', '.page[data-name="cuentas"]', function (e) {
$$("#title_top").html("Cuentas");
$$("#irAtras").on("click",fnIrAInicio);
$$("#irACuen01").on("click",fnIrACuen01);
})

$$(document).on('page:init', '.page[data-name="cuentas_01"]', function (e) {
$$("#title_top").html("Añadir Cuenta");
$$("#cueCancel").on("click",fnCueCancel);
$$("#cueSave").on("click",fnCueSave);
fnColorPicker();
})

$$(document).on('page:init', '.page[data-name="informes"]', function (e) {
$$("#title_top").html("Informes");
$$("#irAtras").on("click",fnIrAInicio);
})

$$(document).on('page:init', '.page[data-name="mas"]', function (e) {
$$("#title_top").html("Más");
$$("#irAtras").on("click",fnIrAInicio);
})

$$(document).on('page:init', '.page[data-name="config"]', function (e) {
$$("#title_top").html("Configuraciones");
$$("#irAtras").on("click",fnIrAInicio);
})


/*******FUNCIONES*******/

/* Login de Usuario */
function fnIrALogin(){ // Pantalla Inicial Login
  mainView.router.navigate("/index/", {transition:"f7-fade"});
}

/**Función Inicio de Sesión de Usuario**/
function fnLogin(){
  var email = $$("#emailLogin").val();
	var password = $$("#passLogin").val();

	firebase.auth().signInWithEmailAndPassword(email, password)
  	.then((userCredential) => {
    	// Signed in
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

/* Registro de Usuario */
function fnIrARegis(){ // Pantalla de Registro
  mainView.router.navigate("/registro/", {transition:"f7-fade"});
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
function fnIrACateIn(){ // Pantalla Categoría Ingresos
  mainView.router.navigate("/selectCateIn/", {transition:"f7-fade"});
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
function fnIrACateGa(){ // Pantalla Categoría Gastos
  mainView.router.navigate("/selectCateGa/", {transition:"f7-fade"});
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
function fnCueSave(){
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

/

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
  colorPickerSpectrum = app.colorPicker.create({
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
