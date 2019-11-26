var UI = {
    init : function(){
        this.tabs();
        this.tableColDraw('.intro-tbl-col', colOption1, rowData1);
        this.tableAni('.tbl-col', 'ani-slide-down-up');
        this.tableRowDraw('.intro-tbl-row', rowTableColOption, rowData2);
        this.tableRowDraw('.intro-tbl-row2',rowTableColOption, rowData3);
        this.tableRowDraw('.intro-tbl-row3',rowTableColOption, rowData4);
        this.toggleClassTarget('.overlay.d-right', '.tbl-event-btn', 'is-show');
        this.tooltip();
        this.headetStickyBar();
        this.scrollTopStickyBtn();
        this.windowKeyCodeCheck();
        this.mainVisualSwitchEvent();
        this.visualMouseClickEvent();
        this.popup()
    },
    tabs: function(){
        var $hash = window.location.href;
        var tabGroup = [];
        $('[data-tab]').each(function(key, value){
            if($.inArray($(this).data('tab'), tabGroup) === -1){
                tabGroup.push($(this).data('tab'));
            }
        });

        $.each(tabGroup, function(key, value){
            var $tabs = $('[data-tab=' + value + ']');
            var $contents = $('[data-tab-content=' + value + ']');
            var $onIndex = $tabs.index($tabs.filter('.is-active'));
            $contents.hide();
            $contents.eq($onIndex).show();
            $tabs.on('click', function(e){
                var $index = $tabs.index(this);
                var $href = $(this).attr('href');
                console.log($hash + $href);
                e.preventDefault();
                $tabs.removeClass('is-active');
                $tabs.eq($index).addClass('is-active');
                $contents.hide();
                $contents.eq($index).show();
            });

        });
    },
    tableColDraw: function(wrap, cols, rows){
        if(cols && rows && cols !== undefined && rows !== undefined) {
            if ($('.intro-tbl-col')) {
                var $col = cols;
                var $row = rows;
                var makeTable = $('<table>');
                var makeThead = $('<thead>');
                var makeTbody = $('<tbody>');
                var $colgroup = $('<colgroup>');
                $(wrap).append($(makeTable));
                $(makeTable).addClass('tbl-col').append($($colgroup)).append($(makeThead)).append($(makeTbody));
                $(makeThead).append('<tr>');
                $.each($col, function (i, dt) {
                    $($colgroup).append('<col style="width:' + dt["width"] + '">');
                    $(makeThead).find('tr').append('<th scope="col">' + dt["headline"] + '</th>');
                });
                $.each($row, function (i, row) {
                    var makeTr = $('<tr>');
                    var $nrow = $(makeTbody).prepend($(makeTr));

                    $.each($col, function (j, dt) {
                        if (dt["key"] === 'file') {
                            $(makeTr).append('<td style="text-align:' + dt["align"] + ';text-indent:' + dt["indent"] + '"><a href="' + row['url'] + '" title="' + row[dt["key"]] + ' 바로가기" target="' + row['target'] + '"><span class="event-span">' + row[dt["key"]] + '</span></a></td>');
                        } else if (dt["key"] === 'num') {
                            $(makeTr).append('<td style="text-align:' + dt["align"] + ';text-indent:' + dt["indent"] + '"><span class="num-box">' + i + '</span></td>');
                        } else {
                            $(makeTr).append('<td style="text-align:' + dt["align"] + ';text-indent:' + dt["indent"] + '">' + row[dt["key"]] + '</td>');
                        }

                    });

                });
            }
        }
    },
    tableRowDraw: function (wrap, cols, rows) {
        if(cols && rows && cols !== undefined && rows !== undefined) {
            if ($('.intro-tbl-row')) {
                var $col = cols;
                var $row = rows;
                var makeTable = $('<table>');
                var makeTbody = $('<tbody>');
                var $colgroup = $('<colgroup>');
                $(wrap).append($(makeTable));
                $(makeTable).addClass('tbl-row').append($($colgroup)).append($(makeTbody));

                $.each($col, function (i, dt) {
                    $($colgroup).append('<col style="width:' + dt["width"] + '">');
                });
                $.each($row, function (i, row) {
                    var makeTr = $('<tr>');
                    var $nrow = $(makeTbody).append($(makeTr));

                    $.each($col, function (j, dt) {
                        if (dt['key'] === 'ths') {
                            $(makeTr).append('<th scope="row" style="text-align:' + dt['align'] + ';vertical-align:' + dt['valign'] + '">' + row[dt['key']] + '</th>');
                        } else {
                            $(makeTr).append('<td style=text-align:' + dt['align'] + ';vertical-align:' + dt['valign'] + '">' + row[dt['key']] + '</td>');
                        }
                    });

                });
            }
        }else {
            return false;
        }
    },
    tableAni : function (tname, aname){
        var $tableTr = $(tname +' tbody tr'),
            currentHighlight = 0,
            N = 2;

        $tableTr.eq(0).addClass(aname);
        setInterval(function(){
            currentHighlight = (currentHighlight + 1) % $tableTr.length;
            $tableTr.removeClass(aname).eq(currentHighlight).addClass(aname);
        },N * 1000);
    },
    /*photoListAni: function(sec) {
        var $listLi =  $('.photo-list li'),
            currentHighlight = 0,
            N = sec;

            if($aniEvent !== true){
                $listLi.eq(0).addClass("ani-on");
                var $inter = setInterval(function () {
                    currentHighlight = (currentHighlight + 1) % $listLi.length;
                    $listLi.eq(currentHighlight).addClass("ani-on");
                    console.log("인터벌 클리어 확인");
                    if ((currentHighlight + 1) === $listLi.length) {
                        clearInterval($inter);
                        return false;
                    }
                }, N * 100);
                $aniEvent = true;
            } else {
                return false;
            }
    },*/
    tooltip: function () {
        var tooltipGroup = [];
        $('[data-tooltip]').each(function() {
            if($.inArray($(this).data('tooltip') , tooltipGroup) === -1){
                tooltipGroup.push($(this).data('tooltip'));
            }
        });

        $.each(tooltipGroup , function(key, value) {
            var $target = $('[data-tooltip=\''+ value +'\']');

            $target.on('mouseenter',function(){
                var dataValue = value.replace(" ", "&nbsp;");

                if($(this).find('.tooltip').length !== 1){
                    var $makeTools = $(this).append('<span class="tooltip"></span>');
                    var $thisToolTip = $(this).find('.tooltip');

                    $thisToolTip.html(dataValue);

                    var $width = $(window).width();
                    var $toolTipOffsetLeft = $thisToolTip.offset().left;
                    var $toolTipOffsetRight = $toolTipOffsetLeft + $thisToolTip.outerWidth();
                    var $moveOffset = ($toolTipOffsetRight - $width) + 20;

                    if($toolTipOffsetRight > $width) {
                        $thisToolTip.css({'marginLeft': -($moveOffset) + 'px'});
                    }

                } else {
                    return false;
                }

            }).mouseleave(function() {
                $(this).find('.tooltip').remove('.tooltip');
                return false;
            });
        });
    },
    singleToggleBtn : function(el, className) {
        var $el = $(el);
        var $toggleClass = className;
        $el.on('click', $el, function(){
            $el.toggleClass($toggleClass);
        });
    },
    toggleClassTarget : function ( el, el2 , className ){
        var $el = $(el);
        var $clickEl = el2;
        var $eventClass = className;

        $(document).on('click', $clickEl, function(){
            var $title = $(this).attr('title');
            if($el.hasClass($eventClass)){
                $el.removeClass($eventClass);
                $(this).attr('title','리스트 열기');
            } else {
                $el.addClass($eventClass);
                $(this).attr('title','리스트 닫기');
            }
        });
    },
    headetStickyBar : function(){
        var $html = $('html, body');
        var $wrap = $('.wrap');
        var $this = $('.header');
        var $spot = $('.visual-spot');
        var $htmlScrollTop = $html.scrollTop();
        var $elHeight = parseInt($spot.innerHeight());
        if($htmlScrollTop > $elHeight){
            $this.addClass('is-active');
        } else if( $htmlScrollTop > 0){
            $this.addClass('is-fixed');
            $this.removeClass('is-active');
        } else {
            $this.removeClass('is-fixed');
            $this.removeClass('is-active');
        }
    },
    scrollTopStickyBtn: function() {
        var $html = $('html, body');
        var $htmlScrollTop = $html.scrollTop();
        var $btn = $('.scroll-floating button');
        $btn.on('click',function() {
            $html.animate({scrollTop : 0}, 300);
        });
    },
    windowKeyCodeCheck : function () {
        $(window).on('keydown',function(e){
            // 키보드 ` 키 값으로 오버레이 레이어 팝업 토글
            if(e.keyCode === 192){
                $(".overlay").toggleClass("is-show");
                $(".tbl-event-btn").toggleClass("is-show");
            }
        });
    },
    mainVisualSwitchEvent : function(){
        var $on = false;
        var $toggleBtn = $('.toggle-switch');
        var $visual = $('.visual-spot');
        var $mouse = $('.mouse');
        var $theme = $("body");

        $toggleBtn.on('click', function(){
            if($(this).hasClass('is-on')){
                $(this).removeClass('is-on');
                $visual.removeClass('is-on');
                $theme.removeClass('x-mas');
                $mouse.css({"display":"inline-block"});
            } else {
                $(this).addClass('is-on');
                $visual.addClass('is-on');
                $theme.addClass('x-mas');
            }
        })

    },
    visualMouseClickEvent : function () {
        var mouseGroup=[];

        $('.mouse').each(function(key, value){
            mouseGroup.push(this);
        });

        console.log(mouseGroup);

        $.each(mouseGroup, function(key, value){
            var $this = $(value);
            $this.on('click', function(e){
                $(this).css({
                    "display":"none"
                });
            });
        });
    },
    popup : function(){
        var popGroup = [];

        $("[data-pop]").each(function(){
            if($.inArray($(this).data('pop'), popGroup) === -1){
                popGroup.push($(this).data('pop'));
            }
        });

        $.each(popGroup, function(key, value){
            var $open = $("[data-pop=" + value +"]");
            var $close = $("[data-pop-close=" + value +"]");
            var $target = $("#" + value);
            var $body = $("body");

            $open.on('click', function(){
                $body.addClass("is-lock");
                $target.addClass('is-show');

                if($target.hasClass('is-dim')){
                    $target.append("<div class='dimmed'></div>")
                } else {
                    return false;
                }
            });

            $close.on('click', function(){
                $body.removeClass("is-lock");
                $target.removeClass('is-show');
            });
        })

    },
    popCallback : function (){

    }
};

var $aniEvent = false;

//ready
$(document).ready(function(){
    UI.init();
});
//scroll
$(window).on('scroll', function(){
    var $photoListWrap = $('.photo-list').offset().top/2;
    var $scrollTop = $('html, body').scrollTop();


/*    if($scrollTop > $photoListWrap ) {
        UI.photoListAni('2');
    }*/
    UI.headetStickyBar();
    UI.scrollTopStickyBtn();
});
//resize
$(window).on('resize', function(){
    UI.tooltip();
});
