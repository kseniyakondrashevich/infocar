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
                        adminTable.setAdminPage(JSON.parse(ans));
                    }
                })
                .fail(function () {
                    adminTable.setError();
                });
        }

    }
});