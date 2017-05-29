/**
 * Created by User on 29.05.2017.
 */

define(['data'], function (data) {
    return{
        mainModel : kendo.observable({
            cars: data.cars,
            setCars : function () {
                this.cars.read();
            },
            searchHref : function () {
                if(this.get("search")){
                    let searchStr = this.get("search").split(' ').join('+');
                    return "#/search?id="+ searchStr;
                }
                else return "";
            }
        })
    }
});