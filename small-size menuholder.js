$(document).ready(function() {
    $('#bur-menu').on('click', function() {
        $('#alt-menu').toggle();
        $('#page').hide();
        $('header').hide();
        $('footer').hide();
    });

    $('#close_cross').on('click', function() {
        $('#alt-menu').hide();
        $('#page').toggle();
        $('header').toggle();
        $('footer').toggle();
    });
});
