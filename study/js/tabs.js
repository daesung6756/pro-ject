var UI = {
    init: function() {
        this.tabs();
    },
    tabs : function () {
        var tabGroup = [];
        $('[data-tab]').each(function(key, value){
            if($.inArray($(this).data('tab'), tabGroup) === -1){
                tabGroup.push($(this).data('tab'));
            }
        });

        $.each(tabGroup, function(key, value){
            var $tab = $('[data-tab=' + value + ']');
            var $content = $('[data-tab-content=' + value + ']');
            var onIndex = $tab.index($tab.filter('.on'));
            $content.hide();
            $content.eq(onIndex).show();
            $tab.click(function(){
                var index = $(this).index();
                $tab.removeClass('on');
                $tab.eq(index).addClass('on');
                $content.hide();
                if($(this).hasClass('fade-effect')){
                    $content.eq(index).fadeIn(300);
                } else {
                    $content.eq(index).show();
                    return false;
                }
            });
        });
    },
};

UI.init();