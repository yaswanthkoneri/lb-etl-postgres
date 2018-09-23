'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var IncomingForm = require('formidable').IncomingForm;
var bodyParser = require('body-parser');
var fs = require('fs');

var app = module.exports = loopback();
app.use(bodyParser.urlencoded({extended: true}));
app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

app.route('/api/jobs/fileupload').post(function(req,res){
  var form = new IncomingForm();
  form.parse(req,function(err,fields,files){
      if (err) throw err;
      console.log( typeof files.file)
      console.log(files)
      // console.log("BODY",req.body,fields)
      var data = JSON.stringify(files.file)
      var b = JSON.parse(data)
      console.log(b)
      var oldpath = b.path
      var newpath = `./data/${req.query.name}`;
      console.log("yaswanth",newpath)
      fs.readFile(oldpath,'utf-8',function(err,data){
        if (err) throw err;
        fs.writeFile (newpath, data, function(err) {
          if (err) throw err;
          console.log('complete');
      });
          // res.json({"status":"success"})
      })
  })
})
