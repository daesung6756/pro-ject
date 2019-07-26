let UI ={
    init : function(){
        this.stickyEvents();
        this.textareaEditer();
        this.tabs();
        this.tooltip();
        this.scrollTopEvent('.scrolltop-btn');
    },
    textareaEditer:function() {
        let textareaGroup = [];

        $('[data-editer]').each(function(key, value){
            if($.inArray($(this).data('editer'), textareaGroup) === -1 ){
                textareaGroup.push($(this).data('editer'));
            }
        });

        $.each(textareaGroup, function(key, value){
            let $line = $('[data-editer='+ value +']');
            let $textarea = $('[data-editer-textarea='+ value +']');
            let $copyBtn = $('[data-editer-copy='+ value +']');
            $textarea.each(function(){
                let $lineheight = parseInt($(this).css('lineHeight'));
                let $count = parseInt(this.scrollHeight / $lineheight) + 1;
                let $ul = $($line).append('<ul>');

                $(this).height(parseInt(this.scrollHeight));
                for(let i=1; $count > i; i++){
                    let $li = $ul.find('ul');
                    $($li).append('<li><span>' + i +'</span></li>');
                }

                $copyBtn.on('click', function(){
                    $textarea.select();
                    document.execCommand('copy');
                });
            });
        });
    },
    tabs: function(){
        let $hash = window.location.href;
        let tabGroup = [];
        $('[data-tab]').each(function(key, value){
            if($.inArray($(this).data('tab'), tabGroup) === -1){
                tabGroup.push($(this).data('tab'));
            }
        });

        $.each(tabGroup, function(key, value){
            let $tabs = $('[data-tab=' + value + ']');
            let $contents = $('[data-tab-content=' + value + ']');
            let $onIndex = $tabs.index($tabs.filter('.is-active'));
            $contents.hide();
            $contents.eq($onIndex).show();
            $tabs.on('click', function(e){
                let $index = $tabs.index(this);
                let $href = $(this).attr('href');
                console.log($hash + $href);
                e.preventDefault();
                $tabs.removeClass('is-active');
                $tabs.eq($index).addClass('is-active');
                $contents.hide();
                $contents.eq($index).show();
            });

        });
    },
    stickyEvents : function(){
        let $html = parseInt($(document).height()) - parseInt($(window).height());
        let $headerHeight = parseInt($('.header').height());
        let $footerHeight = parseInt($('.footer').height());
        let $scroll = parseInt($('html, body').scrollTop());
        let $scrollCutline = parseInt($html - $footerHeight);

        if($headerHeight <= $scroll ){
            $('.header-tab-nav').addClass('is-fixed');
            $('.section-tab-nav').addClass('is-fixed');
            $('.scrolltop-wrap').addClass('is-show');

            if($scrollCutline <= $scroll){
                $('.scrolltop-wrap').css({'bottom' : ($footerHeight + 20) + 'px'});

            } else {
                $('.scrolltop-wrap').css({'bottom' : '20px'});
            }

        } else {
            $('.header-tab-nav').removeClass('is-fixed');
            $('.section-tab-nav').removeClass('is-fixed');
            $('.scrolltop-wrap').removeClass('is-show');
        }




    },
    scrollTopEvent: function(el) {
        let $scroll = $('html, body').scrollTop();
        let $btn = $(el);

        $btn.click(function(){
            $('html, body').stop().animate({scrollTop:0}, 400);
            return false;
        });
    },
    tooltip: function () {
        let tooltipGroup = [];
        $('[data-tooltip]').each(function(key, value) {
            if($.inArray($(this).data('tooltip') , tooltipGroup) === -1){
                tooltipGroup.push($(this).data('tooltip'));
            }
        });

        $.each(tooltipGroup , function(key, value) {
            let $target = $('[data-tooltip=\''+ value +'\']');
            // let $target = $('[data-tooltip='+ value +']');
            $target.on('mouseenter',function(){
                let dataValue = value.replace(" ", "&nbsp;");
                // dataValue = dataValue.replaceAll("%A0","%20");
                // dataValue = unescape(dataValue);
                // console.log();
                if($(this).find('.tooltip').length !== 1){
                    let $tool = $(this).append('<div class="tooltip"></div>');
                    $(this).find('.tooltip').html(dataValue);
                } else {
                    return false;
                }

            }).mouseleave(function() {
                $(this).find('.tooltip').remove('.tooltip');
                return false;
            });
        });
    }
};

$(function(){
    UI.init();
});



$(window).on('scroll', function(){
    UI.stickyEvents();
});