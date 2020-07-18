var mongnoose = require('mongoose');


mongnoose.connect('mongodb://localhost/project', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false});

var Schema = mongnoose.Schema;

var addressSchema = new Schema({

    phone:{
        type:String,
        required:true
    },
    areaCode:{
        type:String,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    tel: {
        type: Number,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    addressDetail: {
        type: String,
        required: true
    },
    postalCode: {
        type: Number,
        required: true
    },
    chosenAddressId: {
        type: Number,
        default:0
    },
    checked: {
        type: String,
        default:false
    },
    isDefault:{
        type:String,
        enm:[false,true]
    }
});


//直接导出模型构造函数
module.exports = mongnoose.model('Address', addressSchema);