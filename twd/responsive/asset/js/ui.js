$(document).ready(function (e) {
   /*modal*/
    $('.js-modal-open').click(function (e) {
        $($(this).data('target')).addClass('open');
        /*2019.03.29 - start */
        $('body').addClass('modal-open');
        /*2019.03.29 - end */
    });
   $('.js-modal-close').click(function (e){
      $($(this).data('target')).removeClass('open');
       /*2019.03.29 - start */
       $('body').removeClass('modal-open');
       /*2019.03.29 - end */
   });
});
