let UI = {
    init : function(){
        this.tabs();
        this.tableColDraw('.intro-tbl-col', colOption1, rowData1);
        this.tableAni('.tbl-col', 'ani-slide-down-up');
        this.tableRowDraw('.intro-tbl-row', rowTableColOption, rowData2);
        this.tableRowDraw('.intro-tbl-row2',rowTableColOption, rowData3);
        this.tableRowDraw('.intro-tbl-row3',rowTableColOption, rowData4);
        this.toggleClassTarget('.overlay.d-right', '.tbl-event-btn', 'is-show');
        this.tooltip();
        this.headetStickyEvent();
        this.scrollTopStickyBtn();
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
    tableColDraw: function(wrap, cols, rows){
        if(cols && rows && cols !== undefined && rows !== undefined) {
            if ($('.intro-tbl-col')) {
                let $col = cols;
                let $row = rows;
                let makeTable = $('<table>');
                let makeThead = $('<thead>');
                let makeTbody = $('<tbody>');
                let $colgroup = $('<colgroup>');
                $(wrap).append($(makeTable));
                $(makeTable).addClass('tbl-col').append($($colgroup)).append($(makeThead)).append($(makeTbody));
                $(makeThead).append('<tr>');
                $.each($col, function (i, dt) {
                    $($colgroup).append('<col style="width:' + dt["width"] + '">');
                    $(makeThead).find('tr').append('<th scope="col">' + dt["headline"] + '</th>');
                });
                $.each($row, function (i, row) {
                    let makeTr = $('<tr>');
                    let $nrow = $(makeTbody).prepend($(makeTr));

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
                let $col = cols;
                let $row = rows;
                let makeTable = $('<table>');
                let makeTbody = $('<tbody>');
                let $colgroup = $('<colgroup>');
                $(wrap).append($(makeTable));
                $(makeTable).addClass('tbl-row').append($($colgroup)).append($(makeTbody));

                $.each($col, function (i, dt) {
                    $($colgroup).append('<col style="width:' + dt["width"] + '">');
                });
                $.each($row, function (i, row) {
                    let makeTr = $('<tr>');
                    let $nrow = $(makeTbody).append($(makeTr));

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
        let $tableTr = $(tname +' tbody tr'),
            currentHighlight = 0,
            N = 2;

        $tableTr.eq(0).addClass(aname);
        setInterval(function(){
            currentHighlight = (currentHighlight + 1) % $tableTr.length;
            $tableTr.removeClass(aname).eq(currentHighlight).addClass(aname);
        },N * 1000);
    },
    photoListAni: function(sec) {
        let $listLi =  $('.photo-list li'),
            currentHighlight = 0,
            N = sec;

            if($aniEvent !== true){
                $listLi.eq(0).addClass("ani-on");
                let $inter = setInterval(function () {
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

    },
    tooltip: function () {
        let tooltipGroup = [];
        $('[data-tooltip]').each(function() {
            if($.inArray($(this).data('tooltip') , tooltipGroup) === -1){
                tooltipGroup.push($(this).data('tooltip'));
            }
        });

        $.each(tooltipGroup , function(key, value) {
            let $target = $('[data-tooltip=\''+ value +'\']');

            $target.on('mouseenter',function(){
                let dataValue = value.replace(" ", "&nbsp;");

                if($(this).find('.tooltip').length !== 1){
                    let $makeTools = $(this).append('<span class="tooltip"></span>');
                    let $thisToolTip = $(this).find('.tooltip');

                    $thisToolTip.html(dataValue);

                    let $width = $(window).width();
                    let $toolTipOffsetLeft = $thisToolTip.offset().left;
                    let $toolTipOffsetRight = $toolTipOffsetLeft + $thisToolTip.outerWidth();
                    let $moveOffset = ($toolTipOffsetRight - $width) + 20;

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
    toggleClassTarget : function ( el, el2 , className ){
        let $el = $(el);
        let $clickEl = el2;
        let $eventClass = className;

        $(document).on('click', $clickEl, function(){
            let $title = $(this).attr('title');
            if($el.hasClass($eventClass)){
                $el.removeClass($eventClass);
                $(this).attr('title','리스트 열기');
            } else {
                $el.addClass($eventClass);
                $(this).attr('title','리스트 닫기');
            }
        });
    },
    headetStickyEvent : function(){
        let $html = $('html, body');
        let $wrap = $('.wrap');
        let $this = $('.header');
        let $htmlScrollTop = $html.scrollTop();
        let $elHeight = parseInt($this.innerHeight());
        if($htmlScrollTop > $elHeight){
            $this.addClass('is-fixed');
        } else {
            $this.removeClass('is-fixed');
        }
    },
    scrollTopStickyBtn: function() {
        let $html = $('html, body');
        let $htmlScrollTop = $html.scrollTop();
    }
};

let $aniEvent = false;
$(document).ready(function(){
    UI.init();
});
$(window).on('scroll', function(){
    let $photoListWrap = $('.photo-list').offset().top/2;
    let $scrollTop = $('html, body').scrollTop();


    if($scrollTop > $photoListWrap ) {
        UI.photoListAni('2');
    }
    UI.headetStickyEvent();
    UI.scrollTopStickyBtn();
});
$(window).on('resize', function(){
    UI.tooltip();
});
