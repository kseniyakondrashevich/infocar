/**
 * Created by User on 14.05.2017.
 */

$(document).ready(function(){
    alert(1);
    $("#grid").kendoGrid({
        height: 700,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 4,
            input: true,
            pageSize: 10,
            messages: {
                display: "Показаны {0}-{1} из {2} элементов",
                page: "Страница",
                of: "из {0}",
                itemsPerPage: "элементов на странице"
            }
        },
        reorderable: true,
        resizable: true,
        filterable: {
            mode: "row"
        },
        columnMenu: {
            filterable : false,
            sortable: false
        },
        sortable: true,
        toolbar: ["create"],
        columns: [
            {field: "photo", title: "Изображение", sortable: false, template: "<img class='img img-responsive' src='#: photo #'>", filterable: {
                cell: {
                    enabled: false
                }
            }},
            {field: "brand", title: "Марка", editor: brandEditor},
            {field: "model", title: "Модель", editor: modelEditor},
            {field: "year", title: "Год выпуска", format: "{0:####}"},
            {field: "mileage", title: "Пробег"},
            {field: "cost", title: "Стоимость", format: "{0:c3}"},
            {field: "volume", title: "Объем"},
            {field: "typeOfFuel", title: "Тип топлива", editor: customFuelEditor},
            {field: "transmission", title: "Механика", editor: customTransmissionEditor},
            {command: [
                {name : "edit",
                    text: {edit: "", cancel: "", update: ""}
                },
                {name: "destroy", text: ""},
            ],
                title: "&nbsp"}
        ],
        editable: "inline",
        dataSource: {
            transport : {
                read: {
                    url: "/admin",
                    dataType: 'json',
                    type: 'GET'
                },
                update: {
                    url: "/admin/edit/save",
                    dataType: 'json',
                    type: "POST"
                },
                destroy: {
                    url: "/admin/delete",
                    type: "POST"
                },
                create: {
                    url: "/admin/new/save",
                    type: "POST"
                },
            },
            schema: {
                model: {
                    id: "id_car",
                    fields: {
                        id_car: {editable: false, nullable: true},
                        photo: {editable: true, nullable: false},
                        brand: { editable: true, nullable: false, validation: { required: true } },
                        model: { editable: true, nullable: false, validation: { required: true } },
                        year: { type: "number", editable: true, nullable: false, validation: { required: true, min: 1980, max: 2017} },
                        mileage: { type: "number", editable: true, nullable: false, validation: { required: true, min: 0}},
                        cost: { editable: true, nullable: false, validation: { required: true } },
                        volume: { type: "number", editable: true, nullable: false, validation: { required: true, min: 0, max: 10000} },
                        typeOfFuel: { editable: true, nullable: false, validation: { required: true } },
                        transmission: { editable: true, nullable: false, validation: { required: true } }
                    }
                }
            }
        }
    });
});


function customFuelEditor(container, options) {
    $('<label><input type="radio" value="Бензин" name="typeOfFuel" data-type="string" data-bind="checked: typeOfFuel">Бензин</label>').appendTo(container);
    $('<label><input type="radio" value="Дизель" name="typeOfFuel" data-type="string" data-bind="checked: typeOfFuel">Дизель</label>').appendTo(container);
}

function customTransmissionEditor(container) {
    $('<label><input type="radio" value="Механика" name="transmission" data-type="string" data-bind="checked: transmission">Механика</label>').appendTo(container);
    $('<label><input type="radio" value="Автомат" name="transmission" data-type="string" data-bind="checked: transmission">Автомат</label>').appendTo(container);
}

function brandEditor(container, options) {
    $('<input id="brandSelect" required name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
            dataTextField: "brand",
            dataValueField: "brand",
            change: onChange,
            dataSource: {
                transport: {
                    read: {
                        url: "/brand",
                        dataType: 'json',
                        type: 'GET'
                    }
                }
            }
        });
}

function modelEditor(container, options) {

    $(document).ready(function () {
        $('<input id="modelSelect" required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                optionLabel: "Select model...",
                dataTextField: "model",
                dataValueField: "model",
                dataSource: {
                    transport: {
                        read: {
                            url: "/model",
                            dataType: 'json',
                            type: 'GET'
                        }
                    }
                }
            });
    })

}

function onChange() {
    let brandSelect = $("#brandSelect").data("kendoDropDownList");
    let dataItem = brandSelect.dataItem();

    let modelSelect = $('#modelSelect').data("kendoDropDownList");
    let data= {brand: dataItem.brand};
    modelSelect.dataSource.read(data);
    modelSelect.refresh();
}


















/*let eventsHandlers = function () {
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

    $('tbody').on('click', '#delete', eventsHandlers.deleteRecord);*/



