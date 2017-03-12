var fs = require('fs');
var fd = fs.openSync("testfile.txt","w+");

var NotDone = 1;
var K = 1024;
var M = K*K,str = ''
for(i=0;i<M;i++){
  str=str+"a";
}
  for(y=0;y<2000;y++)
{     
fs.appendFile("./testfile.txt", str,  function(err) {
      if (err) {
         return console.error(err);
                 }
});


}

  fs.closeSync(fd);

