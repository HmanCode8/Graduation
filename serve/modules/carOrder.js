var mongnoose = require('mongoose');


mongnoose.connect('mongodb://localhost/project', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false});

var Schema = mongnoose.Schema;

var carSchema = new Schema({
    arr: [
        {
        type: Object
         }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
});


//直接导出模型构造函数
module.exports = mongnoose.model('Carorder', carSchema);