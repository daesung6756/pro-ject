var UI = {
    init : function (){
        this.toolTips();
    },
    toolTips : function (){
        var toolTipGroup = [];
        $("[data-tooltip]").each(function () {
            if($.inArray($(this).data('tooltip'), toolTipGroup === -1)){
                toolTipGroup.push($(this).data('tooltip'));
            }
        });

        $.each(toolTipGroup, function (key, value){
            var $tip = $("[data-tooltip=" + value + "]");
            var $dir = $tip.attr('data-tooltip-dir');
            var $text = $tip.attr('data-tooltip-text');

            $tip.on("mouseenter",function(){
                $(this).append('<span class="tooltip-content">' + $text + '</span>');
                if($dir !== "" || $dir !== undefined){
                    $(this).find('span.tooltip-content').addClass($dir);
                } else {
                    $(this).find('span.tooltip-content').addClass("top");
                }
            }).on('mouseleave', function(){
              if($('span.tooltip-content')){
                  $(this).find('span.tooltip-content').remove();
              } else {
                  return false;
              }
            });

        });
    }
};

UI.init();