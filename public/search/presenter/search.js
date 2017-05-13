/**
 * Created by User on 11.05.2017.
 */

define(['render'], function (render) {
   return{
       setSearchNotFoundResults : function () {
           render.renderFile('./partials/info', {title: 'По вашему запросу ничего не найдено', text: 'Попробуйте еще раз'}, 'insert', $('#main-container'));
       },

       setInitSearchPage : function (ans) {
           render.renderFile('./search/view/search', {mas: ans}, 'insert', $('#main-container'));
       },

       setError : function () {
           render.renderFile('./partials/info', {title: 'Произошла ошибка', text: 'Невозможно загрузить файл'}, 'insert', $('#main-container'));
       },

       setResSearchPage : function (ans) {
           render.renderFile('./search/view/search', {mas: ans}, 'prepend', $('#search-results'));
       }
   }
});