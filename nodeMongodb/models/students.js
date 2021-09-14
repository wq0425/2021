// 引入mongoose
var mongoose = require('mongoose')

var Schema = mongoose.Schema

// 约束数据，保证完整性
var schema = new Schema({
    name: {
        type: String,
        required: true
    },
    sex: {
        type: String
    },
    age: {
        type:Number
    }
})

// 直接导出模型构造函数
module.exports = mongoose.model('Student', schema)