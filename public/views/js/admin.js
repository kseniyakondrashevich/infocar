/**
 * Created by User on 12.05.2017.
 */

let eventHandlers = function () {
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
        let id = $('#control-buttons').find('#id').html();
        let url = '#admin/delete/?id='+id;
        history.pushState(null, null, url);
        $(window).trigger('hashchange');

    }

    function trigger() {
        let id = $('#control-buttons').find('#id').html();
        let url = '#admin/edit/?id='+id;
        history.pushState(null, null, url);
        $(window).trigger('hashchange');
    }

    return{
        showCell: showCell,
        hideCell: hideCell,
        deleteRecord : deleteRecord,
        trigger : trigger
    }
}();


$('#admin-table').on({
        mouseenter: eventHandlers.showCell,
        mouseleave: eventHandlers.hideCell
    },
    'tr');

$('#edit').on('click', eventHandlers.trigger);

$('#delete').on('click', eventHandlers.deleteRecord);

