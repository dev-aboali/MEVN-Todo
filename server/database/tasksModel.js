const db = require('./connection');
const Joi = require('joi');

const schema = Joi.object().keys({
    title: Joi.string().required()
});

const tasks = db.get('tasks');

function getAllTasks() {
    return tasks.find({});
}

function createNewTask(task) {
    const result = Joi.validate(task, schema);   
    if(result.error === null) {
        return tasks.insert(task);
    } else {
        return Promise.reject(result.error);
    }
}

function deleteTask(id) {
    return tasks.remove({_id: id});
}

module.exports = {
    createNewTask,
    getAllTasks,
    deleteTask
}