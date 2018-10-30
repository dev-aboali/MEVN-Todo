const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Tasks = require('./database/tasksModel');
const app = express();
const port = process.env.PORT || 5555;
const cors = require('cors');


app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Allow CORS Insurance 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//get all tasks
app.get('/api/tasks', (req, res, next) => {
    Tasks.getAllTasks().then(tasks => {
        res.json(tasks);
    });
});

// handle new tasks
app.post('/api/tasks/add', (req, res, next) => {
   Tasks.createNewTask(req.body)
    .then(message => res.json(message))
    .catch(err => {
        res.status(500);
        console.log(err);
    });
});

// delete tasks
app.delete('/api/tasks/:id', (req, res, next) => {
    Tasks.deleteTask(req.params.id)
        .then(response => res.json(response))
        .catch(err => {
            res.status(500);
            console.log(err)
        })
});


app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
});