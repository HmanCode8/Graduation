var mongnoose = require('mongoose');


mongnoose.connect('mongodb://localhost/project', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false});

var Schema = mongnoose.Schema;

var carSchema = new Schema({
    phone:{
        type:String,
        required:true
    },
    img: [
        {
            type: String,
            required: true
        }
    ],
    id:{
        type:String
    },
    text: {
        type: String,
        required: true
    },
    add: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    passprice: {
        type: Number,
    },
    num: {
        type: Number,
        required: true
    },
    // shuliang: {
    //     type: Number,
    //     required: true
    // },
    type: {
        type: Object,
    },
    checked: {
        type: Number,
        default:false
    },
    size:[
        {
            type: String,
        },
    ],
    color:[
        {
            type: String,
        },
    ],

});


//直接导出模型构造函数
module.exports = mongnoose.model('Car', carSchema);