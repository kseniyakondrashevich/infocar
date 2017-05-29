requirejs.config({
    paths: {
        "data" : "./js/data",

        "main" : "./js/main/mainModel",
        "details" : "./js/details/detailsModel",
        "search" : "./js/search/searchModel",
        "filter" : "./js/filter/filterModel",
        "chart" : "./js/charts/chartModels",

        "admin" : "./js/admin/adminModel"
    }
});

require(['data', 'main', 'details', 'search', 'filter', 'chart', 'admin'], function (data, main, details, search, filter, chart, admin) {

    let layout =new kendo.Layout('<header></header><div id="main-container"></div><footer></footer>');
    let searchView = new kendo.View('search-filter-template');
    let mainView = new kendo.View('main-view-template', {model: main.mainModel});
    let carDetails = new kendo.View('car-details', {model: details.detailsModel});
    let searchResults = new kendo.View('results-template', {model: search.searchModel});
    let filterView = new kendo.View('filter-template', {model: filter.filterModel});
    let adminView = new kendo.View('<div id="grid"></div>');
    let chartView = new kendo.View('chart-template');
    let pieChart = new kendo.View('pie-chart-template', {model: chart.pieChartModel});
    let lineChart = new kendo.View('line-chart-template', {model: chart.lineChartModel});
    let radarChart = new kendo.View('radar-chart-template', {model: chart.radarChartModel});
    let areaChart = new kendo.View('area-chart-template', {model: chart.areaChartModel});




    let mainRouter = new kendo.Router({
        routeMissing: function(e) { console.log(e.url) } ,
        init: function () {
            layout.render($('#body'));
        }
    });

    mainRouter.route("/", function() {
        main.mainModel.setCars();
        layout.showIn('#main-container', mainView);
    });

    mainRouter.route("/car/:id", function (itemID) {
        data.cars.fetch(function (e) {
            if (details.detailsModel.get("current")) {
                layout.showIn("#main-container", carDetails);
                details.detailsModel.setCurrent(itemID);
            } else {
                details.detailsModel.setCurrent(itemID);
                layout.showIn("#main-container", carDetails);
            }
        });
    });

    mainRouter.route("/search", function (params) {
        search.searchModel.setSearchResults(params.id);
        layout.showIn('#main-container', searchView);
        layout.showIn('#results-place', searchResults);
        layout.showIn('#filter-place', filterView);
    });

    mainRouter.route("/charts", function () {
        layout.showIn('#main-container', chartView);
        layout.showIn('#radar-place', radarChart);
        layout.showIn('#pie-place', pieChart);
        layout.showIn('#line-place', lineChart);
        layout.showIn('#area-place', areaChart);
    });

    mainRouter.route("/admin", function () {
        layout.showIn('#main-container', adminView);
        admin.initGrid($('#grid'));

    });

    $(function() {
        mainRouter.start();
    });
});




