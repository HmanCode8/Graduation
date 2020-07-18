var mongnoose = require('mongoose');


mongnoose.connect('mongodb://localhost/project', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false});

var Schema = mongnoose.Schema;

var orderSchema = new Schema({
    phone:{
        type:String,
        required:true
    },
    payment:{
        type:String,
        required:true
    },
    aId:{
        type:String,
        // required:true
    },
    img:[
        {
            type:String,
            required:true
        }
    ],
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    num: {
        type: Number,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    sale: {
        type: String,
        default: '免费配送'
    },
    shuliang:{
        type:Number,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size:{
        type:String,

    },
    color:{
        type:String,

    }
});

//直接导出模型构造函数
module.exports = mongnoose.model('Order', orderSchema);