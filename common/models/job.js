'use strict';

var IncomingForm = require('formidable').IncomingForm;

module.exports = function(Job) {
    Job.beforeRemote('create',function(ctx,job,next){
        var req = ctx.req
        var form = new IncomingForm();
        form.parse(req,function(err,fields,files){
            if (err) throw err;
            console.log( typeof files.file)
            console.log(files.file)
            var oldpath = files.filetoupload.path
            var newpath = `../data/${ctx.body.name}`;
            fs.rename(oldpath,newpath,function(err){
                if (err) throw err;
                next();
            })
        })
    })
};
