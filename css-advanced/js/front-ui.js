
function scrollAnimation (e){
    var headerHeight = $('.header').height();
    var topPadding = 30;
    var id = $(this).attr('href');
    var targetScroll  = $(id).offset().top;
    var lnb = $('.lnb');
    var li = $(this).parent();
    e.preventDefault();
    lnb.find('.is-active').removeClass('is-active');
    li.addClass('is-active');
    $('html, body').stop().animate({scrollTop : ( targetScroll - headerHeight - topPadding ) + 'px'},400);
}

function stickyHeader() {
    var body = $('html, body').scrollTop();
    var header = $('.header');

    if(body > 0) {
        header.addClass('is-fixed');
    } else {
        header.removeClass('is-fixed');
    }
}

(function($){
    $(document).on('click','.lnb li a',scrollAnimation);
    $(document).on('scroll', stickyHeader);

    $(document).ready(function() {

    });
})(jQuery);