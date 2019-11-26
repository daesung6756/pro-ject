var UI = {
    init: function() {
        this.swiperEachContainer();
    },
    swiperEachContainer : function () {
        $('.swiper-container').each(function(){
            var _this = $(this);
            var _option = {
                loop:false,
                pagination:false,
                navigation:false,
                effect:false,
            };
            if(_this.hasClass('fade-effect')){
                _option.effect = 'fade'
            }
            if(_this.hasClass('loop-type')){
                _option.loop = true;
            }
            if(_this.find('.swiper-button-next').length > 0 &&
                _this.find('.swiper-button-prev').length > 0){
                _option.navigation = {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            }
            if(_this.find('.swiper-pagination').length > 0){
                _option.pagination = {
                    el : '.swiper-pagination',
                };

                if(_this.find('.swiper-pagination').hasClass('click-event')){
                    _option.pagination[clickable] = true;
                }

                if(_this.find('.swiper-pagination').hasClass('num-type')){
                    _option.pagination[type] = 'fraction'
                }

                if(_this.find('.swiper-pagination').hasClass('bar-type')){
                    _option.pagination[type] = 'progressbar'
                }
            }
            var swiper = new Swiper(_this, _option);
        });
    },
};

UI.init();
