(function($){
    // $.fn.extend({
    //
    // });
    $.ui.plugin.add("resizable", "alsoResizeReverse", {
        start: function() {
            var that = $(this).resizable("instance"),
                o = that.options,
                _store = function(exp) {
                    $(exp).each(function() {
                        var el = $(this);
                        el.data("ui-resizable-alsoResizeReverse", {
                            width: parseInt(el.width(), 10),
                            height: parseInt(el.height(), 10),
                            left: parseInt(el.css("left"), 10),
                            top: parseInt(el.css("top"), 10)
                        });
                    });
                };

            if (typeof(o.alsoResizeReverse) === "object" && !o.alsoResizeReverse.parentNode) {
                if (o.alsoResizeReverse.length) {
                    o.alsoResizeReverse = o.alsoResizeReverse[0];
                    _store(o.alsoResizeReverse);
                } else {
                    $.each(o.alsoResizeReverse, function(exp) {
                        _store(exp);
                    });
                }
            } else {
                _store(o.alsoResizeReverse);
            }
        },
        resize: function(event, ui) {
            var that = $(this).resizable("instance"),
                o = that.options,
                os = that.originalSize,
                op = that.originalPosition,
                delta = {
                    height: (that.size.height - os.height) || 0,
                    width: (that.size.width - os.width) || 0,
                    top: (that.position.top - op.top) || 0,
                    left: (that.position.left - op.left) || 0
                },

                _alsoResizeReverse = function(exp, c) {
                    $(exp).each(function() {
                        var el = $(this),
                            start = $(this).data("ui-resizable-alsoResizeReverse"),
                            style = {},
                            css = c && c.length ?
                                c :
                                el.parents(ui.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];

                        $.each(css, function(i, prop) {
                            var sum = (start[prop] || 0) - (delta[prop] || 0);
                            if (sum && sum >= 0) {
                                style[prop] = sum || null;
                            }
                        });

                        el.css(style);
                    });
                };

            if (typeof(o.alsoResizeReverse) === "object" && !o.alsoResizeReverse.nodeType) {
                $.each(o.alsoResizeReverse, function(exp, c) {
                    _alsoResizeReverse(exp, c);
                });
            } else {
                _alsoResizeReverse(o.alsoResizeReverse);
            }
        },

        stop: function() {
            $(this).removeData("resizable-alsoResizeReverse");
        }
    });
})(jQuery);

