var http= require('http');
var fhandler=require('fs');
var formhandler = require('formidable');
var port=9000;

//html Server
var server=http.createServer(function(request,response){
  var myReadStream=fhandler.createReadStream(__dirname+'/index.html');
  var formResponse=fhandler.createReadStream(__dirname+'/success.html');
  var err_response1=fhandler.createReadStream(__dirname+'/err1.html');
  var err_response2=fhandler.createReadStream(__dirname+'/err2.html');
  if(request.url!='/favicon.ico' && request.url=='/' &&request.method.toLowerCase()=='get')
  {
    console.log('Request was made:'+request.url);
    console.log('<<<<<==============================>>>>>');
    response.writeHead(200,{'Content-Type':'text/html'});
    myReadStream.pipe(response);
  }

else if(request.url=='/fileupload'&&request.method.toLowerCase()=='post')
  {
    console.log('Request was made:'+request.url);
    console.log('<<<<<==============================>>>>>');
    var form = new formhandler.IncomingForm();
    form.type='multipart';
    form.keepExtensions = true;

    form.parse(request, function (err, fields, files){
      var file_name=files.filetoupload.name;
      var size=files.filetoupload.size;
      //var file_name="FILE"
      var oldpath=files.filetoupload.path;
    //  var oldpath='C:/Users/RIJUMU~1/AppData/Local/Temp';
      var newpath = 'C:/Users/Riju Mukherjee/Desktop/Uploads/'+file_name;
      console.log(oldpath);
      console.log(newpath);
      console.log(size);

       fhandler.rename(oldpath, newpath, function (err) {
         if (err) {
           err_response1.pipe(response);
         }
         else{
         console.log('File uploaded');
         response.writeHead(200,{'Content-Type':'text/html'});
         formResponse.pipe(response);
       }
       });
   });

 }

 /*else if(request.url!='/favicon.ico')
  {
    console.log('n_browser Request was made:'+request.url);
    console.log('<<<<<==============================>>>>>');
    response.writeHead(200,{'Content-Type':'text/html'});
    myReadStream.pipe(response);
  }*/

  else{
    err_response2.pipe(response);
  }
});

console.log('@@@###############################################################@@@');
console.log('Server is starting.....');
console.log('listening to port...'+port);
server.listen(port,'192.168.43.58');
