
var net=require('net');
var fs = require("fs");
var HOST = process.argv[2];
var PORT = 6969;
var dataName = process.argv[3];
var indata = fs.createReadStream('./'+dataName);
var dataSize = fs.statSync(dataName).size;
var client = new net.Socket();

console.log(dataSize.toString());
client.connect(PORT, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    client.write(dataName);		//send name
});

client.on('data', function(data) {
    console.log("DATA"+data);
    if(data=="ack1"){console.log("get ack1")
    client.write(dataSize.toString());
}
if(data=="ack2"){
    console.log("get ack2");
    indata.on('data',function(chunk) {
      client.write(chunk);
    });
}

if(data=="finishack"){
    client.destroy();
    console.log("finish and destroy");      
}
client.on('close', function() {
    console.log('Connection closed');
});
});
