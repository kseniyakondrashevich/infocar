/**
 * Created by User on 29.05.2017.
 */

define(['data'], function (data) {
   return{
       searchModel : new kendo.observable({
           cars: data.cars,
           setSearchResults: function (searchParams) {
               this.cars.read({id: searchParams});
           },
           carClick: function () {

           }
       })
   }
});