/**
 * Created by User on 07.05.2017.
 */

const database = require('./db-init');

let db = function () {
    const allCarColumns = ['brand', 'model', 'year', 'mileage', 'cost', 'typeOfFuel', 'volume', 'transmission'];
    const carColumns = ['brand', 'model', 'year', 'mileage', 'cost', 'typeOfFuel', 'volume'];
    const allImageColumns = ['id_image', 'photo', 'id_car'];
    let sql;

    function select25(callback) {
        sql = "SELECT " +
            "car.id_car, " +
            carColumns.join(', ') + ", " +
            allImageColumns[1] +" " +
            "FROM car INNER JOIN image " +
            "ON car.id_car=image.id_car " +
            "ORDER BY popularity DESC " +
            "limit 25;";

        database.get().query(sql, function (err, result) {
            if(err)
                throw err;
            callback (result);
        });
    }

    function selectCar(id, callback) {
        sql = "UPDATE car SET popularity = popularity+1 WHERE id_car=" + id["id"] + ";";
        database.get().query(sql);

        sql = "SELECT " +
            carColumns.join(', ') + ",transmission, " + allImageColumns[1] + " "+
            "FROM car INNER JOIN image " +
            "ON car.id_car=image.id_car " +
            "WHERE car.id_car= "+ id["id"] +";";

        database.get().query(sql, function (err, result) {
            if(err)
                throw err;
            callback (result);
        });
    }

    function search(searchEl, callback) {
        sql = "SELECT " +
            carColumns.join(', ') + ", transmission, " +allImageColumns[1] +" "+
            "FROM car INNER JOIN image " +
            "ON car.id_car=image.id_car " +
            "WHERE " +
            "brand='"+searchEl.toLowerCase()+"' OR " +
            "model='"+searchEl.toLowerCase()+"' OR " +
            "typeOfFuel='"+searchEl.toLowerCase()+"' OR " +
            "transmission='"+searchEl.toLowerCase()+"'";

            const number = parseInt(searchEl);
            if(!isNaN(number)) {
                sql += " OR year=" + parseInt(searchEl) + " OR " +
                    "mileage=" + parseInt(searchEl) + " OR " +
                    "cost=" + parseInt(searchEl) + " OR " +
                    "volume=" + parseInt(searchEl) + ";";
            }

        database.get().query(sql, function (err, result) {
            if(err)
                throw err;
            callback (result);
        });
    }
    
    function getUniqueArray(array) {
        let result = [];
        array.forEach(function (elem) {
            for(let key in elem)
                result.push(elem[key]);
        });
        return result;
    }

    function filterData(callback) {
        res={};
        sql = "SELECT DISTINCT brand from car";
        database.get().query(sql, function (err, result) {
            if(err) throw err;
            res["brand"]=getUniqueArray(result);
        });
        sql = "SELECT DISTINCT model from car";
        database.get().query(sql, function (err, result) {
            if(err) throw err;
            res["model"]=getUniqueArray(result);
            callback(res);
        });
    }

    function getBrand(callback) {
        sql = "SELECT DISTINCT brand from car";
        database.get().query(sql, function (err, result) {
            if(err) throw err;
            callback(result);
        });
    }

    function getModel(query, callback) {
        sql = "SELECT DISTINCT model from car";
        if(query.brand)
            sql+=" WHERE brand='"+ query.brand+"'";
        database.get().query(sql, function (err, result) {
            if(err) throw err;
            callback(result);
        });
    }

    function admin(callback) {
        console.log('admin!!!');
        sql = "SELECT *" +
            "from car inner join image " +
            "on car.id_car=image.id_car;";

        database.get().query(sql, function (err, result) {
            if(err)
                throw err;
            callback (result);
        });
    }

    function filter(params, callback) {
        sql = "SELECT " +
            carColumns.join(', ') + ", transmission, " +allImageColumns[1] +" "+
            "FROM car INNER JOIN image " +
            "ON car.id_car=image.id_car ";

        if (Object.keys(params).length != 0){
            sql+="WHERE ";
            if(params["brand"]!=undefined)
                sql+="brand='"+params["brand"]+"' AND ";
            if(params["model"]!=undefined)
                sql+="model='"+params["model"]+"' AND ";
            if(params["dateFrom"]!=undefined)
                sql+="year>="+params["dateFrom"]+" AND ";
            if(params["dateTo"]!=undefined)
                sql+="year<="+params["dateTo"]+" AND ";
            if(params["costFrom"]!=undefined)
                sql+="cost>="+params["costFrom"]+" AND ";
            if(params["costTo"]!=undefined)
                sql+="cost<="+params["costTo"]+" AND ";
            if(params["volumeFrom"]!=undefined)
                sql+="volume>="+params["volumeFrom"]+" AND ";
            if(params["volumeTo"]!=undefined)
                sql+="volume<="+params["volumeTo"]+" AND ";
            if(params["transmission"]!=undefined)
                sql+="transmission='"+params["transmission"]+"' AND ";
            if(params["typeOfFuel"]!=undefined)
                sql+="typeOfFuel='"+params["typeOfFuel"]+"' AND";

            sql=sql.substr(0, sql.length-4);
        }

        database.get().query(sql, function (err, result) {
            if(err)
                throw err;
            callback (result);
        });
    }

    function getEditCar(id, callback) {
        sql = "SELECT " +
            carColumns.join(', ') + ",transmission, " + allImageColumns[1] + " "+
            "FROM car INNER JOIN image " +
            "ON car.id_car=image.id_car " +
            "WHERE car.id_car= "+ id["id"] +";";

        database.get().query(sql, function (err, result) {
            if(err)
                throw err;
            callback (result);
        });
    }

    function executeDelete(data, callback) {
        sql= "DELETE FROM car " +
            "WHERE " +
            "id_car="+data.data;

        database.get().query(sql, function (err, result) {
            if(err)
                throw err;
            callback (result);
        });
    }

    function executeInsert(data, callback) {
        sql="INSERT INTO car " +
            "("
            + allCarColumns.join(',') +
            ")" +
            " VALUES " +
            "(" +
            "'"+data.brand+"'," +
            "'"+data.model+"'," +
            data.year+"," +
            data.mileage+"," +
            data.cost+"," +
            "'"+data.typeOfFuel+"'," +
            data.volume+"," +
            "'"+data.transmission+"'" +
            ");";

        database.get().query(sql, function (err, result) {
            if(err)
                throw err;
            sql="INSERT INTO image " +
                "( photo, id_car ) " +
                "VALUES ("
                +"'"+data.photo+"'" +
                ", (select last_insert_id() from car limit 1));";

            database.get().query(sql, function (err, result) {
                if(err)
                    throw err;

                sql = "SELECT * FROM car INNER JOIN image on car.id_car=image.id_image WHERE car.id_car=(select last_insert_id() from car limit 1);";

                database.get().query(sql, function (err, result) {
                    if (err)
                        throw err;
                    console.log(result);
                    callback(result);
                });
            });
        });
    }

    function executeUpdate(data, callback) {
        sql = "UPDATE car SET " +
            "brand = '" + data.brand +"', " +
            "model = '" + data.model +"', " +
            "year = " + data.year +", " +
            "mileage = " + data.mileage +", " +
            "cost = " + data.cost +", " +
            "typeOfFuel = '" + data.typeOfFuel +"', " +
            "volume = " + data.volume +", " +
            "transmission = '" + data.transmission +"' " +
            "WHERE id_car=" + data.id_car + "; ";

        database.get().query(sql, function (err, result) {
            if(err)
                throw err;
            sql="UPDATE image SET " +
                "photo = '" + data.photo +"' " +
                "WHERE id_car=" + data.id_car + ";";

            database.get().query(sql, function (err, result) {
                if (err)
                    throw err;
                sql = "SELECT * FROM car inner join image on car.id_car=image.id_car WHERE car.id_car =" + data.id_car;
                database.get().query(sql, function (err, result) {
                    if (err)
                        throw err;
                    console.log(result);
                    callback(result);
                });
            });
        });
    }

    return{
        select25 : select25,
        selectCar : selectCar,
        search : search,
        filterData : filterData,
        admin: admin,
        filter : filter,
        getEditCar : getEditCar,
        executeDelete : executeDelete,
        executeInsert : executeInsert,
        executeUpdate : executeUpdate,
        getBrand : getBrand,
        getModel : getModel
    }
}();

module.exports = db;


