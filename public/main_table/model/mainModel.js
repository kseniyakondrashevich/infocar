/**
 * Created by User on 23.05.2017.
 */


define(function () {
    let mainViewModel = kendo.observable({
        isVisible: false,

        cars: new kendo.data.DataSource({
            schema: {
                model: {
                    car_id: "car_id",
                    /*brand: "brand",
                     model: "model",
                     mileage: "mileage",
                     cost: "cost"*/
                }
            },
            transport:{
                read:{
                    url: "/tableData",
                    dataType: "json",
                    type: "GET"
                }
            }
        })
    });

    return{
        switchOn: function () {
            $(document).ready(function () {
                kendo.bind($("#mainView"), mainViewModel);
            })

        }
    }
});


    /*mainViewModel.cars.fetch().then(function () {
        let data = mainViewModel.cars.data();
    });*/





