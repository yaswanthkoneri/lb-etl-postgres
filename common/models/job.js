'use strict';

var formidable = require('formidable');

module.exports = function(Job) {
    Job.beforeRemote('create',function(ctx,job,next){
        var req = ctx.req
        console.log(req)
        var form = new formidable.IncomingForm();
        form.parse(req,function(err,fields,files){
            var oldpath = files.filetoupload.path
            var newpath = `../data/${ctx.body.name}`;
            fs.rename(oldpath,newpath,function(err){
                if (err) throw err;
                next();
            })
        })
    })
};
