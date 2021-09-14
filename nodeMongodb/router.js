let express = require('express')
let router = express.Router()
const Students = require('./models/students')
const Users = require('./models/users')
// 列表展示页面
router.get('/', function(req, res) {
    Students.find(function(err, students) {
        if (err) {
            return res.status(500).status(500).send('Server error')
        }
        // let students = JSON.parse(data).students
        res.render('index.html', {
            students: students
        });
    })
})



// router.get('/', function(req, res) {
//     Students.find(function(err, students) {
//         if (err) {
//             return res.status(500).status(500).send('Server error')
//         }
//         // let students = JSON.parse(data).students
//         res.render('index.html', {
//             students: students
//         });
//     })
// })

// 登陆页面
router.get('/login', function (req, res) {
    res.render('login.html')
})

//  登陆
router.post('/login', function(req, res) {
    const { name, password } = req.body;
    console.log(req.body)
    Users.findOne({username: name, password}, function(err, ret) {
        console.log(err, ret)
        if (err) {
            return res.status(500).send(err)
        }
        res.redirect('/')
    })
})

// 注册页面
router.get('/signup', function (req, res) {
    res.render('signup.html')
})

//  注册
router.post('/signup', function (req, res) {
    Users.create(req.body, function(err) {
        if (err) {
            return res.status(500).send('注册失败')
        }
        res.redirect('/login')
    })
})

// 添加学生页面
router.get('/post', function(req, res) {
    res.render('post.html')
})

// 添加学生操作
router.post('/students/new', function(req, res) {
    new Students(req.body).save(function(err) {
        if (err) {
            return res.status(500).send('Server error')
        }
        res.redirect('/')
    })
})

// 编辑学生页面
router.get('/students/edit', function(req, res) {
    // console.log(req.query.id)
    var id = req.query.id.replace(/"/g,  '')
    Students.findById(id,function(err, student) {
        if (err) {
            return res.status(500).send('Server error')
        }
        console.log(student)
        res.render('edit.html', {
            student: student
        })
    } )
})

// 编辑学生信息
router.post('/students/edit', function(req, res) {
    console.log(req.body)
    var id = req.body._id.replace(/"/g,  '')
    req.body._id = id
    Students.findByIdAndUpdate(id, req.body, function(err) {
        if (err) {
            return res.status(500).send(err)
        }
        res.redirect('/')
    })
})

// 删除学生操作
router.get('/delete', function(req, res) {
    var id = req.query.id.replace(/"/g,  '')
    Students.findByIdAndRemove(id, function(err,) {
        if (err) {
            return res.status(500).send('Server error')
        }
        res.redirect('/')
    })
})

// 访问不存在的路由时，展示404.html
router.use(function(req, res) {
    res.render('404.html')
})

module.exports = router