var mongnoose = require('mongoose');


mongnoose.connect('mongodb://localhost/project', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false});

var Schema = mongnoose.Schema;

var goodsSchema = new Schema({
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
    id:{
        type:String
    },
    num: {
        type: Number,
        required: true
    },
});


//直接导出模型构造函数
module.exports = mongnoose.model('Collection', goodsSchema);