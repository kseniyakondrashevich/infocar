/**
 * Created by User on 13.05.2017.
 */

define(['just'], function (just) {

     function insertInDOM($container, html) {
        $container.html(html);
    }

     function appendToDOM($container, html) {
        $container.append(html);
    }

     function prependToDOM($container, html) {
        $container.prepend(html);
    }

    return{
        renderFile: function (fileName, params, callbackType, $container) {
            let html = new JUST({root: './', ext: '.html'});
            html.render(fileName, params, function (err, html) {
                if(err)
                    alert(err);
                else{
                    switch (callbackType){
                        case 'insert': insertInDOM($container, html);
                            break;
                        case 'append': appendToDOM($container, html);
                            break;
                        case 'prepend': prependToDOM($container, html);
                            break;
                    }
                }
            })
        },
    };
});