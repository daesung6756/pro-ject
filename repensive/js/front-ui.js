if (typeof console == "undefined") {
    this.console = {log: function() {}, info: function() {}};
}

// $fn.extend({
//
// });

var UI = {
    init : function() {
        this.overlayControl('.overlay-nav' ,'.nav-open', '.nav-close');
        this.sticky();
        this.swiper();
        this.scrollBar();
    },
    overlayControl : function( $target , $open , $close) {
        var $this = $($target);
        var $dim = $('.dimmed');
        var $body = $('body');

        $(document).on('click', $open, function(e){
            e.preventDefault();
            $this.addClass('is-active');
            $dim.fadeIn(300);
        });
        $(document).on('click', $close, function(e){
            e.preventDefault();
            $this.removeClass('is-active');
            $dim.fadeOut(300);
        });
    },
    sticky : function() {
        $(window).on('scroll resize', function() {
            var winW = $(window).outerWidth(),
                winS = $('html, body').scrollTop(),
                $header = $('.header'),
                $headerH = $header.height();

            if( winS >  0) {
                $header.addClass('is-fixed');
            } else {
                $header.removeClass('is-fixed');
            }
        })
    },
    swiper : function() {
        var swiper1 = new Swiper('.main-visual-slide', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
            },
        });
    },
    scrollBar : function() {
        $('.scrollbar-dynamic').scrollbar();
    }
};

UI.init();