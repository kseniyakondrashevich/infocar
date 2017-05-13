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


let eventHandlers = function () {

    let obj={};

    function pickUpData(event) {
        event.preventDefault();
        obj.brand = $('#selectBrand option:selected').text();
        obj.model = $('#selectModel option:selected').text();
        obj.dateFrom = $('#selectDateFrom').val();
        obj.dateTo = $('#selectDateTo').val();
        obj.costFrom = $('#selectCostFrom').val();
        obj.costTo = $('#selectCostTo').val();
        obj.transmission = $('input[name="transmission"]:checked').val();
        obj.typeOfFuel = $('input[name="typeOfFuel"]:checked').val();
        obj.volumeFrom = $('#selectVolumeFrom').val();
        obj.volumeTo = $('#selectVolumeTo').val();

        validateValues();
        trigger();
    }

    function validateValues() {
        if(obj.brand === 'Не выбрано')
            delete obj.brand;
        if(obj.model === 'Не выбрано')
            delete obj.model;
        if(obj.dateFrom == '')
            delete obj.dateFrom;
        if(obj.dateTo == '')
            delete obj.dateTo;
        if(obj.costFrom == '')
            delete obj.costFrom;
        if(obj.costTo == '')
            delete obj.costTo;
        if(obj.volumeFrom == '')
            delete obj.volumeFrom;
        if(obj.volumeTo == '')
            delete obj.volumeTo;
        if(obj.transmission == undefined)
            delete obj.transmission;
        if(obj.typeOfFuel == undefined)
            delete obj.typeOfFuel;
    }

    function trigger() {
        let url = '#filter/?';
        for(let key in obj){
            url+=key+"="+obj[key];
            url+='&';
        }
        url=url.substr(0, url.length-1);
        history.pushState(null, null, url);
        $(window).trigger('hashchange');
    }

    return{
        pickUpData : pickUpData
    }
}();

$(document).ready(function () {
    $('#apply-filter').on('click', eventHandlers.pickUpData);
});
