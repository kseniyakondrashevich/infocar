/**
 * Created by User on 29.05.2017.
 */

define(['data'], function (data) {
    return{
        detailsModel : kendo.observable({
            current: {},
            getName: function () {
                return (this.get("current").brand + " " + this.get("current").model);
            },
            getCost: function () {
                let str = this.get("current").cost+"BYN" +
                        " --" + ((this.get("current").cost)*0.53).toFixed(1)+"$" +
                        " --" + ((this.get("current").cost)*0.48).toFixed(1)+"euro";
                return str;
            },

            setCurrent: function (itemID) {
                this.set("current", data.cars.get(itemID));
            }
        })
    };
});