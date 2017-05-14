/**
 * Created by User on 14.05.2017.
 */


let eventsHandlers = function () {
    function validate() {
        alert(1);
        let brand = $('#editBrand option:selected').text();
        $('#editBrand option').each(function () {
            alert($(this).text());
            if($(this).text()==brand);
                $(this).remove();
        });

        let model = $('#editModel option:selected').text();
        $('#editModel option:not(":selected")').each(function () {
            alert($(this));
            if($(this).text()==model)
                $(this).remove();
        });
    }

    function  pickUpData() {
        alert(3);
        event.preventDefault();
        let obj = {};
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

        alert(JSON.stringify(obj));
        //return obj;
    }

    return{
        validate : validate,
        pickUpData : pickUpData
    }
}();

    $(document).ready(function () {
        eventsHandlers.validate();
    });

    $('#save').on('click', function (event) {
        event.preventDefault();
        let url = '#admin/new/save';
        history.pushState(null, null, url);
        $(window).trigger('hashchange');
    });

    $('#imgInput').on('change', function () {
        alert(1000);
       $('#image').attr('src', $(this).val());
    });
/*function readURL(input) {

    if (input.files && input.files[0]) {
       let reader = new FileReader();

        reader.onload = function (e) {
            $('#image').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

$("#imgInput").change(function(event){
    readURL(this);
});*/


