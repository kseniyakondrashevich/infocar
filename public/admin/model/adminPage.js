/**
 * Created by User on 13.05.2017.
 */

define(['adminTable'], function (adminTable) {
    return{
        getAdminPage : function() {
            $.get('/partials/searchInput.html')
                .done(function (html) {
                    adminTable.setSearchInput(html);
                })
                .fail(function () {
                    adminTable.setError();
                });

            $.get("/admin")
                .done(function (ans) {
                    if(JSON.parse(ans).length ==0){
                        adminTable.setError();
                    }
                    else {
                        $.get('/view/partials/buttonAdd.html')
                            .done(function (html) {
                                adminTable.setButtonAdd(html);
                            })
                            .fail(function () {
                                adminTable.setError();
                            });

                        adminTable.setAdminPage(JSON.parse(ans));
                    }
                })
                .fail(function () {
                    adminTable.setError();
                });
        }

    }
});