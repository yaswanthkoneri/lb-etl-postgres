'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var IncomingForm = require('formidable').IncomingForm;
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

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

function readFile(srcPath) {
  return new Promise(function (resolve, reject) {
      fs.readFile(srcPath, 'utf8', function (err, data) {
          if (err) {
              reject(err)
          } else {
              resolve(data);
          }
      });
  })
}

function writeFile(savPath, data) {
  return new Promise(function (resolve, reject) {
      fs.writeFile(savPath, data, function (err) {
          if (err) {
              reject(err)
          } else {
              resolve();
          }
      });
  })
}

app.route('/api/jobs/fileupload').post(function(req,res){
  var form = new IncomingForm();
  form.parse(req,function(err,fields,files){
      if (err) throw err;
      var data = JSON.stringify(files.file)
      var b = JSON.parse(data)
      var oldpath = b.path
      var newpath = `${__dirname}/data/${req.query.name}.csv`
      readFile(oldpath).then(function(results){
        return writeFile(newpath,results);
      }).then(function(){
        //done writing file, can do other things
     })
  })
})

app.route('/download/:id').get(function(req, res){
    // var file = `${__dirname}/data/${req.query.name}`;
    var file = `${__dirname}/data/${req.params.id}`;
    res.download(file); // Set disposition and send it.
});
