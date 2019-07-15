let UI = {
    init : function(){
        this.tableNumberRing();
        this.tableAni();
    },
    tableNumberRing : function () {
        $($('table tbody tr').get().reverse()).each(function(idx){
            ++idx;
            $(this).prepend('<td><span class="num-box">'+ idx + '</span></td>');
        });
    },
    tableAni : function (){
        var aniGroup = [];
        $('[data-ordered]').each(function(key, value) {
            if($.inArray($(this).data('orderedList'), aniGroup) === -1){
                aniGroup.push($(this).data('orderedList'));
            }
        });
        $.each(aniGroup, function(key, value){
            var $List = $('[data-orderedList=' + value + ']');
            var $Text = $('[data-orderedList-text=' + value + ']');
            console.log($List);
        });
    },
};


$(document).ready(function(){
    UI.init();
});