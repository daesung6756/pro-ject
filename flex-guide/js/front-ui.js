function cssSetter (e , $property, $classNmae , $index, $indexVal) {
    var $this = e.target;
    var $val = $this.value;
    var $target = $($classNmae);
    var $option = $property;
    var $flexWrap = $('.flex-container');
    var $flexWrapChild = $('.flex-container').children();
    var $th = this;
    $target.css($option, $val);
    if ($flexWrap.attr("style") !== null && $flexWrap.attr("style") !== undefined && $flexWrap.attr("style") !== '') {
        $('.resualt-container').html('.flex-container { display:flex;<span>' + $flexWrap.attr('style') + '</span>}');
    } else {
        $('.resualt-container').html('.flex-container { display:flex; }');
    }
    if ($flexWrapChild.attr("style") !== null && $flexWrapChild.attr("style") !== undefined && $flexWrapChild.attr("style") !== ''){
        $('.resualt-in-box').html('.flex-container .in_box {<span>' + $flexWrapChild.attr('style') + '</span>}');
    } else {
        $('.resualt-in-box').html('.flex-container .in_box {}');
    }
    if($index !== null && $index !== undefined && $index !== '' && $indexVal !== null && $indexVal !== undefined &&  $indexVal !== ''){
        $flexWrapChild.eq($index).css($option , $indexVal);
        $('.resualt-in-box-first').html('.flex-container .in_box:nth-child('+ $index +'){<span>' + $property +':'+ $indexVal + '</span>}');
    } else {
        $('.resualt-in-box-first').html('');
    }
}
function slidePanelControl (e) {
    var panel = $(this).parent('h3.title').siblings('.panel');
    e.preventDefault();
    $(this).toggleClass('is-rotate');
    panel.toggleClass('is-show');
}
function makeInBox () {
    var $length = $('.flex-container .in_box').length;
    var $last = $length - 1;
    var $plus = $length + 1;
    $('.flex-container').append('<div class="in_box">'+ $plus +'</div>');
}
function removeBox () {
    var $length = $('.flex-container .in_box').length;
    var $last = $length - 1;
    $('.flex-container .in_box').eq($last).remove();
}
function containerWidthCtrl (){
    var $container = $('.flex-container');
    var $val = $(this).val();
    $container.css({'width' : $val + '%'})
}