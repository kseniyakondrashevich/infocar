/**
 * Created by User on 13.05.2017.
 */


define(['carProfile', 'editCar'], function (carProfile, editCar) {
    return {
        getCarProfile: function (param) {
            $.get("/car/?id=" + param)
                .done(function (ans) {
                    if (JSON.parse(ans).length == 0) {
                        carProfile.setCarNotFound();
                    }
                    else
                        carProfile.setCarProfile(JSON.parse(ans));
                })
                .fail(function () {
                    carProfile.setError();
                });
        },

        getEditPage : function (param) {
            $.get("/admin/edit/?id="+param)
                .done(function (ans) {
                    if(JSON.parse(ans).length ==0){
                        editCar.setCarNotFound();
                    }
                    else{
                        editCar.setEditPage(JSON.parse(ans));
                        $.get("/filterData")
                            .done(function (ans) {
                                editCar.setEditData(JSON.parse(ans));
                            })
                            .fail(function () {
                                editCar.setError();
                            })
                    }
                })
                .fail(function () {
                    editCar.setError();
                });
        },

        deleteCar : function (param) {
            $.get("/admin/delete/?id="+param)
                .done(function (ans) {
                    editCar.setDeletePage();
                })
                .fail(function () {
                    editCar.setDeleteError();
                })
        },

        getNewPage : function () {
            editCar.setNewPage();
            $.get("/filterData")
                .done(function (ans) {
                    editCar.setEditData(JSON.parse(ans));
                })
                .fail(function () {
                    editCar.setError();
                })
        },
        
        getSavePage : function () {
            let data = editCar.pickUp();
            $.post('/admin/new/save', data, function () {
                editCar.setSavePage();
            });
        }
    }
});
