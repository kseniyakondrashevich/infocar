/**
 * Created by User on 29.05.2017.
 */

define(function () {
    return{
        pieChartModel : kendo.observable({
            brandShare: new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "/pie",
                        dataType: "json",
                        type: "GET"
                    }
                }
            })
        }),

    lineChartModel : kendo.observable({
        transmissionCost: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "/line",
                    dataType: "json",
                    type: "GET"
                }
            }
        })
    }),

    radarChartModel : kendo.observable({
        modelFrequency: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "/radar",
                    dataType: "json",
                    type: "GET"
                }
            }
        })
    }),

    areaChartModel : kendo.observable({
        brandCost: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "/area",
                    dataType: "json",
                    type: "GET"
                }
            }
        })
    })
    }
});