var UI = {
    init : function () {
        this.tab();
    },
    tab : function(){
        var tabGroup = [];
        $('[data-tab]').each(function(){
            if($.inArray($(this).data('tab'), tabGroup) === -1){
                tabGroup.push($(this).data('tab'));
            }
        });
        $.each(tabGroup,function(key,value){
            var $tab = $('[data-tab=' + value + ']');
            var $content = $('[data-tab-content=' + value + ']');
            var onIndex = $tab.index($tab.filter('.is-active'));
            $content.hide();
            $content.eq(onIndex).show();
            $tab.on('click',function(){
                var index = $(this).index();
                $tab.removeClass('is-active');
                $tab.eq(index).addClass('is-active');
                $content.hide();
                $content.eq(index).show();
            });
        });
    },
};

$(function(){
  UI.init();
});
