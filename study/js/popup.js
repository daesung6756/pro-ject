var $obj = 1;
var UI = {
    init:function(){
        this.popup();
    },
    popup:function() {
        var popupGroup = [];

        $('[data-popup]').each(function(key, value){
            if($.inArray($(this).data('popup'), popupGroup) === -1){
                popupGroup.push($(this).data('popup'));
            }
        });

        $.each(popupGroup, function(key, value){
            var $popup = $('[data-popup=' + value +']');
            var $open = $('[data-popup-open=' + value +']');
            var $close = $('[data-popup-close=' + value +']');
            var $html = $('html, body');

            $popup.removeClass('is-show');

            $open.click(function(e){
                e.preventDefault();
                if($popup.hasClass('alert-type')){
                    $popup.removeClass('is-show');
                    $popup.addClass('is-show');
                } else {
                    $html.addClass('scroll-lock');

                    $popup.removeClass('is-show');
                    $popup.addClass('is-show');
                }
            });

            $close.click(function(e){
                e.preventDefault();

                $html.removeClass('scroll-lock');
                $popup.removeClass('is-show');
            });
        });
    },
    popCallBack: function(obj) {
        console.log(obj);
        return false;
    }
};


UI.init();

(function($){

}(jQuery));
