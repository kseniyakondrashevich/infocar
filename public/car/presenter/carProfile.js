/**
 * Created by User on 09.05.2017.
 */

define(['render'], function (render) {
    return{
        setCarNotFound : function () {
            render.renderFile('./partials/info', {title: 'Машина с данным номером не найдена', text: 'Попробуйте еще раз'}, 'insert', $('#main-container'));
        },

        setError : function () {
            render.renderFile('./partials/info', {title: 'Произошла ошибка', text: 'Невозможно загрузить файл'}, 'insert', $('#main-container'));
        },

        setCarProfile : function (ans) {
            render.renderFile('./car/view/carProfile', {obj: ans}, 'insert', $('#main-container'));
        }
    }
});
