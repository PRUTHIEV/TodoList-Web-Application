const express = require("express");
const morgan = require("morgan");
const bp = require("body-parser");

const app = express();
app.use(morgan("dev"));
app.use(bp.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

var today = new Date();
var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
};
const currentDayYear = today.toLocaleDateString("en-US", options);
var todoList = [
    "Code in CodeChef ,Codeforces , Leetcode",
    "Android Application Development",
    "MERN stack Web Development",
];

var timeTable = [];

app.get("/", function (req, res) {
    res.status(200).render("index", {
        day: currentDayYear,
        type: "TodoList",
        items: todoList,
    });
});

app.get("/timetable", function (req, res) {
    res.render("index", {
        day: currentDayYear,
        type: "Time Table",
        items: timeTable,
    });
});
app.post("/", function (req, res) {
    console.log(req.body);
    const item = req.body.item;
    if ((req.body.name = "Time Table")) {
        timeTable.push(item);
        res.redirect("/timetable");
    } else {
        todoList.push(item);
        res.redirect("/");
    }
});
app.listen(process.env.PORT || 3000, function (err) {
    if (err) {
        console.log("Error occured " + err);
    } else {
        console.log("The server has started at port number ");
    }
});
