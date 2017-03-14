var fs = require('fs');
var fd = fs.openSync("testfile.txt","w+");
var how100M = process.argv[2];
var NotDone = 1;
var K = 1024;
var M = K*K;
var str = '';
for(i=0;i<10*M;i++){
  str=str+"a";
}
  for(y=0;y<parseInt(how100M);y++)
{     
fs.appendFileSync("./testfile.txt",str);
}
  var a = fs.statSync("testfile.txt").size;
  console.log(a);
  fs.closeSync(fd);

