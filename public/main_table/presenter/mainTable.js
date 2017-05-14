/**
 * Created by User on 09.05.2017.
 */

define(['render'], function (render) {
    return{
        setSearchInput : function (html) {
            $('#main-container').html(html);
        },

        setError : function () {
            render.renderFile('./partials/info', {title: 'Машина с таким номером не найдена', text: 'Попробуйте еще раз'}, 'insert', $('#main-container'));
        },

        setTableData : function (ans) {
            render.renderFile('/main_table/view/mainTable', {mas: ans}, 'append', $('#main-container'));
        }
    };
});



