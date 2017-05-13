/**
 * Created by User on 13.05.2017.
 */

define(['mainTable'], function (mainTable) {
    return{
        homePage : function () {
        $.get('/partials/searchInput.html')
            .done(function (html) {
                mainTable.setSearchInput(html);
            })
            .fail(function () {
                mainTable.setError();
            });

        $.get('/tableData')
            .done(function (ans) {
                mainTable.setTableData(JSON.parse(ans));
            })
            .fail(function () {
                mainTable.setError();
            });
    }
    }

});