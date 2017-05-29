/**
 * Created by User on 29.05.2017.
 */

define(function () {
   return{
       cars : new kendo.data.DataSource({
           schema: {
               model: { id: "id_car" }
           },
           transport: {
               read: {
                   url: "/tableData",
                   dataType: "json",
                   type: "GET"
               }
           }
       }),

        brands : new kendo.data.DataSource({
            transport:{
                read: {
                    url: "/brand",
                    dataType: "json",
                    type: "GET"
                }
            }
        }),

        models : new kendo.data.DataSource({
            transport:{
                read: {
                    url: "/model",
                    dataType: "json",
                    type: "GET"
                }
            }
        })
   }
});