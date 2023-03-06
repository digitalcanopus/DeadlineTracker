const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");

const multer = require("multer");
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "attaches");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

app.use(multer({ storage: storageConfig }).single("filedata"));

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const controller = require("./controller/controller");

app.post("/add", urlencodedParser, controller.addTask);

app.use("/", controller.getTasks);

app.set("view engine", "ejs");

// Разрешить Express использовать URL-кодирование
app.use(express.urlencoded({ extended: true }));

// Настройка маршрутов
app.get('/', function(req, res) {
  // Рендеринг страницы index.ejs
  res.render("index");
});

app.post('/', function(req, res) {
  // Обработка данных формы
  const task = req.body.task;
  const status = req.body.status;
  const dueDate = req.body.dueDate;
  const file = req.body.file;

  // Перенаправление на главную страницу
  res.redirect('/');
});

// Запуск сервера
app.listen(3000, function() {
  console.log("Сервер запущен на порту 3000");
});

