
/**
 * Module dependencies.
 */



var express = require('express')
  , less = require('less')

var logManager = require("nodeFlows/logManager");

var app = module.exports = express.createServer();

global.app = app;

// Configuration

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(require('./middleware/locals'));
    app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));

});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});



// Routes
require('./routes/home')(app);
//require('./routes/nodeFlowViews')(app);
//require('./routes/queueManagerViews')(app);
//require('./routes/pizzaSiteViews')(app);
//require('./routes/logManagerViews')(app);
//require('./routes/statManagerViews')(app);


// socket.io configuration
var buffer = [];
//var io = require('socket.io').listen(app);


//io.configure(function () { 
//  io.set("transports", ["xhr-polling"]); 
//  io.set("polling duration", 100); 
//});


app.listen(process.env.PORT || 3000);
//console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

logManager.log("Before calling nodeFlowsExpressclient");

var nodeFlowsExpressClient = require("nodeFlowsExpressClient")(app);
