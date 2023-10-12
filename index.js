import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const date = new Date();
const dayOfWeek = daysOfWeek[date.getDay()];
const month = months[date.getMonth()]
const day = date.getDate();

app.use(bodyParser.urlencoded({ extended: true }));


let newItems = [];
let workItems = [];
app.get("/", (req, res) => {
    res.render("index.ejs", {dayOfWeek: dayOfWeek, month: month, day: day, newListItems: newItems});
})

app.get("/work", (req, res) => {
    res.render("work.ejs", {workListItems: workItems});
})


app.post('/', (req,res) => {

    if (req.body.newItem){
        let newItem = req.body.newItem;
        newItems.push(newItem);
        res.render("index.ejs", {dayOfWeek: dayOfWeek, month: month, day: day, newListItems: newItems});
    }
    else{
        let workItem = req.body.workItem;
        workItems.push(workItem);
        res.render("work.ejs", {workListItems: workItems});
    }

    
})
app.listen(3000, () => {

    console.log(`Server running on port ${port}.`);
});