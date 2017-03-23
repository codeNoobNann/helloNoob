// TCP server version 1
//
var readline = require('readline');
var net = require('net');
var fs = require("fs");
var HOST = process.argv[2];
var PORT = 6969;
var counter = 0; // count the number of times server received a real data message
var rec; // variable for get data
var ackCnt = 0;
var dataName = "";
var dataSize = 1;
var receivedSize = 0;
var dateStart = 0;
var dateGetNow = 0;
var datePass = 0;
net.createServer(function(sock) {
  console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    sock.on('data', function(data) {
      if(ackCnt == 0){
        dateStart = Date.now();
        sock.write("ack1");
        dataName = data;
        out_filename = "./"+dataName;
        console.log("get dataname,than create file");
        fs.open(out_filename, 'w+', function(err, fd) { 
          if (err) {
             return console.error(err);
                    }
        console.log("File:" + out_filename + " created successfully!");     
                  });
        ackCnt++;
      }

      else if(ackCnt == 1){
        dataSize = parseInt(data.toString());
        console.log("get datasize = "+dataSize.toString());
        ackCnt++;
        sock.write("ack2");
      }
      
      else if(ackCnt > 1){
        rec=new Buffer(data);
        receivedSize = receivedSize + parseInt(data.length);
        counter++; 
        dateGetNow = Date.now();
        var datePass=(dateGetNow-dateStart)/1000;
        var speed=Math.floor(((receivedSize*8)/1000000)/datePass);
        console.log('speed Mbits/sec : '+speed.toString()+" pass second = "+Math.floor(datePass).toString());
        console.log('data get :' + counter+' times. file get : '+Math.floor(receivedSize*100/dataSize).toString()+"%");
        fs.appendFileSync(out_filename, rec);

      }

      if(receivedSize == dataSize){
        dateGetNow = Date.now();
        var totalTime = Math.floor((dateGetNow-dateStart)/1000);
        sock.write('got it'+counter +"times");
        sock.write("finishack");
        dataSize = 1;
        receivedSize = 0;
        counter = 0;
        ackCnt = 0;
        dataName = "";
      }
    });
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
}).listen(PORT);
console.log('Server listening on ' + HOST +':'+ PORT);

