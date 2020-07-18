var mongnoose = require('mongoose');


mongnoose.connect('mongodb://localhost/project', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false});

var Schema = mongnoose.Schema;

var goodsSchema = new Schema({
    title:{
        type:String,
        default: 'newarrival'
    },
    types:{
        type:String,
        required:true
    },
    img: [
        {
            type: String,
            required: true
        }
    ],
    text: {
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
    type: {
        type: String,
    },
    checked: {
        type: String,
        default:true,
        enum:[true,false]
    }
});


//直接导出模型构造函数
module.exports = mongnoose.model('Good', goodsSchema);