let UI = {
    init : function() {
        this.accordianDataDraws(datas.qa);
        this.tooltip();
        this.accordian();
    },
    accordianDataDraws : function(obj){
        let accordianDatas = obj;
        let $parents = $('.accordian-list');

        $.each(accordianDatas, function(key, value ){
            let $lis = $parents.append('<li>');


            if(accordianDatas[key].open !== undefined && accordianDatas[key].open === true) {
                $parents.children().eq(key).append(
                    '<div class="question">' +
                    '<span class="num">' + key + '.</span>' +
                    '<span class="tit">' + accordianDatas[key].quest + '</span>' +
                    '<a href="javascript:void(0);" data-accordian="' + accordianDatas[key].dataName +'" class="is-active" data-tooltip="' + datas.qaEventToolTip + '"><i class="icon icon-down-arrow"><span class="blind">열기/닫기</span></i></a>' +
                    '</div>' +
                    '<div class="answer panel" data-accordian-panel="' + accordianDatas[key].dataName + '">' +
                    '<p class="error_desc">' + accordianDatas[key].quest + '</p>' +
                    '<p class="complete_desc">' + accordianDatas[key].answer + '</p>' +
                    '</div>');
            } else {
                $parents.children().eq(key).append(
                    '<div class="question">' +
                    '<span class="num">' + key + '</span>' +
                    '<span class="tit">' + accordianDatas[key].quest + '</span>' +
                    '<a href="javascript:void(0);" data-accordian="' + accordianDatas[key].dataName + '" data-tooltip="' + datas.qaEventToolTip + '"><i class="icon icon-down-arrow"><span class="blind">열기/닫기</span></i></a>' +
                    '</div>' +
                    '<div class="answer panel" data-accordian-panel="' + accordianDatas[key].dataName + '">' +
                    '<p class="error_desc">' + accordianDatas[key].quest + '</p>' +
                    '<p class="complete_desc">' + accordianDatas[key].answer + '</p>' +
                    '</div>');
            }
         });
    },
    accordian : function (){
        let accorianGroup = [];
        $('[data-accordian]').each(function(key, value){
            if($.inArray($(this).data('accordian'),accorianGroup) === -1 ){
                accorianGroup.push($(this).data('accordian'));
            }
        });

        $.each(accorianGroup, function(key, value){
            let $btn = $('[data-accordian=\'' + value + '\']');
            let $panel = $('[data-accordian-panel=\'' + value + '\']');
            let $onIndex = $btn.index($btn.filter('.is-active'));

            $panel.slideUp(0);
            if($btn.hasClass('is-active')){$panel.eq($onIndex).slideDown(0);}

            $btn.on('click', function (e) {
                let $index = $btn.index(this);
                e.preventDefault();
                if($btn.eq($index).hasClass('is-active')){
                    $btn.removeClass('is-active');
                    $panel.slideUp(100);
                } else {
                    $btn.removeClass('is-active');
                    $btn.eq($index).addClass('is-active');
                    $panel.slideUp(100);
                    $panel.eq($index).slideDown(300);
                }
            });
        })
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

            $target.on('mouseenter',function(){
                let dataValue = value.replace(" ", "&nbsp;");

                if($(this).find('.tooltip').length !== 1){
                    let $makeTools = $(this).append('<div class="tooltip"></div>');
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
    asearchBar: function(z){
        let $this = $(el);
        let $list = $()
        let $word = $(this).val();
        $('.accordian-list li').hide(0);
        let temp = $('.accordian-list li .question .tit:contains(' + $word + ')');
        $(temp).parents('li').show();
    }
};

$(function() {
    UI.init();
});

$(window).on('resize', function() {
    UI.tooltip();
});