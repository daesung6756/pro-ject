let $id = userData.userLogin.id;
let $pass = userData.userLogin.password;
let $today = false;
let joinPlayer =[];

let UI = {
    init : function(){
        this.drawUserData();
        this.onLayer();
        this.onPush();
    },
    drawUserData: function() {
        let dd  = userData.user;
        for(let i=0; i < dd.length ; i++ ) {
            var $mychat = $('.my-chat');
            var $joinChat = $('.join-chat');

            if (dd[i].chatroom.join !== false) {
                joinPlayer.push(i);
                if (dd[i].chatroom.class !== 'master') {
                    $joinChat.append('<div class="write resualt"><textarea class="textarea noresize" placeholder="상대 메세지"></textarea><button type="button" class="button">입력</button></div>')
                } else {
                    $mychat.append('<div class="write request"><textarea class="textarea noresize" placeholder="내 메세지"></textarea><button type="button" class="button">입력</button></div>')
                }
            }
        }
        this.joinUserOption(joinPlayer);
    },
    joinUserOption: function(array) {
        $('.write .textarea').each(function(index) {
            let $player = $('.chat-header .player');
            let $roomName = $('.chat-header .info .name');
            let $length = $('.write .textarea').length;
            let $pic = userData.user[array[index]].pic;
            let $getRoomName = userData.user[array[index]].chatroom.class;

            if ($length > 2){
                if ($getRoomName !== 'member') {
                    $roomName.append('<span class="room-title">' +userData.user[array[index]].chatroom.title + '</span><span class="join-player"> (' + $length + ')</span>');
                }
            } else {
                if($roomName.children().is('.join-player') !== true){
                    $roomName.append('<span class="room-title">' +userData.user[array[1]].name +'님 과의 대화 '+ '</span><span class="join-player"> (' + $length + ')</span>');
                }
            }
            if($getRoomName !== false){
                $(this).attr('placeholder', userData.user[array[index]].name + '님의 메세지 입력');

                if($length >= 4){
                    $player.addClass('case4');
                } else {
                    $player.addClass('case'+ $length);
                }

                $player.append('<div class="pic"><div class="pic-inner"><span class="photo" style=background-image:url(' + $pic +')></span><span class="fake"></span></div></div>');

            }
        });
    },
    resualtTextData : function(e) {
        let $getDate = new Date();
        let $hour = $getDate.getHours();
        let $min = $getDate.getMinutes();
        let $wrap = $('.view');
        let $value = $(this).siblings('textarea.textarea').val();
        let number = $(e.target).parent('.write').index() + 1;

        if($hour < 10 ){$hour = '0' + $hour;}
        if($min < 10){$min = '0' + $min;}
        if($today !== true){
            let $thisDay = $getDate.getFullYear()+'년' + ($getDate.getMonth() + 1) + '월' + $getDate.getDay() + '일';
            $wrap.append('<div class="chat-line today-notice"><span class="text">' + $getDate.getFullYear()+'년' + ($getDate.getMonth() + 1) + '월' + $getDate.getDay() + '일' + '</span></div>');
            $today = true;
        }

        $(this).siblings('textarea.textarea').val('');
        if($(e.target).parent('.write').hasClass('request')) {
            $wrap.append('<div class="chat-line iam">' +
                '<div class="line-inner">' +
                '<div class="profile">' +
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
                '<span class="photo" style="background-image:url('+ userData.user[joinPlayer[number]].pic +')"></span>' +
                '<span class="fake"></span>' +
                '</div>' +
                '</div>' +
                '<div class="balloon-wrap">' +
                '<span class="user-id">' + userData.user[joinPlayer[number]].name +'</span>'+
                '<div class="balloon">'+ $value +'</div>' +
                '<span class="time">' +$hour + ':'+ $min + '</span>' +
                '</div>' +
                '</div>' +
                '</div>');
        }


        $('.chat-wrap .chat-line').each(function(){
            var i = 69;
            var num = $('.chat-wrap .chat-line').length;
            var sum = num * i;
            $('.view').scrollTop(sum);
        });
    },
    onLayer : function() {
        let layerGroup = [];
        $('[data-layer]').each(function(key, value) {
            if($.inArray($(this).data('layer'), layerGroup) === -1){
                layerGroup.push($(this).data('layer'));
            }
        });

        $.each(layerGroup, function(key,value){
            let $btn = $('[data-layer=' + value + ']');
            let $layer = $('[data-layer-panel=' + value + ']');

            $layer.removeClass('is-active');
            $btn.on('click', function(e){
                let index = $(this).index();
                e.preventDefault();
                $layer.eq(index).addClass('is-active');
            });
        });
    },
    eventClear : function(e) {
        let $target = $(e.target);
        // layer clear
        if($('[data-layer]').has(e.target).length === 0){
            $('[data-layer-panel]').removeClass('is-active');
        }

    },
    onPush: function() {
        let pushGroup = [];
        $('[data-push]').each(function(key, value){
            if($.inArray($(this).data('push'), pushGroup ) === -1){
                pushGroup.push($(this).data('push'));
            }
        });

        $.each(pushGroup, function(key, value){
            let $btn = $('[data-push=' + value + ']');
            let $push = $('[data-push-content=' + value + ']');

            $btn.on('click',function(e){
                let index = $(this).index();
                let $target = $push.eq(index);
                e.preventDefault();
                if($(this).hasClass('on')){
                    $(this).removeClass('on');
                    $target.removeClass('on');
                    setTimeout(function(){
                        $target.addClass('off')
                    }, 100);
                    setTimeout(function(){
                        $target.removeClass('off')
                    }, 3000);
                } else {
                    $(this).addClass('on');
                    $target.removeClass('off');
                    setTimeout(function(){
                        $target.addClass('on')
                    }, 100);
                    setTimeout(function(){
                        $target.removeClass('on')
                    }, 3000);
                }
            });
        });
    }
};

$(document).on('change','.form-input.b-line-type', function(){
    let myName = $(this).attr('name');
    let myValue = $(this).val();
    $(this).parents('form').find("input[type='hidden'][name=" + myName +"]").val(myValue);
});

$(document).on('click','#nickNmaeMake', function(e){
    let $getId = $('input[name="user_id"]').val();
    let $getpw = $('input[name="user_pass"]').val();
    e.preventDefault();
    if($id === String($getId) && $pass === String($getpw) ){
        alert('로그인이 성공 하였습니다.\n Enjoy Baby');
        location.href= "chat.html";
    } else {
        alert('아이디와 비밀번호가 맞지 않습니다.');
    }
});

$(document).on('click', '.write button.button', UI.resualtTextData);
$(document).on('click',UI.eventClear);

$(function(){
    UI.init();
});