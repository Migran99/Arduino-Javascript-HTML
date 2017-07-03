var WebSocketServer = require('ws').Server;
var SerialPort = require('serialport');

var SERVER_PORT = 8081;
var wss = new WebSocketServer({port: SERVER_PORT});
var clients = new Array;

var puerto = new SerialPort('COM3', {
   baudRate: 9600,
   parser: SerialPort.parsers.readline('\n')
});


wss.on('connection', stConnect);
 
function stConnect(client) {
 console.log("New client");
 clients.push(client);
 
 client.on('message', sendSerial);
 
 client.on('close', function() {
 console.log("Client Disconnected");
 var pos = clients.indexOf(client);
 clients.splice(pos, 1);
 });
}

///Send data to Serial (Arduino)
function sendSerial(data) {
 console.log("sending to serial: " + data);
 puerto.write(data);
}

///Send data to the connection
function sendClient(data) {
 for (myConnection in clients) {
  clients[myConnection].send(data);
 }
}

////Receive Data from Serial
puerto.on('open', function(){
	console.log('Arduino Conectado');
	
});

puerto.on('error', function(error){
  console.log(error);
});

puerto.on('data', function(data){
	if (clients.length > 0) {
     sendClient(data);
	 console.log(data);
   }
});
