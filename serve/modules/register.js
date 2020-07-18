var mongnoose = require('mongoose');


mongnoose.connect('mongodb://localhost/project', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false});

var Schema = mongnoose.Schema;

var userSchema = new Schema({
    sex:{
        type:String,
        enm: ['男','女'],
        default:'男'
    },
    nikname:{
        type:String,
        default:'dafaultniknameisheshiheng'
    },
    number: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    role: {
        type: String,
        default: '普通会员'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//直接导出模型构造函数
module.exports = mongnoose.model('Register', userSchema);