var UI = {
    init : function() {
        this.overlayNavOpen('.overlay-open');
        this.overlayNavClose('.overlay-close');
        this.areaOutClickEvent('.drop-list.is-show');
        this.dropList('.head-drop-btn');
        this.dropList('.mail-drop-btn');
        this.select('.mail-drop-btn');
        this.slideUpDown('.sub-nav', '.hide-sub-nav', 'is-hide', 'close');
        this.slideUpDown('.sub-nav', '.show-sub-nav', 'is-hide', 'open');
        this.tabs();
        this.openFullScreenMode('.open-full-screen');
        this.closeFullScreenMod('.close-full-screen');
        this.singleAccordian();
        this.toggleClass('.select-btn','li','is-active');
        this.toggleClass('.event-extend','.flex-head','is-extend');
        this.toggleClass('.event-extend','','is-active');
        this.toggleClass('.sub-menu a.flag-event','', 'is-active');
        this.listActive('.mail-list-content li', '.mail-list-wrap', 'li','is-selected');
        this.listActive('.flex-body .aside-list .accordian-panel ul li','.flex-body', 'li', 'is-active');
        this.listActive('.floating-nav .out-list > li > a','.out-list', 'li', 'is-active');
    },
    dropList : function (el) {
        $(document).on('click', el ,function(e){
            var panel = $(el).siblings('ul.drop-list');
            e.preventDefault();
            if( panel !== undefined){
                panel.addClass('is-show');
            } else {
                panel.removeClass('is-show');
            }
        });
    },
    areaOutClickEvent : function(el) {
        $('html').click(function(e) {
            if(!$(el).is(e.target)) {
                $(el).removeClass('is-show');
            }
        });
    },
    slideUpDown : function(el , name, className, idx) {
        $(document).on('click', name , function(e){
            e.preventDefault();
            switch (idx) {
                case 'open':
                    $(el).slideDown(100);
                    break;
                case'close':
                    $(el).slideUp(100);
                    break;
                default:
                    break;
            }
        });
    },
    tabs : function () {
        $(document).on('click','.tab-nav li a', function(e) {
            var $target = $(this).attr('href');
            e.preventDefault();
            if( $(e.target).parent().hasClass('event-disabled')){
                return false;
            } else {
                $(e.target).parents('.tab-nav').find('.is-active').removeClass('is-active');
                $(e.target).parent().addClass('is-active');
                $($target).parent('.tab-container').find('.is-show').removeClass('is-show');
                $($target).addClass('is-show');
            }
        });
    },
    openFullScreenMode : function (el) {
        var docV = document.documentElement;
        $(document).on('click', el ,function(e) {
            e.preventDefault();
            if (docV.requestFullscreen)
                docV.requestFullscreen();
            else if (docV.webkitRequestFullscreen) // Chrome, Safari (webkit)
                docV.webkitRequestFullscreen();
            else if (docV.mozRequestFullScreen) // Firefox
                docV.mozRequestFullScreen();
            else if (docV.msRequestFullscreen) // IE or Edge
                docV.msRequestFullscreen();
        });
    },
    closeFullScreenMod : function (el) {
        var docV = document.documentElement;
        $(document).on('click', el ,function(e) {
            e.preventDefault();
            if (document.exitFullscreen)
                document.exitFullscreen();
            else if (document.webkitExitFullscreen) // Chrome, Safari (webkit)
                document.webkitExitFullscreen();
            else if (document.mozCancelFullScreen) // Firefox
                document.mozCancelFullScreen();
            else if (document.msExitFullscreen) // IE or Edge
                document.msExitFullscreen();
        });
    },
    overlayNavOpen : function(el) {
        $(document).on('click', el , function(e) {
            e.preventDefault();
            $('.overlay-nav').addClass('is-show');
        });
    },
    overlayNavClose: function(el) {
        $(document).on('click', el , function(e) {
            e.preventDefault();
            $('.overlay-nav').removeClass('is-show');
        });
    },
    select : function (el) {
        $(document).on('click', '.select .drop-list li a', function(e){
            var btn = $(e.target).parents('.select').find(el);
            var selectedValue = $(e.target).text();
            var selectIndex = $(this).parent().index();
            var selectReset = $(this).parents('.select').find('select option').attr('selected', false);
            var selectActive = $(this).parents('.select').find('select option').eq(selectIndex).attr('selected',true);
            e.preventDefault();
            btn.html(selectedValue +'<i class="icon icon-down-black-arrow"></i>');
        });
    },
    singleAccordian : function() {
        $(document).on('click','.accordian-head .open-panel',function() {
            var panel = $(this).parent('.accordian-head').siblings('.accordian-panel');
            $(this).toggleClass('is-active');
            if($(this).hasClass('is-active')){
                panel.slideUp(100);
            } else {
                panel.slideDown(100);
            }
        });
    },
    toggleClass : function (el, target , className ) {
        $(document).on('click', el , function(e) {
            e.preventDefault();
            if(target !==''){
                if($(this).parents(target)){
                    $(this).parents(target).toggleClass(className);
                } else {
                    (this).parents().siblings(target).toggleClass(className);
                }
            } else {
                $(this).toggleClass(className);
            }
        });
    },
    listActive : function(el, parents, target,  className ){
        $(document).on('click', el , function(e){
            e.preventDefault();
            $(this).parents(parents).find('.'+ className).removeClass(className);
            $(this).parents(target).addClass(className);
        });
    },
};

$(function(){

    UI.init();

    $('.scrollbar-inner').scrollbar();

    $('.accordian').each(function(){
        if($(this).find('.open-panel').hasClass('is-active')){
            $('.open-panel.is-active').parent().siblings('.accordian-panel').slideUp(0);
        }
    });

    $( ".flex-content.aside" ).resizable({lsoResizeReverse: ".flex-content.view"});
    $( ".flex-content.tabs" ).resizable({alsoResizeReverse: ".flex-content.view"});
});