/**
 * Created by User on 11.05.2017.
 */

define(['render'], function (render) {
    return{
        clearResults : function () {
            $('#search-results').empty();
        },

        setError : function () {
            render.renderFile('./partials/info', {title: 'Произошла ошибка', text: 'Невозможно загрузить файл'}, 'prepend', $('#main-container'));
        },

        setFilterNotFoundResults : function () {
            render.renderFile('./partials/info', {title: 'По вашему запросу ничего не найдено', text: 'Попробуйте еще раз'}, 'insert', $('#search-results'));
        },

        setFilterData : function (ans) {
            render.renderFile('./search/view/filter', {mas: ans}, 'append', $('#main-container'));
        }
    }
});


