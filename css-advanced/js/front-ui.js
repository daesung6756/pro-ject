
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
    var $body = $('html, body').scrollTop();
    var $header = $('.header');
    var $height = $header.height();
    var $container = $('.container');

    if($body > 0) {
        $header.addClass('is-fixed');
        $container.css({'paddingTop': $height + 'px'});
    } else {
        $header.removeClass('is-fixed');
        $container.css({'paddingTop': '0'});
    }
}

$(document).on('click','.lnb li a, .scroll-top', scrollAnimation);
$(document).on('scroll', stickyHeader);
var sectionNum = 0;

$(document).ready(function() {

    $('.section').each(function(){
        var $lnb = $('.lnb ul');
        var dataName = $(this).attr('data-name');
        console.log(dataName);
        ++sectionNum;
        $(this).attr('id', "case"+ sectionNum );
        $lnb.append('<lI><a href=#case' + sectionNum + '>'+ dataName + '</a></lI>');
    });
});
