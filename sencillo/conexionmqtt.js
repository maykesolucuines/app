 // connect options

  url = "https://realtime.ably.io/event-stream?";
  version = "1.2"
  username = "VRDsGQ.B_CYIQ";
  password = "dPUOfDfiuRQrRSX9wt1fcYc9v-AKBdGQa2jTP60_D5g";
  clientId =  " WEB FAM-MERCADO--->> " + Math.floor((Math.random() * 1000000) + 1);
  topic_raiz = "cbiDios";
  topic_datos_lamparas = "/datos_lamparas";

  

  // // Mensajes
  mensaje_inicial = "Desconectado"

  var ably = new Ably.Realtime(username+':'+password);

  // subcribir y recibir mensajes de los topicos suscritos

var conexion = url+'channels='+topic_raiz+'&v='+version+'&key='+username+':'+password;
var eventSource = new EventSource(conexion);
eventSource.onmessage = function(event) {
  var message = JSON.parse(event.data);

// Decodificar mensaje
var decodedString = atob(message.data);
var topic = message.channel;
console.log('Topic: ' + topic + '  Mensaje: ' + decodedString ); 


if (topic == topic_raiz){
  var splitted = decodedString.toString().split(",");
  var conexion = splitted[0];

 document.getElementById("displayconexion").innerHTML = conexion;

var channel = ably.channels.get(topic_raiz);
channel.publish('',mensaje_inicial);
}

};

//recibir mensajes de los topicos suscritos

var conexion = url+'channels='+topic_raiz+topic_datos_lamparas+'&v='+version+'&key='+username+':'+password;
var eventSource = new EventSource(conexion);

eventSource.onmessage = function(event) {
  var message = JSON.parse(event.data);
  var topic_datos_lampras = message.channel;

// Decodificar mensaje
var decodedString = atob(message.data);
//console.log('Topic: ' + message.channel + '  Mensaje: ' + decodedString ); 

if (topic_datos_lampras == topic_raiz + topic_datos_lamparas){
  var splitted = decodedString.toString().split(",");

  var switch1 = splitted[0];
  var inputChecked_L1;

  if(switch1 == "1"){
    inputChecked_L1 = true;
    document.getElementById("display_sw1").checked = inputChecked_L1;
  }else{
    inputChecked_L1 = false;
    document.getElementById("display_sw1").checked = inputChecked_L1;
  }
};




  ////////////////////////////////////////////////////////
function sw1_change(){   
  var channel = ably.channels.get(topic_raiz+'/actions/sw1')
  var inputChecked_sw1;
  
  inputChecked_sw1 = document.getElementById("display_sw1").checked;
  
  if(inputChecked_sw1 == true){
    console.log("Mensaje sw1 1")
    channel.publish('',"1");
  }else{
    console.log("Mensaje sw1 0")
    channel.publish('',"0");
   }
 }

