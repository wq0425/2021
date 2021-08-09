const fs = require('fs')
var dbPath =  './db.json'

/**
 * 获取所有学生列表
 */
exports.find = function(callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
}

 /**
  * 添加学生
  */
exports.save = function(student, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err)
        }
        let students = JSON.parse(data).students
        student.id = students[students.length - 1].id + 1
        students.push(student)
        let fileData = JSON.stringify({
            students: students
        })
        // console.log(students, student)
        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                return callback(err)
            }
            return callback(null)
        })
    })
}

  /**
   * 更新学生
   */
exports.updata = function() {

}

   /**
    * 删除学生
    */
exports.delete = function(id, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err)
        }
        let students = JSON.parse(data).students;
        let deleteId = students.findIndex(item => {
            return item.id === parseInt(id)
        })
        students.splice(deleteId, 1)
        let newStudents = JSON.stringify({
            students
        })
        fs.writeFile(dbPath, newStudents, function(err) {
            if (err) {
                return callback(err)
            }
            return callback(null)
        })
    })
}