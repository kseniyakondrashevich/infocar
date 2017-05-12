/**
 * Created by User on 07.05.2017.
 */

const express = require('express');
const handle = require('./mainRoute');
const bodyParser = require('body-parser');
const database = require('./db-init');

const app = express();


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
//app.set('views engine', 'html');


database.get(function (err) {
    if(err){
        console.log('Unable connection to MySQL. ');
        process.exit(1);
    }
    else{
        app.listen(8080, function () {
            console.log('Express server listening on port 8080');
        });
        app.use(handle);
    }
});






