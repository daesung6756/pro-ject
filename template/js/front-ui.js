function getScrollTopEvent () {
    var $this = this;
    var $bodyScroll = $('html, body').scrollTop();
    console.log(this);
    console.log($this);
    if($bodyScroll > 300){
        $($this).addClass('is-show');
    } else {
        if( $($this).hasClass('is-show')){
             $($this).removeClass('is-show');
        } else {
            return false;
        }
    }
}
function scrollTopEvent(e) {
    e.preventDefault();
    $('html, body').stop().animate({scrollTop: 0}, 1000);
}

$(document).on('click', '.scroll-top button', scrollTopEvent);

$(document).ready(function(){
    $(window).on('scroll', '.scroll-top', getScrollTopEvent);
});