const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 1.连接数据库
// 指定连接的数据库不需要存在，当你插入第一条数据之后就会被自动创建出来
mongoose.connect('mongodb://localhost/test');
//2. 设计文档结构（表结构）
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，不要有脏数据
var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        require: true
    },
    age: {
        type: Number
    }

    // username: {
    //     type: String,
    //     required: true
    // },
    // password: {
    //     type: String,
    //     require: true
    // },
    // email: {
    //     type: String
    // }
})

// 3.将文档结构发布为模型
//      mongooes.model方法是用来将一个架构发布为model
//      第一个参数：传入一个大写名词单数字符串用来表示你的数据库名称
//                                 mooogoes会自动将大写名词的 字符串生成小写复数的集合名称
//                                  例如这里的User最终会变为users集合名称
//      第二个参数：架构Schema
//      返回值：模型构造函数
var User = mongoose.model('Student', userSchema)

var admin = new User({
    name: 'zs',
    sex: '男',
    age: 18
})

admin.save(function(err, ret) {
    if (err) {
        console.log('保存失败')
    } else {
        console.log('保存成功')
        console.log(ret)
    }
})

// 新增数据
// var admin = new User({
//     username: 'zs',
//     password: 'zs',
//     email: '1104133568@qq.com'
// })

// admin.save(function(err, ret) {
//     if (err) {
//         console.log('保存失败')
//     } else {
//         console.log('保存成功')
//         console.log(ret)
//     }
// })

// 查询所有
// User.find(function(err, ret) {
//     if (err) {
//         console.log('查询失败')
//     } else {
//         console.log(ret)
//     }
// })

// 条件查询
// User.findOne({username: 'zs'}, function(err, ret) {
//     if (err) {
//         console.log('查询失败')
//     } else {
//         console.log(ret)
//     } 
// })
