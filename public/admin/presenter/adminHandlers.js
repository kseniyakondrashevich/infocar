/**
 * Created by User on 14.05.2017.
 */

let eventsHandlers = function () {
    function showCell() {
        let content = $('#control-buttons');
        let id = $(this).find('td:first + td').html();
        content.find('#id').html(id);
        $(this).find('td:last').html(content.show());
    }

    function hideCell() {
        $(this).find('td:last #control-buttons').hide();
    }

    function trigger(url) {
        history.pushState(null, null, url);
        $(window).trigger('hashchange');
    }

    function deleteRecord() {
        let id = $('#control-buttons').find('#id').html();
        let url = '#admin/delete/?id='+id;
        trigger(url);
    }

    function editRecord() {
        let id = $('#control-buttons').find('#id').html();
        let url = '#admin/edit/?id='+id;
        trigger(url);
    }


    return{
        showCell: showCell,
        hideCell: hideCell,
        deleteRecord : deleteRecord,
        editRecord : editRecord
    }
}();

    $('tbody').on({
            mouseenter: eventsHandlers.showCell,
            mouseleave: eventsHandlers.hideCell
        },
        'tr');

    $('thead').on('click', '#add', function () {
        let url = '#admin/new';
        history.pushState(null, null, url);
        $(window).trigger('hashchange');
    });

    $('tbody').on('click', '#edit', eventsHandlers.editRecord);

    $('tbody').on('click', '#delete', eventsHandlers.deleteRecord);
