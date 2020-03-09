const WebSocket = require('ws');
const fs = require('fs');
var NodeWebcam = require( "node-webcam" );
var Gpio = require('onoff').Gpio;
var pushButton = new Gpio(2, 'in', 'both');
//var exec = require('child_process').exec;

var opts = {
 
    //Picture related
 
    width: 800,
 
    height: 600,
 
    quality: 100,
 
 
    //Delay in seconds to take shot
    //if the platform supports miliseconds
    //use a float (0.1)
    //Currently only on windows
 
    delay: 0,
 
 
    //Save shots in memory
 
    saveShots: true,
 
 
    // [jpeg, png] support varies
    // Webcam.OutputTypes
 
    output: "jpeg",
 
 
    //Which camera to use
    //Use Webcam.list() for results
    //false for default device
 
    device: false,
 
 
    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes
 
    callbackReturn: "buffer",
 
 
    //Logging
 
    verbose: false
 
};

var Webcam = NodeWebcam.create( opts );

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

function handleMessage(message) {
    console.log('received: %s', message);
}

console.log('Iniciando servidor ws...');

const wss = new WebSocket.Server({ port: 8080 });

console.log('Servidor ws iniciado!');

wss.on('connection', function connection(ws) {
  ws.isAlive = true;
  
  ws.on('message',handleMessage);
  ws.on('pong', heartbeat);  

  NodeWebcam.capture( "test_picture", opts, function( err, data ) {
    ws.send(data, {binary: true},function (err) {
    
      console.log('Imagen enviada!');
    
    });
    fs.writeFile('test.jpg', data, 'binary', function(err){
      if (err) throw err
      console.log('File saved!')
      //io.emit('img', data);
  })
  });
  /*stillCamera.takeImage().then(image => {
    ws.send(image, {binary: true},function (err) {
    
      console.log('Imagen enviada!');
    
    });
  });*/
  //ws.send('CONECTADO CLIENTE');
 // console.log('CONECTADO CLIENTE');
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping(noop);
  });
}, 30000);

pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
  return;
  }
  //LED.writeSync(value); //turn LED on or off depending on the button state (0 or 1)
  if(value){
    console.log('Enciende');
    wss.clients.forEach(function each(ws) {
      //if (ws.isAlive === false) return ws.terminate();
	setTimeout(function(){
      		console.log('.');
		/*NodeWebcam.capture( "test_picture", opts, function( err, data ) {
       
				console.log('capturado');
				ws.send(data, {binary: true},function (err) {
	        
          				console.log('Imagen enviada!');
	        
        			});
	
      		});*/
		exec("raspistill -t 200 -o imageRPi.jpg", function(err, stdout, stderr) {
    			//exec("C:/Users/deuts/Downloads/openalpr_64/alpr.exe y_0_r_0.jpg", function(err, stdout, stderr) {
        		console.log(stdout);
        		//console.log(err);
    		});
		fs.readFile('./imageRPi.jpg', function (err, buffer) {
    			console.log('Imagen cargada!');

    			ws.send(buffer, {binary: true},function (err) {
    
      				console.log('Imagen enviada!');
    
    			});

  		});


	}, 500);
      //ws.isAlive = false;
      //ws.ping(noop);
    });
  }
  //else console.log('Apaga');
});

function unexportOnClose() { //function to run when exiting program
  //LED.writeSync(0); // Turn LED off
  //LED.unexport(); // Unexport LED GPIO to free resources
  pushButton.unexport(); // Unexport Button GPIO to free resources
};

process.on('SIGINT', unexportOnClose);
