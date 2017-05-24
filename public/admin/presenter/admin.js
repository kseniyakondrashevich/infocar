/**
 * Created by User on 12.05.2017.
 */

define(['render'], function (render) {
   return{
       setSearchInput : function (html) {
           $('#main-container').html(html);
       },

       setError : function () {
           render.renderFile('./partials/info', {title: 'Произошла ошибка', text: 'Невозможно загрузить файл'}, 'append', $('#main-container'));
       },

       setAdminPage : function (html) {
           $('#main-container').html(html);
           //render.renderFile('./admin/view/adminGrid', 'append', $('#main-container'));


       }

   }
});



