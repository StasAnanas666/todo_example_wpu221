const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

//инициализация бд
const db = new sqlite3.Database("./todos.db");

//создание таблицы после инициализации бд
db.serialize(() => {
    db.run("create table if not exists tasks(id integer primary key  autoincrement, title text, deadline datetime, priority text)");
})

//получение всех задач
app.get("/tasks", (req, res) => {
    db.all("select * from tasks", (err, rows) => {
        if(err) {
            return res.status(500).json({error: err.message});
        }
        res.json(rows);
    })
})

//добавление новой задачи
app.post("/tasks", (req, res) => {
    const {title, deadline, priority} = req.body;
    db.run("insert into tasks(title, deadline, priority) values(?,?,?)", [title, deadline, priority], (err) => {
        if(err) {
            return res.status(500).json({error: err.message});
        }
        res.json({id: this.lastID});//id последнего добавленного элемента
    })
})

//изменение задачи
app.put("/tasks/:id", (req, res) => {
    const {id} = req.params;
    const {title, deadline, priority} = req.body;
    db.run("update tasks set title=?, deadline=?, priority=? where id=?", [title, deadline, priority, id], (err) => {
        if(err) {
            return res.status(500).json({error: err.message});
        }
        res.json({changes: this.changes});//количество измененных строк
    })
})

//удаление задачи
app.delete("/tasks/:id", (req, res) => {
    const {id} = req.params;
    db.run("delete from tasks where id=?", id, err => {
        if(err) {
            return res.status(500).json({error: err.message});
        }
        res.json({deleted: this.changes});//количество измененных строк
    })
})

//запуск сервера
app.listen(port, () => {
    console.log("Сервер запущен по адресу: http://localhost:5000");
})