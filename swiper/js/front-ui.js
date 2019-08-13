if (typeof console == "undefined") {
    this.console = {log: function() {}, info: function() {}};
}

(function($){

}(jQuery));

// $fn.extend({
//
// });
var overlayNav = false;
var UI = {
    init : function() {
        this.overlayControl();
        this.sticky();
        this.scrollBar();
        this.tooltip();
        this.swiper();
        this.sectionMakeId();
        this.scrollMoveEvent();
    },
    overlayControl : function() {
        var $overlay = $('.overlay-nav');
        var $dim = $('.dimmed');
        var $body = $('body');
        var $open = $('.nav-open');
        var $close = $('.nav-close, .dimmed');

        $open.on('click', function(e){
            e.preventDefault();
            $overlay.addClass('is-active');
            $dim.fadeIn(300);
            overlayNav = true;
        });
        $close.on('click', function(e){
            e.preventDefault();
            $overlay.removeClass('is-active');
            $dim.fadeOut(300);
            overlayNav = false;
        });
        $(window).on('resize',function(){
            if(overlayNav){
                $overlay.removeClass('is-active');
                $dim.fadeOut(300);
            }
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
    // swiper : function() {
    //     var swiper1 = new Swiper('.main-visual-slide', {
    //         navigation: {
    //             nextEl: '.swiper-button-next',
    //             prevEl: '.swiper-button-prev',
    //         },
    //         loop : true,
    //         pagination: {
    //             el: '.swiper-pagination',
    //         },
    //     });
    // },
    scrollBar : function() {
        $('.scrollbar-dynamic').scrollbar();
    },
    tooltip: function(e) {
        var tooltips = [];
        $('[data-tooltip]').each(function(){
            if($.inArray($(this).data('tooltip'), tooltips) == -1){
                tooltips.push($(this).data('tooltip'));
            };
        });
        $.each(tooltips , function(key, value){
            var tooltip = $('[data-tooltip='+ value +']');

        });
    },
    swiper : function () {
        $('.swiper-container').each(function(){
            var _this = $(this);
            var _option = {
                loop:false,
                pagination:false,
                navigation:false,
                effect:false,
            };

            if(_this.hasClass('fade-effect')){
                _option.effect = 'fade'
            }

            if(_this.hasClass('loop-type')){
                _option.loop = true;
            }

            if(_this.find('.swiper-button-next').length > 0 &&
                _this.find('.swiper-button-prev').length > 0){
                _option.navigation = {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            }

            if(_this.find('.swiper-pagination').length > 0){
                _option.pagination = {
                    el : '.swiper-pagination',
                };

                if(_this.find('.swiper-pagination').hasClass('click-event')){
                    _option.pagination.clickable = true;
                }

                if(_this.find('.swiper-pagination').hasClass('num-type')){
                    _option.pagination.type = 'fraction'
                }

                if(_this.find('.swiper-pagination').hasClass('bar-type')){
                    _option.pagination.type = 'progressbar'
                }
            }

            var swiper = new Swiper(_this, _option);

        });

    },
    sectionMakeId : function() {
        $('.section').each(function(index) {
            var _this = $(this);

            _this.attr('id', 'section' + index);
        });
    },
    scrollMoveEvent : function() {
        $('.scroll-move-event').each(function() {
            console.log($(this));
        });
        $(document).on('click','.scroll-move-event .scroll-link' ,function(e){
            e.preventDefault();
            var header = $('.header').height();
            var target = $(this).attr('href');
            var targetScroll = $(target).offset().top;

            $('html, body').stop().animate({scrollTop: (targetScroll - header - 30) + 'px'}, 400 );
        })
    }
};

UI.init();