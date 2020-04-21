const mysql = require('mysql');
const util = require('util');

const { MongoClient, ObjectID } = require('mongodb');
let url = 'mongodb+srv://lian:asd123@dbjc11-gitmg.mongodb.net/test?retryWrites=true&w=majority';

const db = mysql.createConnection({
    host : 'db4free.net',
    user : 'aldrich',
    password : 'neil1804',
    database : 'todoappneil',
    port : 3306
});

// const db = mysql.createConnection({
//     host : 'localhost',
//     user : 'Aldrich',
//     password : 'neil1804',
//     database : 'todo-app',
//     port : 3306
// });

const query = util.promisify(db.query).bind(db);

module.exports = {
    db,
    query,
    mongo : {
        MongoClient,
        ObjectID,
        url
    }
};