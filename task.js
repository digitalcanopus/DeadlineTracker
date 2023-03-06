const fs = require('fs');
const path = require('path');
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'tasks.json'
);

const getTasksFromFile1 = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      console.error(err, 'readfile err');
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
  console.log('read from file successfully 1');
};

module.exports = class Task {
  constructor(id, name, status, deadline, attach) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.deadline = deadline;
    this.attach = attach;
  }

  static getTasksFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        console.error(err, 'readfile err');
        return cb([]);
      }

      cb(null, JSON.parse(fileContent));
    });
  };

  updateTask(taskData, cb) {

    Task.getTasksFromFile((err, tasks) => {
      if (err) return cb(err);
      console.log('!!!!!');

      const index = tasks.findIndex((task) => task.id === taskData.id);
      if (index < 0) {
        return cb(new Error('Task not found'), null);
      }

      tasks[index].status = taskData.status;
      tasks[index].deadline = taskData.deadline;

      fs.writeFile(p, JSON.stringify(tasks), (err) => {
        console.log('ok');
        if (err) return cb(err);
        cb(null, tasks[index]);
      });
    });
  }

  getTaskById(id, cb) {
    fs.readFile(p, (err, data) => {
      if (err) {
        console.error(err, 'readfile err');
        return cb(err);
      }
      const tasks = JSON.parse(data);
      const taskData = tasks.find(t => t.id === id);
      if (!taskData) {
          console.log(tasks);
          console.log(id);
        return cb(new Error(`Task with id ${id} not found`));
      }
      const task = new Task(taskData.id, taskData.name, taskData.status, taskData.deadline, taskData.attach);
      cb(null, task);
    });
  }

  save() {
    getTasksFromFile1((tasks) => {
      tasks.push(this);
      fs.writeFile(p, JSON.stringify(tasks), (err) => {
        console.log(err, 'save err');
      });
    });
  }

  static fetchAll() {
    return new Promise((resolve, reject) => {
      getTasksFromFile1((tasks) => {
        resolve(tasks);
      });
    });
  }
};

