// 引入mongoose
var mongoose = require('mongoose')

var Schema = mongoose.Schema

// 约束数据，保证完整性
var schema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    }
})

// 直接导出模型构造函数
module.exports = mongoose.model('User', schema)