var mongnoose = require('mongoose');

mongnoose.connect('mongodb://localhost/project',{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false});

var Schema = mongnoose.Schema;
var adminSchema = new Schema({
    user:{
        type:String,
        required:true,
    },
    password:{
        type:Number,
        required:true,
    }
});

module.exports = mongnoose.model('Admin',adminSchema)