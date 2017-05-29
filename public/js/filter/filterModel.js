/**
 * Created by User on 29.05.2017.
 */

define(['data'], function (data) {
    return{
        filterModel : new kendo.observable({
            selected: {},
            cars: data.cars,
            brands: data.brands,
            models: data.models,
            onSelect: function (e) {
                let selectedItem = e.item.text();
                this.models.read({brand: selectedItem});
            },
            onClick: function (e) {
                e.preventDefault();
                let obj={};
                obj.brand=this.selected.brand || undefined;
                obj.model=this.selected.model || undefined;
                obj.yearFrom=(this.selected.year!=undefined ? this.selected.year[0]: undefined);
                obj.yearTo=(this.selected.year!=undefined ? this.selected.year[1]: undefined);
                obj.costFrom=(this.selected.cost!=undefined ? this.selected.cost[0]: undefined);
                obj.costTo=(this.selected.cost!=undefined ? this.selected.cost[1]: undefined);
                obj.mileage=this.selected.mileage || undefined;
                obj.volume=this.selected.volume || undefined;
                obj.transmission=this.selected.transmission || undefined;
                obj.typeOfFuel=this.selected.typeOfFuel || undefined;
                this.cars.read(obj);
            }
        })
    }
});