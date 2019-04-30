
const userData = {
    user:[
        {
            id:'Watson',
            password:'donner',
            email: 'allan.watson28@example.com',
            birthday:'4/7/1972',
            address: '4544 Mockingbird Hill',
            phone: '(916)-488-3214',
            name:'allan watson',
            pic : 'https://randomuser.me/api/portraits/men/17.jpg'
        },
        {
            id:'Watson2',
            password:'donner2',
            email: 'allan.watson28@example.com',
            birthday:'4/7/1972',
            address: '4544 Mockingbird Hill',
            phone: '(916)-488-3214',
            name:'allan watson',
            pic : 'https://randomuser.me/api/portraits/men/36.jpg'
        }
    ]
};

(function($){
    $.fn.extend({
        resualtTextData : function() {
            let $getDate = new Date();
            let $hour = $getDate.getHours();
            let $min = $getDate.getMinutes();
            let $wrap = $('.view');
            let $value = $(this).siblings('textarea.textarea').val();
            if($hour < 10 ){
                $hour = '0' + $hour;
            }
            if($min < 10){
                $min = '0' + $min;
            }

            $(this).siblings('textarea.textarea').val('');
            if($(this).parents('.write').hasClass('request')) {
                $wrap.append('<div class="chat-line iam">' +
                    '<div class="line-inner">' +
                    '<div class="profile">' +
                    '<div class="pic">' +
                    '<span class="photo" style="background:url('+ userData.user[1].pic +')"></span>' +
                    '<span class="fake"></span>' +
                    '</div>' +
                    '</div>' +
                    '<div class="balloon-wrap">' +
                    '<div class="balloon">'+ $value +'</div>' +
                    '<span class="time">' +$hour + ':'+ $min + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>');
            } else {
                $wrap.append('<div class="chat-line">' +
                    '<div class="line-inner">' +
                    '<div class="profile">' +
                    '<div class="pic">' +
                    '<span class="photo" style="background:url('+ userData.user[0].pic +')"></span>' +
                    '<span class="fake"></span>' +
                    '</div>' +
                    '</div>' +
                    '<div class="balloon-wrap">' +
                    '<div class="balloon">'+ $value +'</div>' +
                    '<span class="time">' +$hour + ':'+ $min + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>');
            }
        }
    });
    let UI = {
        init : function () {
        },
    };
    UI.init();

})(jQuery);

