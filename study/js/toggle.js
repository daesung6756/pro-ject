var UI = {
    init:function(){
        this.toggleGroup();
    },
    toggleGroup: function() {
        var toggleGroup = [];
        $('[data-toggle]').each(function(key, value){
            if($.inArray($(this).data('toggle'), toggleGroup) === -1){
                toggleGroup.push($(this).data('toggle'));
            }
        });

        $.each(toggleGroup, function(key, value){
            var $toggle = $('[data-toggle=' + value +']');
            var $panel = $('[data-toggle-panel=' + value +']');

            $panel.removeClass('is-show');
            $toggle.click(function(e){
                e.preventDefault();
                if($panel.hasClass("slide-event")){
                    if($panel.hasClass('is-show')){
                        $panel.slideUp(200);
                    } else {
                        $panel.slideDown(200);
                    }
                }

                $panel.toggleClass('is-show');

            });
        })
    }
};


UI.init();

(function($){

}(jQuery));
