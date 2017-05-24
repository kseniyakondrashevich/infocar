/**
 * Created by User on 07.05.2017.
 */

requirejs.config({
    paths: {
        "just" : "./scripts/just.min",
        "render" : "./scripts/rendering",

        "home" : "./main_table/model/homePage",
        "mainView": "./main_table/model/mainModel",
        "mainTable" : "./main_table/presenter/mainTable",

        "car" : "./car/model/car",
        "carProfile" : "./car/presenter/carProfile",
        "editCar" : "./car/presenter/editCar",

        "searchF" : "./search/model/searchAndFilter",
        "filter" : "./search/presenter/filter",
        "search" : "./search/presenter/search",

        "admin" : "./admin/model/adminPage",
        "adminTable" : "./admin/presenter/admin"

    }
});

require(['home', 'car', 'searchF', 'admin', 'mainView'], function (home, car, searchF, admin, mainView) {

    $(window).on('hashchange', function () {
        let pathname = window.location.pathname;
        let hash = window.location.hash;
        let url = pathname+hash;

        if(/^\/$/.test(url)){
            $('#main-container').load('/main_table/view/mainTable.html', function () {
                mainView.switchOn();
            });

        }
        else if(/^\/#car\/\?id=.*/.test(url)){
            car.getCarProfile(hash.substr(9, hash.length));
        }
        else if(/^\/#search\/\?id=.*/.test(url)){
            searchF.getSearchPage(hash.substr(12, hash.length));
        }
        else if(/^\/#admin\/?$/.test(url)){
            alert(0);
            $('#main-container').load('/admin/view/adminGrid.html');
        }
        else if(/^\/#filter\/\?.*/.test(url)){
            searchF.getFilterPage(hash.substr(9, hash.length));
        }
        else if(/^\/#admin\/edit\/\?id=.*/.test(url)){
            car.getEditPage(hash.substr(16, hash.length));
        }
        else if(/^\/#admin\/delete\/\?id=.*/.test(url)){
            car.deleteCar(hash.substr(18, hash.length));
        }
        else if(/^\/#admin\/new\/?$/.test(url)){
            car.getNewPage();
        }
        else if(/^\/#admin\/new\/save\/?$/.test(url)){
            car.getSavePage();
        }

    });

    $(window).trigger('hashchange');

});
