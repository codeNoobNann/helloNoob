
var net=require('net');
var fs = require("fs");
var HOST = '127.0.0.1';
var PORT = 6969;
var dataName = "test.jpeg";
var indata = fs.readFileSync('./'+dataName);
var dataSize = indata.length;
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
    client.write(indata);
}

if(data=="finishack"){
    client.destroy();
    console.log("finish and destroy");      
}
client.on('close', function() {
    console.log('Connection closed');
});
});
