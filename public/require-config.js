/**
 * Created by User on 13.05.2017.
 */

requirejs.config({
    paths: {
        "just" : "./scripts/just.min",
        "render" : "./scripts/rendering",

        "home" : "./main_table/model/homePage",
        "mainTable" : "./main_table/presenter/mainTable",

        "car" : "./car/model/car",
        "carProfile" : "./car/presenter/carProfile",
        "editCar" : "./car/presenter/editCar"

    }
});