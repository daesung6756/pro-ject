let UI = {
    init : function(){
        this.tabs();
        this.tableColDraw('.intro-tbl-col', colOption1, rowData1);
        this.tableAni('.tbl-col', 'ani-slide-down-up');
        this.tableRowDraw('.intro-tbl-row', rowTableColOption, rowData2);
        this.tableRowDraw('.intro-tbl-row2',rowTableColOption, rowData3);
        this.tableRowDraw('.intro-tbl-row3',rowTableColOption, rowData4);
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
                            $(makeTr).append('<td><a href="' + row['url'] + '" title="' + row[dt["key"]] + ' 바로가기" target="' + row['target'] + '"><span class="event-span">' + row[dt["key"]] + '</span></a></td>');
                        } else if (dt["key"] === 'num') {
                            $(makeTr).append('<td><span class="num-box">' + i + '</span></td>');
                        } else {
                            $(makeTr).append('<td>' + row[dt["key"]] + '</td>');
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
        var $tableTr = $(tname +' tbody tr'),
            currentHighlight = 0,
            N = 2;
        $tableTr.eq(0).addClass(aname);
        setInterval(function(){
            currentHighlight = (currentHighlight + 1) % $tableTr.length;
            $tableTr.removeClass(aname).eq(currentHighlight).addClass(aname);
        },N * 1000);
    },
};


$(document).ready(function(){
    UI.init();
});