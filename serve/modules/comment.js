var mongnoose = require('mongoose');


mongnoose.connect('mongodb://localhost/project', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false});

var Schema = mongnoose.Schema;

var carSchema = new Schema({

    phone:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    nikname:{
        type:String,
    },
    aId:{
        type:String,
        required:true
    },
    input:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});


//直接导出模型构造函数
module.exports = mongnoose.model('Comment', carSchema);