var UI = {
    init : function(){
        this.tableColDraw('.intro-tbl-col', colOption1, rowData1);
        this.tableAni('.tbl-col', 'ani-slide-down-up');
        this.toggleClassTarget('.overlay.d-right', '.tbl-event-btn', 'is-show');
        this.historyLogDraw(historyLog);
        this.moreText('.feedback', '22');

        this.tabs();
        this.sectionToggleSwitchEvent();
        this.tooltip();
        this.headetStickyBar();
        this.windowKeyCodeCheck();
        this.mainVisualSwitchEvent();
        this.visualMouseClickEvent();
        this.gnbListDraw();
        this.popup();
    },
    tableColDraw: function(wrap, cols, rows){
        if(cols && rows) {
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
        if(cols && rows) {
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
    historyLogDraw : function(obj) {
        var $obj = obj;
        var $years = new Date().getFullYear();
        var $afterLog = $(".years-tab li.after-log");
        var $beforeLog = $(".years-tab li.before-log");
        var $totalLength = $obj.length;
        var $mArray = [];
        var $nArray = [];

        $.each($obj, function(key, value){
            var $getYears = value.date;
            if($getYears.match($years)){
                $mArray.push($getYears.match($years));
            } else {
                $nArray.push($getYears.match(null));
            }
        });

        var $aMax = $mArray.length;
        var $bMax = $nArray.length;

        $.each($obj, function(key, value){
            var $getYears = value.date;
            var $pc = value.img[0];
            var $tablet = value.img[1];
            var $mobile = value.img[2];
            var $count;
            var $el;

            if (parseInt($getYears.split(".")) !== parseInt($years)) {
                $el = $('.photo-list.before-log');
                $beforeLog.text('before (' + $nArray.length + ')');
                $count = $bMax--;
            } else {
                $el = $('.photo-list.after-log');
                $afterLog.text($years + ' (' + $mArray.length + ')');
                $count = $aMax--;
            }

            var $info =
                '<dl class="info">' +
                '<dd class="name">' + $count + '.&nbsp;'+ value.name + '</dd>' +
                '<dd class="type">' + value.type + '</dd>' +
                '<dd class="date">' + value.date + '</dd>' +
                '<dd class="agency">' + value.agency + '</dd>' +
                '<dd class="customer">' + value.customer + '</dd>' +
                '<dd class="position">' + value.position + '</dd>' +
                '<dd class="process">' + value.process + '</dd>' +
                '<dd class="language">' + value.language + '</dd>' +
                '<dd class="tool">' + value.tool + '</dd>' +
                '<dd class="support">' + value.support + '</dd>' +
                '<dd class="description"><p>' + value.description + '</p></dd>' +
                '<dd class="feedback"><p>' + value.feedback + '</p></dd>' +
                '<dd class="url"><a href="' + value.url + '" target="_blank" title="' + value.url + ' 바로가기">사이트 바로가기</a></dd>' +
                '</dl>';
            var $pic1 = '<div class="pic">' +
                '<span class="item case1" style="background-image:url(' + $pc + ');"></span>' +
                '<span class="item case2"></span>' +
                '<span class="item case3" style="background-image:url(' + $mobile + ');"></span>' +
                '</div>';
            var $pic2 = '<div class="pic">' +
                '<span class="item case1" style="background-image:url(' + $pc + ');"></span>' +
                '<span class="item case2"></span>' +
                '<span class="item case3"></span>' +
                '</div>';
            var $pic3 = '<div class="pic">' +
                '<span class="item case1"></span>' +
                '<span class="item case2"></span>' +
                '<span class="item case3" style="background-image:url(' + $mobile + ');"></span>' +
                '</div>';
            var $pic4 = '<div class="pic">' +
                '<span class="item case1" style="background-image:url(' + $pc + ');"></span>' +
                '<span class="item case2" style="background-image:url(' + $tablet + ');"></span>' +
                '<span class="item case3" style="background-image:url(' + $mobile + ');"></span>' +
                '</div>';
            var $pic5 = '<div class="pic">' +
                '<span class="item case1"></span>' +
                '<span class="item case2"></span>' +
                '<span class="item case3"></span>' +
                '</div>';

            if($pc !== '' && $mobile !== '' && $tablet === '') {
                $el.append('<li>' + $pic1 + $info + '</li>');
            } else if($pc !== '' && $tablet === '' && $mobile === '') {
                $el.append('<li>' + $pic2 + $info + '</li>');
            } else if($pc === '' && $tablet === '' && $mobile !== '') {
                $el.append('<li>' + $pic3 + $info + '</li>');
            } else if ($pc !== '' && $tablet !== '' && $mobile !== ''){
                $el.append('<li>' + $pic4 + $info + '</li>');
            } else {
                $el.append('<li>' + $pic5 + $info + '</li>');
            }

        });
    },
    defaultListDraw : function(el, array) {
        var $el = $(el);
        var $array = array;

        $.each(array , function(key,value) {
            $el.append('<li>'+ value +'</li>');
        });
    },
    gnbListDraw : function() {
        var $el = $('.gnb .nav-list');
        var $array = gnbList;

        $.each($array, function (key, value) {
            $el.append('<li><a href="' + value.url + '">' + value.name + '</a></li>');
        });
    },
    profileQaDraw: function(el, array) {
        var $el = $(el);
        var $array = array;
        var $sort = [];
        var $random = [];

        $.each($array, function (key, value) {
            $random.push(value);
        });

        $random.sort(function(){
            return Math.random() - Math.random();
        });

        $random.splice(0, ($random.length - 10));

        $.each($random ,function(key, value){
            $(el).append('<p class="question">' + value.question + '</p><p class="answer">' + value.answer + '</p>')
        });

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
                e.preventDefault();
                $tabs.removeClass('is-active');
                $tabs.eq($index).addClass('is-active');
                $contents.hide();
                $contents.eq($index).show();
            });

        });
    },
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
            $this.addClass('is-fixed');
            $this.addClass('is-active');
        } else if( $htmlScrollTop > 0){
            $this.addClass('is-fixed');
            $this.removeClass('is-active');
        } else {
            $this.removeClass('is-fixed');
            $this.removeClass('is-active');
        }
    },
    scrollLimitEvent: function(btn ,min, max , classNmae) { //버튼클래스, 최소높이 클래스, 최대 높이 클래스, 컨트롤 클래스
        var $scroll = $(document).scrollTop();
        var $float = $(btn);
        var $floatHeight = $float.outerHeight();
        var $floatOffsetTop = $(btn).offset().top;
        var $minTop = $(min).offset().top;
        var $maxTop = $(max).offset().top - $floatHeight;

        if($scroll < $minTop){
            $float.removeClass(classNmae);
        } else if($floatOffsetTop < $maxTop) {
            $float.addClass(classNmae);
        } else {
            $float.removeClass(classNmae);
        }
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

        var $toggleBtn = $('.visual-toggle');
        var $visual = $('.visual-spot');
        var $mouse = $('.mouse');
        var $theme = $("body");

        $toggleBtn.on('click', function(){
            if($(this).hasClass('is-on')){
                $(this).removeClass('is-on');
                $visual.removeClass('is-on');
                $theme.removeClass('x-mas');
                $mouse.css({"display":"inline-block"});
                $themeOncheck = false;
            } else {
                $(this).addClass('is-on');
                $visual.addClass('is-on');
                $theme.addClass('x-mas');
                $themeOncheck = true;
            }
        })

    },
    sectionToggleSwitchEvent : function(){
        var $btn = $(".section-inner .toggle-switch");
        $btn.on('click', function(){
            $(this).parents('.section').toggleClass("is-on");
        });
    },
    visualMouseClickEvent : function () {
        var mouseGroup=[];

        $('.mouse').each(function(key, value){
            mouseGroup.push(this);
        });

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
                $target.children('.dimmed').remove();
            });
        })

    },
    moreText : function(el, height) {
        var $height = Number(height);
        $(el).each(function() {
            var length = $(this).children('p').text().length;

            if(length > 30) {
                $(this).append('<a href="" class="more-event">더보기</a>');
                var $btn = $(this).find('.more-event');
                $btn.on('click', function (e) {
                    e.preventDefault();
                    var $el = $(this).parents(el);
                    var $text = String($(this).text());

                    if ($text !== '더보기') {
                        $el.children('p').css({'height': $height + 'px', 'white-space': 'nowrap'});
                        $(this).text('더보기');
                    } else {
                        $el.children('p').css({'height': 'auto', 'white-space': 'normal'});
                        $(this).text('접기');
                    }
                });
            } else {
                return false;
            }

        });
    },
    itTtListSearch : function(list) {
        var $el = $(".search-wrap .search-output");
        var $value = $(list).val();
        var $match = $(".search-output li:contains('" + $value + "')");

        $el.children().removeClass("is-show");

        if($value.length !== 0) {
            $('.search-count span.num').text('(' +$match.length + ')');
            $match.each(function (key, value) {
                $(this).addClass("is-show");
            });
        } else {
            $('.search-count span.num').text('(0)');
            $el.children().removeClass("is-show");
        }
    },
    popupLogSearch : function(list , obj) {
        var $el = $('.photo-list');
        var $value =  $(list).val();
        var $resualt = $(".pop .resualt-search");
        var $obj = obj;
        var $matchArray = [];

        $.each($obj, function(key, value) {
            var $url = value.url;
            var $name = value.name;
            var $regexp = new RegExp($value, 'ig');

            if($name.match($regexp)){
                $matchArray.push(value);
            }
        });

        if($value.length !== 0 && $value !== '') {
            if($matchArray.length !== 0) {
                $resualt.text('');
                $resualt.children().remove();
                $.each($matchArray, function (key, value) {
                    var $num = parseInt(key + 1);
                    var $getUrl = value.url;
                    var $getName = value.name;
                    $resualt.append('<a href="' + $getUrl + '" target="_blank" title="새창 이동">'+ $num +'. '+ $getName + '</a>');
                });
            } else {
                $resualt.text('검색 결과가 없습니다.');
            }
        } else {
            $resualt.children().remove();
            $resualt.text('검색 결과가 없습니다.');
        }
    },
    patOnTheBack: function (el, array) {
        var $body = $('body');
        var $btn = $(el);
        var $array = array;
        var $random = [];
        var $popOn = false;

        $btn.on('click', function(e){
            e.preventDefault();

            if(!$body.children().is('.layer-pop')) {
                $.each($array, function (key, value) {$random.push(value);});
                $random.sort(function () {return Math.random() - Math.random();}); // 랜덤 정렬
                $random.splice(0, ($random.length - 1)); // 1개만 가져오기

                $body.append('<div class="layer-pop"><div class="pop-body"><span class="text">' + $random + '</span></div><div class="pop-foot"><button type="button" class="close-layer-pop">닫기</button></div></div>');
                $body.find('.layer-pop .close-layer-pop').focus();

                $popOn = true;
            } else {
                alert("먼저 팝업을 닫아 주세요.");
                return false;
            }
        });

        $(document).on('click','button.close-layer-pop', function(e){
            e.preventDefault();
            if($popOn){
                $body.find('.layer-pop').remove();
                $popOn = false;
            } else {
                return false;
            }
        })
    }
};

var $aniEvent = false;
var $themeOncheck = false;
//ready
$(function(){
    UI.init();
    if($themeOncheck){
        $('.visual-toggle').click();
    }
});
//scroll
$(window).on('scroll', function(){
    UI.headetStickyBar();
    UI.scrollLimitEvent('.scroll-floating', '.container', '.footer',"is-show");
});
//resize
$(window).on('resize', function(){
    UI.tooltip();
});
//event
$(document).on('click', '.scroll-floating button', function(e){
    e.preventDefault();
    $('html, body').stop(e).animate({scrollTop : 0}, 300);
});
$(document).on('keyup', "#searcTtList" , function(){
    UI.itTtListSearch(this);
});
$(document).on('click', "#getSearchText", function() {
    UI.popupLogSearch('#searchTit',historyLog);
});
$(document).on("keypress",'#searchTit', function(event){//input enter key
    if(event.keyCode === 13) {
        $('#getSearchText').click();
    }else if (event.keyCode === 96){
        $('#searchTit').val('');
    }
});
