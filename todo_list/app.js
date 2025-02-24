const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const morgan = require("morgan");


const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.set("view engine", "ejs");

app.use(express.static("public"));



const getTasks = () => {
    if (!fs.existsSync("tasks.json")) return [];
    const data = fs.readFileSync("tasks.json", "utf8");
    return JSON.parse(data || "[]");
};


const saveTasks = (tasks) => {
    fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
};


app.get("/", (req, res) => {
    res.redirect("/tasks");
});


app.get("/tasks", (req, res) => {
    const tasks = getTasks();
    res.render("tasks", { tasks });
});


app.get("/task", (req, res) => {
    const tasks = getTasks();
    const task = tasks.find(t => t.id == req.query.id);
    res.render("task", { task });
});


app.get("/add-task", (req, res) => {
    res.render("addTask");
});


app.post("/add-task", (req, res) => {
    let tasks = getTasks();
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
    };
    tasks.push(newTask);
    saveTasks(tasks);
    res.redirect("/tasks");
});



// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});