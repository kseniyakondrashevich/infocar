/**
 * Created by User on 12.05.2017.
 */

define(['render'], function (render) {
    return{
        setCarNotFound : function () {
            render.renderFile('./partials/info', {title: 'Машина с данным номером не найдена', text: 'Попробуйте еще раз'}, 'insert', $('#main-container'));
        },

        setError : function () {
            render.renderFile('./partials/info', {title: 'Произошла ошибка', text: 'Невозможно загрузить файл'}, 'insert', $('#main-container'));
        },

        setEditPage : function (ans) {
            alert(3);
            render.renderFile('./car/view/editCar', {title: 'Редактирование', obj: ans[0]}, 'insert', $('#main-container'));
        },

        setEditData : function (ans) {
            render.renderFile('./partials/options', {obj: ans["brand"]}, 'append', $('#editBrand'));
            render.renderFile('./partials/options', {obj: ans['model']}, 'append', $('#editModel'));
        },

        setDeletePage : function () {
            render.renderFile('Удаление прошло успешно', 'insert', $('#main-container'));
        },

        setDeleteError : function () {
            render.renderFile('Не удалось удалить данную запись', 'insert', $('#main-container'));
        }
    }
});

