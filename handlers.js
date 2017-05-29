/**
 * Created by User on 07.05.2017.
 */

function home(db) {

    function getHomePage(req, res) {
        res.sendFile(__dirname + '/public/index.html');
    }
    
    function getMainTable(req, res) {
        if(Object.keys(req.query).length == 0){
            db.select25(function (result) {
                res.json(result);
            })
        }
        else if(req.query.id) {
            const searchEl = req.query["id"].split('+').join(' ');
            db.search(searchEl, function (result) {
                res.json(result);
            });
        }
        else {
            db.filter(req.query, function (result) {
                res.json(result);
            })
        }
    }

    function getCar(req, res) {
        db.selectCar(req.query, function (result) {
            res.send(JSON.stringify(result));
        });
    }

    function getSearch(req, res) {
        const searchEl = req.query["id"].split('+').join(' ');
        db.search(searchEl, function (result) {

            res.send(JSON.stringify(result));
        })
    }

    function getFilterData(req, res) {
        db.filterData(function (result) {
            res.json(result);
        })
    }

    function getAdminPage(req, res) {
        db.admin(function (result) {
            res.json(result);
        })
    }

    function getFilter(req, res) {
        console.log('filter');
        db.filter(req.query, function (result) {
            res.json(result);
        })
    }

    function getBrand(req, res) {
        db.getBrand(function (result) {
            res.json(result);
        })
    }

    function getModel(req, res) {
        db.getModel(req.query, function (result) {
            res.json(result);
        })
    }

    function getEditPage(req, res) {
        db.getEditCar(req.query, function (result) {
            res.send(JSON.stringify(result));
        })
    }

    function deleteRecord(req, res) {
        db.executeDelete(req.body, function (result) {
            res.json(result);
        })
    }

    function saveRecord(req, res) {
        db.executeInsert(req.body, function (result) {
            res.json(result);
        })
    }

    function updateRecord(req, res) {
        db.executeUpdate(req.body, function (result) {
            res.json(result);
        })
    }

    function getPieChart(req, res) {
        db.getPie(function (result) {
            res.json(result);
        })
    }

    function getLineChart(req, res) {
        db.getLine(function (result) {
            res.json(result);
        })
    }

    function getRadarChart(req, res) {
        db.getRadar(function (result) {
            res.json(result);
        })
    }

    function getAreaChart(req, res) {
        db.getArea(function (result) {
            res.json(result);
        })
    }

    return{
        getHomePage : getHomePage,
        getMainTable : getMainTable,
        getCar : getCar,
        getSearch : getSearch,
        getFilterData : getFilterData,
        getAdminPage : getAdminPage,
        getFilter : getFilter,
        getEditPage : getEditPage,
        deleteRecord : deleteRecord,
        saveRecord : saveRecord,
        updateRecord : updateRecord,
        getModel : getModel,
        getBrand : getBrand,
        getPieChart: getPieChart,
        getLineChart: getLineChart,
        getRadarChart: getRadarChart,
        getAreaChart: getAreaChart
    }
}

module.exports = home;
