const Task = require("../model/task.js");

exports.getTasks = function (request, response) {
    response.render("tasks", {
        tasks: Task.getAll()
    })
};

exports.addTask = function (req, res, next) {
    const name = req.body.name;
    const status = req.body.status;
    const deadline = req.body.deadline;
    //const attach = req.file.originalname;
    let attach = null;
    if (req.file && req.file.originalname) {
        attach = req.file.originalname;
    }
    const task = new Task(name, status, deadline, attach);
    task.save();
    res.redirect("/");
};