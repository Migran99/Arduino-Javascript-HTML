var texto;
var server = new WebSocket("ws://localhost:8081");
var value = 0;
var posx = 100;
 
function setup() {
	server.onopen = opServer;
	server.onmessage = reData;
	createCanvas(400, 400);
	background(0);
 
	texto = createDiv("Data Received: ");
	texto.position(420,50);
	
	fill(100);
	rect(width/2 -75, height/2 - 75, 150, 150);
}


function opServer() {
    texto.html("Server Connected");
    //socket.send("Hallo"); //Uncomment this if you want to send "Hallo" back to the server
  }
 
function reData(ch) {
    texto.html("Data Received: " + ch.data);
    value = int(ch.data);
	posx = value;
	background(0);
	rect(posx, height/2 - 75, 150, 150);
  }
 
function draw() {
//Nothing here	
}