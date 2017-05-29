/**
 * Created by User on 07.05.2017.
 */

const mysql = require('promise-mysql');
const async = require('async');
let jsonObj =require('./json/cars.json');

let db = function() {

    let connection = null;

    function get(done) {
        if(!connection){
            mysql.createConnection({
                host : 'localhost',
                user: 'root',
                password: 'root',
                database: 'coursesdb',
            }).then(function(conn){
                connection=conn;
                done();
            });

        }
        else {
            return connection;
        }
    }

    function fixtures(data, done) {
        if (!connection) return done(new Error('Missing database connection.'));

        let names = Object.keys(data.tables);
        async.each(names, function(name, cb) {
            async.each(data.tables[name], function(row, cb) {
                let keys = Object.keys(row);
                let values = keys.map(function(key) { return "'" + row[key] + "'" });

                connection.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
            }, cb)
        }, done)
    }

    function initInsert(done) {
        if (!connection) return done(new Error('Missing database connection.'));

        const keys = ['brand', 'model', 'year', 'mileage', 'cost', 'typeOfFuel', 'volume', 'transmission'];

        let brand = [], img, model=[], data = [];
        let newObj = jsonObj["brand"];
        for (key in newObj)
            brand.push(key);

        for (let i = 0; i < 100; i++) {
            data[0] = random(brand);
            data[1] = random(newObj[data[0]][0]);
            data[2] = random(jsonObj["year"]);
            data[3] = random(jsonObj["mileage"]);
            data[4] = random(jsonObj["cost"]);
            data[5] = random(jsonObj["typeOfFuel"]);
            data[6] = random(jsonObj["volume"]);
            data[7] = random(jsonObj["transmission"]);

            img = random(newObj[data[0]][1]);

            connection.query("INSERT INTO coursesdb.car " +
                "("
                + keys.join(',') +
                ")" +
                " VALUES " +
                "(" +
                "'"+data[0]+"'," +
                "'"+data[1]+"'," +
                data[2]+"," +
                data[3]+"," +
                data[4]+"," +
                "'"+data[5]+"'," +
                data[6]+"," +
                "'"+data[7]+"'" +
                ");");
            connection.query("INSERT INTO coursesdb.image " +
                "( photo, id_car ) " +
                "VALUES ("
                +"'"+img+"'" +
                ", (select last_insert_id() from coursesdb.car limit 1));");
        }
    }

    function createDatabase() {

        sqlQuery = 'CREATE TABLE IF NOT EXISTS `coursesdb`.`car` (' +
            '`id_car` INT NOT NULL AUTO_INCREMENT,' +
            '`brand` VARCHAR(45) NOT NULL,' +
            '`model` VARCHAR(45) NOT NULL,' +
            '`year` VARCHAR(45) NOT NULL,' +
            '`mileage` FLOAT NOT NULL,' +
            '`cost` FLOAT NOT NULL,' +
            '`typeOfFuel` VARCHAR(45) NOT NULL,' +
            '`volume` FLOAT NOT NULL,' +
            '`transmission` VARCHAR(45) NOT NULL,' +
            '`popularity` INT NULL,' +
            'PRIMARY KEY (`id_car`),' +
            'UNIQUE INDEX `id_car_UNIQUE` (`id_car` ASC)); ';

        sqlQuery += 'CREATE TABLE IF NOT EXISTS `coursesdb`.`image` (' +
            '`id_image` INT NOT NULL AUTO_INCREMENT,' +
            '`photo` VARCHAR(45) NOT NULL,' +
            '`id_car` INT NOT NULL,' +
            'PRIMARY KEY (`id_image`),' +
            'UNIQUE INDEX `id_image_UNIQUE` (`id_image` ASC),' +
            'INDEX `id_car_idx` (`id_car` ASC),' +
            'CONSTRAINT `id_car`' +
            'FOREIGN KEY (`id_car`)' +
            'REFERENCES `coursesdb`.`car` (`id_car`)' +
            'ON DELETE CASCADE' +
            'ON UPDATE CASCADE); ';

        connection.query(sqlQuery);
    }
    
    function random(arr) {
        let rand = Math.floor(Math.random() * arr.length);
        return arr[rand];
    }

    return{
        get : get,
        fixtures : fixtures,
        initInsert : initInsert,
        createDatabase : createDatabase
    }

}();

module.exports = db;

