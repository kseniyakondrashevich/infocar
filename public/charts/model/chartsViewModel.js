/**
 * Created by User on 25.05.2017.
 */

define(function () {

    let pieChartViewModel = kendo.observable({
        brandShare: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "/pie",
                    dataType: "json",
                    type: "GET"
                }
            }
        })
    });

    let lineChartViewModel = kendo.observable({
        transmissionCost: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "/line",
                    dataType: "json",
                    type: "GET"
                }
            }
        })
    });

    let radarChartViewModel = kendo.observable({
        modelFrequency: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "/radar",
                    dataType: "json",
                    type: "GET"
                }
            }
        })
    });

    let areaChartViewModel = kendo.observable({
        brandCost: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "/area",
                    dataType: "json",
                    type: "GET"
                }
            }
        })
    });

    return{
        switchOn: function () {
            $(document).ready(function () {
                kendo.bind($('#pieChart'), pieChartViewModel);
                kendo.bind($('#lineChart'), lineChartViewModel);
                kendo.bind($('#radarChart'), radarChartViewModel);
                kendo.bind($('#areaChart'), areaChartViewModel);
            })

        }
    }
});