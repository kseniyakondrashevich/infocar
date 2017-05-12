/**
 * Created by User on 07.05.2017.
 */

require.config({
    baseUrl: '/controllers',
    paths: {
        'just' : './just.min',
    }
});

//page('/', homePage);
//page('/#car')

require(["just"], function (just) {

    $(window).on('hashchange', function () {
        let pathname = window.location.pathname;
        let hash = window.location.hash;
        let url = pathname+hash;

        if(/^\/$/.test(url)){
            homePage();
        }
        else if(/^\/#car\/\?id=.*/.test(url)){
            getCarProfile(hash.substr(9, hash.length));
        }
        else if(/^\/#search\/\?id=.*/.test(url)){
            getSearchPage(hash.substr(12, hash.length));
        }
        else if(/^\/#admin\/?$/.test(url)){
            getAdminPage();
        }
        else if(/^\/#filter\/\?.*/.test(url)){
            getFilterPage(hash.substr(9, hash.length));
        }
        else if(/^\/#admin\/edit\/\?id=.*/.test(url)){
            getEditPage(hash.substr(16, hash.length));
        }
        else if(/^\/#admin\/delete\/\?id=.*/.test(url)){
            getEditPage(hash.substr(18, hash.length));
        }

    });

    $(window).trigger('hashchange');

    function homePage() {
        $.get('/views/partials/searchInput.html')
            .done(function (html) {
                insertInDOM($('#main-container'), html);
            })
            .fail(function () {
                err('Контейнер потерялся', insertInDOM, $('#main-container'));
            });

        $.get('/tableData')
            .done(function (ans) {
                renderFile('mainTable', {mas: JSON.parse(ans)}, appendToDOM, $('#main-container'));
            })
            .fail(function () {
                err('Ошибка получения данных', appendToDOM, $('#main-container'));
            });
    }

    function getCarProfile(param) {

        $.get("/car/?id="+param)
            .done(function (ans) {
                if(JSON.parse(ans).length ==0){
                    err('Машина с данным номером не найдена :(', insertInDOM, $('#main-container'));
                }
                else
                    renderFile('car', {obj: JSON.parse(ans)}, insertInDOM, $('#main-container'));
            })
            .fail(function () {
                err('Что-то пошло не так...', insertInDOM, $('#main-container'));
            });
    }

    function getSearchPage(param) {
        $.get("/search/?id="+param)
            .done(function (ans) {
                if(JSON.parse(ans).length ==0){
                    err('Поиск по заданным параметрам ничего не дал :(', insertInDOM, $('#main-container'));
                }
                else{
                    renderFile('search', {mas: JSON.parse(ans)}, insertInDOM, $('#main-container'));
                    $.get("/filterData")
                        .done(function (ans) {
                            if(JSON.parse(ans).length ==0){
                                err('Недостаточно данных для фильтрации :(', appendToDOM, $('#main-container'));
                            }
                            else{
                                renderFile('filtr', {mas: JSON.parse(ans)}, appendToDOM, $('#main-container'));
                            }
                        })
                        .fail(function () {
                            err('Что-то пошло не так...', appendToDOM, $('#main-container'));
                        });
                }
            })
            .fail(function () {
                err('Что-то пошло не так...', insertInDOM, $('#main-container'));
            });
    }

    function getAdminPage() {
        $('#main-container').load('/views/partials/searchInput.html');
        $.get("/admin")
            .done(function (ans) {
                if(JSON.parse(ans).length ==0){
                    err('Страница не найдена :(', appendToDOM, $('#main-container'));
                }
                else {
                    renderFile('admin', {mas: JSON.parse(ans)}, appendToDOM, $('#main-container'));
                }
            })
            .fail(function () {
                err('Что-то пошло не так...', appendToDOM, $('#main-container'));;
            });
    }

    function getFilterPage(params) {
        $.ajax({
            type: "GET",
            url: "/filter/?"+params,
            success: function (ans) {
                $('#search-results').empty();
                if(JSON.parse(ans).length ==0)
                    err('По вашему запросу ничего не найдено', prependToDOM, $('#search-results'));
                else
                    renderFile('search', {mas: JSON.parse(ans)}, prependToDOM, $('#main-container'));
            }
        })
    }

    function getEditPage(param) {
        $.ajax({
            type: "GET",
            url: "/admin/edit/?id="+param,
            success: function (ans) {
                if(JSON.parse(ans).length ==0){
                    err('Машина с данным номером не найдена :(', insertInDOM, $('#main-container'));
                }
                else{
                    renderFile('edit', {title: 'Редактирование', obj: JSON.parse(ans)}, insertInDOM, $('#main-container'));
                    $.get("/filterData")
                        .done(function (ans) {
                            renderFile('brandOptions', {mas: JSON.parse(ans)}, appendToDOM, $('#editBrand'));
                            renderFile('modelOptions', {mas: JSON.parse(ans)}, appendToDOM, $('#editModel'));
                        })
                        .fail(function () {
                            err('Что-то пошло не так...', insertInDOM, $('#main-container'));
                        })
                }
            },
            error: function(){
                err('Что-то пошло не так...', insertInDOM, $('#main-container'));
            }
        })
    }
    function deleteCar() {
        $.ajax({
            type: "GET",
            url: "/admin/delete/?id="+param,
            success: function (ans) {
                renderFile('admin', {mas: JSON.parse(ans)}, appendToDOM, $('#main-container'));
                alert('Запись успешно удалена');
            }
        })
    }


    function renderFile(fileName, params, callback, $container) {
        let html = new JUST({root: '/views/partials', ext: '.html'});
        html.render(fileName, params, function (err, html) {
            if(err)
                console.log(err);
            else{
                callback($container, html);
            }
        })
    }

    function insertInDOM($container, html) {
        $container.html(html);
    }

    function appendToDOM($container, html) {
        $container.append(html);
    }

    function prependToDOM($container, html) {
        $container.prepend(html);
    }

    function err(title, callback, $container) {
        renderFile('error', {title: title, text: 'Попробуйте еще раз'}, callback, $container);
    }
});
