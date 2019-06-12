var http = require('http'),
    httpProxy = require('http-proxy');
//
// Create your proxy server and set the target in the options.
//
  var tar=["http://192.168.43.58:6000","http://192.168.43.58:7000","http://192.168.43.58:8000","http://192.168.43.58:9000"];
  var server_name=["SERVER-A","SERVER-B","SERVER-C","SERVER-D"];
  var i=0;
  var proxy=httpProxy.createProxyServer({});

  var server=http.createServer(function (req,res) {
  if(req.url!='/favicon.ico')
  {
    console.log("Got a request");
    if(i==tar.length)
    {
      i=0;
    }
    proxy.web(req, res, { target:tar[i]});
    console.log("The request is proxied to..."+server_name[i]);
    i=i+1;
  }
  });

  console.log('Starting proxy server...');
  server.listen(8080);
