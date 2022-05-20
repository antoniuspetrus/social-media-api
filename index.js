var config = require("./app/config/config");
var express = require("./app/config/express");

var app = express();

var http = require("http").createServer(app);

http.listen(config.PORT);
console.log("App running at http://" + config.HOST + ":" + config.PORT + "/");
