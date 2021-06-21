
// If we need to use custom DOM library, let's save it to $$ variable:
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
      {path: '/ingresos/', url: 'ingresos.html',},
      {path: '/gastos/', url: 'gastos.html',},
      {path: '/cuentas/', url: 'cuentas.html',},
      {path: '/informes/', url: 'informes.html',},
      {path: '/config/', url: 'config.html',},
      {path: '/mas/', url: 'mas.html',},
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
    document.getElementById('irAtras').style.visibility='hidden'; //Esconde la flecha "back"
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    //
document.getElementById('irAtras').style.visibility='hidden'; //Esconde la flecha "back"
$$("#irAIngresos").on("click",fnIrAIngresos); //Redirecciona a la página Ingresos
$$("#irAGastos").on("click",fnIrAGastos); //Redirecciona a la página Gastos
$$("#irACuentas").on("click",fnIrACuentas); //Redirecciona a la página Cuentas
$$("#irAInformes").on("click",fnIrAInformes); //Redirecciona a la página Informes
$$("#irAMas").on("click",fnIrAMas); //Redirecciona a la página Más
$$("#irAConfig").on("click",fnIrAConfig); //Redirecciona a la página Configuraciones
})

$$(document).on('page:init', '.page[data-name="ingresos"]', function (e) {
    //
$$("#irAtras").on("click",fnIrAtras);
document.getElementById('irAtras').style.visibility='visible'; //Muestra la flecha "back"
})

$$(document).on('page:init', '.page[data-name="gastos"]', function (e) {
    //
$$("#irAtras").on("click",fnIrAtras);
document.getElementById('irAtras').style.visibility='visible'; //Muestra la flecha "back"
})

$$(document).on('page:init', '.page[data-name="cuentas"]', function (e) {
    //
$$("#irAtras").on("click",fnIrAtras);
document.getElementById('irAtras').style.visibility='visible'; //Muestra la flecha "back"
})

$$(document).on('page:init', '.page[data-name="informes"]', function (e) {
    //
$$("#irAtras").on("click",fnIrAtras);
document.getElementById('irAtras').style.visibility='visible'; //Muestra la flecha "back"
})

$$(document).on('page:init', '.page[data-name="mas"]', function (e) {
    //
$$("#irAtras").on("click",fnIrAtras);
document.getElementById('irAtras').style.visibility='visible'; //Muestra la flecha "back"
})

$$(document).on('page:init', '.page[data-name="config"]', function (e) {
    //
$$("#irAtras").on("click",fnIrAtras);
document.getElementById('irAtras').style.visibility='visible'; //Muestra la flecha "back"
})



/*Variables Globales*/


/**Funciones**/
function fnIrAIngresos(){
  $$("#title_top").html("Ingresos");
  mainView.router.navigate("/ingresos/", {transition:"f7-fade"});
}
function fnIrAGastos(){
  $$("#title_top").html("Gastos");
  mainView.router.navigate("/gastos/", {transition:"f7-fade"});
}
function fnIrACuentas(){
  $$("#title_top").html("Cuentas");
  mainView.router.navigate("/cuentas/", {transition:"f7-fade"});
}
function fnIrAInformes(){
  $$("#title_top").html("Informes");
  mainView.router.navigate("/informes/", {transition:"f7-fade"});
}
function fnIrAMas(){
  $$("#title_top").html("Más");
  mainView.router.navigate("/mas/", {transition:"f7-fade"});
}
function fnIrAConfig(){
  $$("#title_top").html("Configuraciones");
  mainView.router.navigate("/config/", {transition:"f7-fade"});
}
function fnIrAtras(){
  $$("#title_top").html("Cash Admin");
  document.getElementById('irAtras').style.visibility='hidden'; //Esconde la flecha "back"
}
