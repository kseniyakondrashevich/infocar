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

       setButtonAdd : function (html) {
           $('.form-inline').append(html);
       },

       setAdminPage : function (ans) {
           render.renderFile('./admin/view/admin', {mas: ans}, 'append', $('#main-container'));
       }
   }
});

let evHandlers = function () {
    function showCell() {
        let content = $('#control-buttons');
        let id = $(this).find('td:first + td').html();
        content.find('#id').html(id);
        $(this).find('td:last').html(content.show());
    }

    function hideCell() {
        $(this).find('td:last #control-buttons').hide();
    }

    function deleteRecord() {
        alert('delete');
        let id = $('#control-buttons').find('#id').html();
        let url = '#admin/delete/?id='+id;
        history.pushState(null, null, url);
        $(window).trigger('hashchange');
    }

    function editRecord() {
        alert('edit');
        let id = $('#control-buttons').find('#id').html();
        let url = '#admin/edit/?id='+id;
        history.pushState(null, null, url);
        $(window).trigger('hashchange');
    }

    return{
        showCell: showCell,
        hideCell: hideCell,
        deleteRecord : deleteRecord,
        editRecord : editRecord
    }
}();


$('#admin-table').on({
        mouseenter: evHandlers.showCell,
        mouseleave: evHandlers.hideCell
    },
    'tr');

$('#admin-table').on('click', '#edit', evHandlers.editRecord);
$('#admin-table').on('click', '#delete', evHandlers.deleteRecord);


