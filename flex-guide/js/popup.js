var dimmed = false;
function Popup (parent, type, timeout) {
    this.body = $('body');
    this.parent = $(parent);
    this.type = type;
    this.timeout = timeout;

    this.init();
}
Popup.prototype = {
    init: function() {
        this.popControl()
        // if(this.timeout !== null && this.timeout !== undefined && this.timeout !== ''){
        // } else {
        // }
    },
    popControl : function () {
        var $this = this;
        $(document).on('click', '.pop-open', function() {
            $this.parent.addClass('is-show');
            $this.dimmed();
        });
        $(document).on('click', '.pop-close', function() {
            $this.parent.removeClass('is-show');
            $this.dimmed();
        });
    },
    dimmed : function() {
        var $this = this;
        if(dimmed){
            if($this.type !== null && $this.type !== undefined && $this.type !== '') {
                dimmed = false;
                $('.dimmed').remove();
            } else {
                dimmed = true;
                $this.body.append('<div class="dimmed is-show"></div>');
            }
        } else {
            if($this.type !== null && $this.type !== undefined && $this.type !== '') {
                dimmed = true;
                $this.body.append('<div class="dimmed is-show"></div>');
            } else {
                dimmed = false;
                $('.dimmed').remove();
            }
        }
    }
};

