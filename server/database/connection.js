const monk = require('monk');
const connection = 'localhost:27017/todo';
const db = monk(connection);

module.exports = db;
