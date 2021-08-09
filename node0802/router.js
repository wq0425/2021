let express = require('express')
let router = express.Router()
const Students = require('./student')

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

// 添加学生页面
router.get('/post', function(req, res) {
    res.render('post.html')
})

// 添加学生操作
router.post('/students/new', function(req, res) {
    Students.save(req.body, function(err) {
        if (err) {
            return res.status(500).send('Server error')
        }
        res.redirect('/')
    })
})

// 删除学生操作
router.get('/delete', function(req, res) {
    Students.delete(req.query.id, function(err) {
        if (err) {
            return res.status(500).send('Server error')
        }
        res.redirect('/')
    })
})

module.exports = router