/**
 * Created by User on 13.05.2017.
 */

define(['filter', 'search'], function (filter, search) {
    return{
        getSearchPage : function(param) {
            $.get("/search/?id="+param)
                .done(function (ans) {
                    if(JSON.parse(ans).length ==0){
                        search.setSearchNotFoundResults();
                    }
                    else{
                        search.setInitSearchPage(JSON.parse(ans));
                        $.get("/filterData")
                            .done(function (ans) {
                                if(JSON.parse(ans).length ==0){
                                    search.setError();
                                }
                                else{
                                    filter.setFilterData(JSON.parse(ans))
                                }
                            })
                            .fail(function () {
                                search.setError();
                            });
                    }
                })
                .fail(function () {
                    search.setError();
                });
        },

        getFilterPage : function (params) {
            $.get("/filter/?"+params)
                .done(function (ans) {
                    filter.clearResults();
                    if(JSON.parse(ans).length ==0)
                        filter.setFilterNotFoundResults();
                    else
                        search.setResSearchPage(JSON.parse(ans));
                })
                .fail(function () {
                    filter.setError();
                })
        }



    }
});