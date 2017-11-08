var express = require("express");
var app     = express();
var path    = require("path");


app.use(express.static(path.join(__dirname, '/')));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

console.log("Running at Port 4000");
module.exports = app;