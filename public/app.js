/**
 * Created by User on 07.05.2017.
 */

requirejs.config({
    paths: {
        "just" : "./scripts/just.min",
        "render" : "./scripts/rendering",

        "home" : "./main_table/model/homePage",
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

require(['home', 'car', 'searchF', 'admin'], function (home, car, searchF, admin) {

    $(window).on('hashchange', function () {
        let pathname = window.location.pathname;
        let hash = window.location.hash;
        let url = pathname+hash;
        alert(0);

        if(/^\/$/.test(url)){
            home.homePage();
        }
        else if(/^\/#car\/\?id=.*/.test(url)){
            car.getCarProfile(hash.substr(9, hash.length));
        }
        else if(/^\/#search\/\?id=.*/.test(url)){
            searchF.getSearchPage(hash.substr(12, hash.length));
        }
        else if(/^\/#admin\/?$/.test(url)){
            admin.getAdminPage();
        }
        else if(/^\/#filter\/\?.*/.test(url)){
            searchF.getFilterPage(hash.substr(9, hash.length));
        }
        else if(/^\/#admin\/edit\/\?id=.*/.test(url)){
            alert(1);
            car.getEditPage(hash.substr(16, hash.length));
        }
        else if(/^\/#admin\/delete\/\?id=.*/.test(url)){
            car.deleteCar(hash.substr(18, hash.length));
        }

    });

    $(window).trigger('hashchange');

});
