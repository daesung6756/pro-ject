/* ===============================================================
 //怨듯?
 ================================================================*/
//?듭?8 console ?щ??? 釉???곗?
if (typeof console == "undefined") {
    this.console = {log: function() {}, info: function() {}};
}

//selectbox ???/鍮???? 諛? ie8 ?щ??? 釉???곗?
$.fn.extend({
    selectDisabled: function(e){
        var disabled = false;
        $(this).prop('disabled',function(){
            disabled = !$(this).prop('disabled');
            return !$(this).prop('disabled');
        });
        var browser = UI.getBrowser();
        if((browser.ie8 || browser.ie9 || browser.ie10 || browser.safari)){
            $(this).select2();
        }
    },
    maxLength : function(maxlength){
        /*if(maxlength!=undefined){
            $(this).attr("maxlength",maxlength);
        }
        $(this).attr('oninput', "javascript: if ( this.maxLength > -1 &&this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");*/
        $(this).keydown(function(event){
            var maxlength = $(this).attr("maxlength");
            var vallength = $(this).val().length;
            var val = $(this).val();
            //console.log(vallength + '|' + maxlength);
            if(maxlength > -1 && vallength >= maxlength && !UI.isWhiteKeyCode(event) ){
                UI.preventDefault(event);
            }
        }).blur(function(){
            var val = $(this).val();
            var maxlength = $(this).attr("maxlength");
            $(this).val(val.slice(0,maxlength));
        }).on('paste',function(){
            var _this = this;
            setTimeout( function() {
                var val = $(_this).val();
                var maxlength = $(_this).attr("maxlength");
                $(_this).val(val.slice(0,maxlength));
            }, 100);
        });
    },
    textCount : function(text){
        var $text = text == undefined ? $(this).parent().find('.count-words em') : $(text);
        $(this).on('keyup input paste', function(event) {
            var _this = this;
            setTimeout( function() {
                var textLength = $(_this).val().length;
                //console.log(textLength);
                $text.text(textLength);
            }, 100);
        }).blur(function(){
            var length = $(this).val().length;
            if(length !=0){
                $(this).addClass('on');
            } else {
                $(this).removeClass('on');
            }
        });
    },
    modal : function(param){
        param = param ? param : {};
        $(this).off('click');
        $(this).click(function(){
            param.modal = $(this).data('modal');
            $.extend(param,$(this).data('modal-param'));
            if($(this).data('modal-callback')){
                param.callBack = eval($(this).data('modal-callback'));
            }
            UI.modal(param);
        });
    },
    tooltip : function(param){
        param = param ? param : {};
        $(this).off('click');
        $(this).click(function(){
            if(!$(this).data('init')){$(this).trigger('init');}
            param.tooltip = $(this).data('tooltip');
            param.excute = this;
            UI.tooltip(param);
        }).on('init',function(){
            $(this).data('init',true);
            var btn = this;
            var $tooltip = $(btn).parent('.ico-tooltip-wrap').find($(this).data('tooltip'));

            $tooltip.find('.tooltip-close').click(function(){
                $(this).parents('.tooltip-ly').hide();
            });
            $('*').on('click',function(e) {
                //console.log('x');
                //var $tooltip = $(btn).parent('.ico-tooltip-wrap').find($(this).data('tooltip'));
                if($tooltip.css("display") == "block" && e.target != btn) {
                    if(!$tooltip.has(e.target).length) {
                        $tooltip.hide();
                    }
                }
            });
        });
    },
    fireFoxKeyUp : function(){
        var interval;
        var val;
        if(UI.getBrowser().firefox){
            $(this).focus(function(){
                var $this = $(this);
                interval = setInterval(function(){
                    var regKorean =  /[媛?-?ｃ?-???-??]/
                    //console.log('fireFoxKeyUp:' + regKorean.test($this.val()));
                    //console.log('fireFoxKeyUp:' + $this.data('val') + '|' + $this.val());
                    if(val != $this.val() && regKorean.test($this.val())){
                        //console.log('fireFoxKeyUp ???');
                        //?몃━嫄?
                        $this.trigger('keyup');
                        val = $this.val();
                        //$this.data('val',$this.val());
                    }
                },100);
            }).blur(function(){
                clearInterval(interval);
            });

        }
    },
    copyToClipboard : function(url){
        $(this).click(function(){
            UI.copyToClipboard(url);
        });
    }
});

//UI 怨듯? ?ㅽ?由쏀?
var UI = {
    init : function(){
        this.selectBoxInit();
        this.tab();
        this.numberFormAll();
        this.telFormAll();
        this.telWifiFormAll();
        this.cardFormAll();
        this.corpFormAll();
        this.compFormAll();
        this.foreignerFormAll();
        this.residentFormAll();
        this.accountFormAll();
        this.noKoreanFormAll();
        this.minusFormAll();
        this.plusFormAll();
        this.modalAll();
        this.tooltipAll();
        //$('input[type=text][maxlength],input[type=password][maxlength],textarea[maxlength]').maxLength();
        $('textarea[maxlength]').maxLength();
        $('textarea[maxlength]').textCount();
        $('input, textarea').placeholder({customClass:'my-placeholder'});
        $('input').fireFoxKeyUp();
        $('.url-copy button').click(function(){UI.copyToClipboard($(this).parents('.url-copy').find('input').val());});
        this.sticky();
        this.global();
        this.fileFormAll();
        this.gnb.init();
        this.focusScroll();
    },
    fileFormAll : function(){
        //???泥⑤?
        $('input[type=file]').on('change',function(){
            $(this).parent('.form-group').find('input[type=text]').val($(this).val().replace('C:\\fakepath\\',''));
        });
    },
    getBrowser : function(){
        var agent = navigator.userAgent.toLowerCase();
        //console.log(agent);
        Browser = {
            ie : /*@cc_on true || @*/ false,
            ie6 : agent.indexOf('msie 6') != -1,
            ie7 : agent.indexOf('msie 7') != -1,
            ie8 : agent.indexOf('msie 8') != -1,
            ie9 : agent.indexOf('msie 9') != -1,
            ie10 : agent.indexOf('msie 10') != -1,
            ie11 : agent.indexOf('rv:11.0') != -1,
            opera : !!window.opera,
            safari : agent.indexOf('safari') != -1,
            safari3 : agent.indexOf('applewebkit/5') != -1,
            mac : agent.indexOf('mac') != -1,
            chrome : agent.indexOf('chrome') != -1,
            firefox : agent.indexOf('firefox') != -1,
            name : 'unkown'
        }

        if (Browser.chrome) {
            //console.log("It is chrome browser");
            Browser.name = 'chrome';
        } else if (Browser.ie6) {
            //console.log("It is ie6 browser");
            Browser.name = 'ie6';
        } else if (Browser.ie7) {
            //console.log("It is ie7 browser");
            Browser.name = 'ie7';
        } else if (Browser.ie8) {
            //console.log("It is ie8 browser");
            Browser.name = 'ie8';
        } else if (Browser.ie9) {
            //console.log("It is ie9 browser");
            Browser.name = 'ie9';
        } else if (Browser.ie10) {
            //console.log("It is ie10 browser");
            Browser.name = 'ie10';
        } else if (Browser.ie11) {
            //console.log("It is ie11 browser");
            Browser.name = 'ie11';
        } else if (Browser.opera) {
            //console.log("It is opera browser");
            Browser.name = 'opera';
        } else if (Browser.safari) {
            //console.log("It is safari browser");
            Browser.name = 'safari';
        } else if (Browser.safari3) {
            //console.log("It is safari3 browser");
            Browser.name = 'safari3';
        } else if (Browser.mac) {
            //console.log("It is mac browser");
            Browser.name = 'mac';
        } else if (Browser.firefox) {
            //console.log("It is firefox browser");
            Browser.name = 'firefox';
        } else {
            //console.log("It is maybe ie");
            Browser.name = 'ie';
            Browser.ie = true;
        }
        //console.log(Browser);
        return Browser;
    },
    tab : function(){
        var tabGroup = [];
        $('[data-tab]').each(function(key,value){
            if($.inArray($(this).data('tab'), tabGroup) == -1){
                tabGroup.push($(this).data('tab'));
            }
        });

        $.each(tabGroup,function(key,value){
            var $tab = $('[data-tab=' + value + ']');
            var $content = $('[data-tab-content=' + value + ']');
            var onIndex = $tab.index($tab.filter('.on'));
            $content.hide();
            $content.eq(onIndex).show();
            $tab.click(function(){
                var index = $(this).index();
                $tab.removeClass('on');
                $tab.eq(index).addClass('on');
                $content.hide();
                $content.eq(index).show();

                var txt = $(this).find("a").text();
                console.log(txt);
                var $tgArea = $(this).parents('.tab-sub-wrap').find('.g-invisible');
                $tgArea.text(txt);
            });
        });
        this.tabBookMark();
    },
    tabBookMark : function(){
        var hash = location.hash;
        var tabGroup = [];
        $('[data-tab]').each(function(key,value){
            if($.inArray($(this).data('tab'), tabGroup) == -1){
                tabGroup.push($(this).data('tab'));
            }
        });

        $.each(tabGroup,function(key,value){
            var $tab = $('[data-tab=' + value + ']');
            var $content = $('[data-tab-content=' + value + ']');
            var onIndex = $tab.index($tab.filter('.on'));
            var contentIndex = $content.index($content.find(hash).parents('[data-tab-content=' + value + ']'));
            var index = contentIndex > -1 ? contentIndex : onIndex;
            $tab.eq(index).trigger('click');
        });
    },
    popup : function(url,param,name){
        //湲곕낯 md
        param = $.extend({}, param);
        var defaultOptions = {
            width: '700',
            height: '600',
            scrollbars:'yes',
            resizable:'no',
            toolbar: 'no'
        }
        //var tmp = param == undefined ? defaultOptions : param;
        var mode = param.mode;
        delete param.mode;
        if(mode=='sm'){
            defaultOptions.width = 480;
            defaultOptions.height = 436;
        }
        var tmp = $.extend({}, defaultOptions, param);
        var options = '';
        var i = 0;
        $.each(tmp,function(key,value){
            comma = i > 0 ? ',': '';
            //console.log(key);
            //console.log(value);
            options += comma + key + '=' + value
            i++;
        });
        if(name=='_blank'){options = '';}
        return window.open(url, name, options);
    },
    selectBoxInit : function(){
        //湲곕낯 寃???린?? ???
        $.fn.select2.defaults.set("minimumResultsForSearch", "Infinity");

        //data-placeholder 鍮???? 異?? 諛? selected ???
        $('.c-select-outline select[data-placeholder], .c-select select[data-placeholder]').each(function(){
            var selected = false;
            $(this).find('option').each(function(){
                if($(this).attr('selected')=="selected"){
                    //console.log($(this).val());
                    selected = true;
                }
            });
            if(selected){
                $(this).val($(this).find('option:selected').val());
            }else{
                $(this).val('');
            }
        });

        //select2 ?ㅽ?
        //$('.c-select-outline select, .c-select select').select2();
        $('.c-select-outline select, .c-select select').each(function(){
            var option = {};
            //data-select-class ???
            if($(this).data('select-class')=='sm'){
                option.containerCssClass = 'c-select-outline-sm';
                option.dropdownCssClass = 'c-select-outline-sm-dr';
            }else if($(this).data('select-class')=='lg'){
                option.containerCssClass = 'c-select-outline-lg';
                option.dropdownCssClass = 'c-select-outline-lg-dr';
            }
            $(this).select2(option);
        });
        $('.c-select-outline select[data-select-link], .c-select select[data-select-link]').each(function(){
            $(this).on('change',function(){
                //console.log($(this).find(':selected').val());
                var url = $(this).find(':selected').val();
                UI.popup(url,'',$(this).data('select-link'));
            })
        });
    },
    preventDefault : function(e){
        if(e.preventDefault){
            return e.preventDefault();
        }else{
            return e.returnValue = false;
        }
    },
    isWhiteKeyCode : function(event, mode){
        var keyCode = [];
        var str = '';
        //?쇰?怨??媛??濡?
        mode = mode == undefined ? 'include' : mode;
        if(mode == 'include'){
            keyCode = [
                37,39 //諛⑺??? 醫??
                ,8 //諛깆??????
                ,9 //TAB
                ,46 //DEL
                ,35 //??
                ,36 //???
                ,13 //???
                ,116 //F5
                ,123 //F12
                ,16 //?ы???
            ];
        }

        $.each(keyCode, function(key,value){
            //console.log(value);
            str += key > 0 ? ' || ' : '';
            str += 'event.keyCode == ' + value;
        });
        if(eval(str)){
            return true;
        }else{
            return false;
        }
        //return (event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode== 46 || event.keyCode == 35 || event.keyCode == 36 || event.keyCode == 13);
    },
    _whiteCombinationKey : {ok:false},
    isWhiteCombinationKeyDown : function(event){
        //ctrl(17)
        if(event.keyCode==17){
            this._whiteCombinationKey.ctrl = true;
        }
        //shift(16)
        if(event.keyCode==16){
            this._whiteCombinationKey.shift = true;
        }

        //ctrl(17)-v(86), a(65), c(67), x(88)
        if( this._whiteCombinationKey.ctrl && (event.keyCode==86 || event.keyCode==65 || event.keyCode==67 || event.keyCode==88) ){
            this._whiteCombinationKey.ok = true;
        }

        //shift(16)-tab(9)
        if( this._whiteCombinationKey.shift && (event.keyCode==9) ){
            this._whiteCombinationKey.ok = true;
        }
        return this._whiteCombinationKey.ok;
    },
    setWhiteCombinationKeyUp : function(event){
        //ctrl(17)
        if(event.keyCode==17){
            this._whiteCombinationKey.ctrl = false;
        }
        //shift(16)
        if(event.keyCode==16){
            this._whiteCombinationKey.shift = false;
        }
        this._whiteCombinationKey.ok = false;
    },
    setNumberOnlyKeyDown : function(event){
        if( (!(event.keyCode >= 48 && event.keyCode <= 57 && !UI._whiteCombinationKey.shift) && !(event.keyCode >= 96 && event.keyCode <= 105 && !UI._whiteCombinationKey.shift))
            && !UI.isWhiteKeyCode(event) && !UI.isWhiteCombinationKeyDown(event)) {
            //ie8 踰???깆??? event.preventDefault 吏??? ???.
            return UI.preventDefault(event);
        }
    },
    setNumberOnlyKeyUp : function(event,_this){
        UI.setWhiteCombinationKeyUp(event);
        //????ㅼ? ?ъ빱?? ???
        if( !UI.isWhiteKeyCode(event) ){
            if($(_this).val() != $(_this).val().replace(/[^0-9]/g,"")){
                $(_this).val($(_this).val().replace(/[^0-9]/g,""));
            }
        }
    },
    setNumberOnlyPaste : function(_this){
        setTimeout( function() {
            if($(_this).val() != $(_this).val().replace(/[^0-9]/g,"")){
                $(_this).val($(_this).val().replace(/[^0-9]/g,""));
            }
        }, 100);
    },
    numberFormAll : function(){
        $('input[type=text][data-mode=number], input[type=password][data-mode=number]').keydown(function(event) {
            UI.setNumberOnlyKeyDown(event);
        }).keyup(function(event){
            UI.setNumberOnlyKeyUp(event,this);
        }).blur(function(){
            $(this).val($(this).val().replace(/[^0-9]/g,""));
        }).on('paste',function(){
            UI.setNumberOnlyPaste(this);
        });
    },
    telFormAll : function(){
        $('input[type=text][data-mode=tel]').keydown(function(event) {
            UI.setNumberOnlyKeyDown(event);
        }).keyup(function(event){
            UI.setNumberOnlyKeyUp(event,this);
            var endIdx = UI.getCursorPosition($(this)[0]);
            if ($(this)[0].selectionEnd || $(this)[0].selectionEnd === 0) {
                $(this)[0].selectionEnd = endIdx;
            }
            //???踰????? 蹂???
        }).blur(function(){
            if( $(this).val() != null && $(this).val() != '' ) {
                $(this).val( $(this).val().replace(/[^0-9]/g, '') );
            }
            $(this).val( $(this).val().replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3") );
        }).focus(function(){
            if( $(this).val() != null && $(this).val() != '' ) {
                $(this).val( $(this).val().replace(/[^0-9]/g, '') );
            }
        }).on('paste',function(){
            var _this = this;
            setTimeout( function() {
                var endIdx = UI.getCursorPosition($(_this)[0]);

                //var val = $(_this).val();
                $(_this).val($(_this).val().replace(/[^0-9]/g,""));

                if ($(_this)[0].selectionEnd || $(_this)[0].selectionEnd === 0) {
                    $(_this)[0].selectionEnd = endIdx;
                }
            }, 100);
        });
    },
    telWifiFormAll : function(){
        $('input[type=text][data-mode=wifi]').keydown(function(event) {
            UI.setNumberOnlyKeyDown(event);
        }).keyup(function(event){
            UI.setNumberOnlyKeyUp(event,this);
            var endIdx = UI.getCursorPosition($(this)[0]);
            if ($(this)[0].selectionEnd || $(this)[0].selectionEnd === 0) {
                $(this)[0].selectionEnd = endIdx;
            }
            //???踰????? 蹂???
        }).blur(function(){
            if( $(this).val() != null && $(this).val() != '' ) {
                $(this).val( $(this).val().replace(/[^0-9]/g, '') );
            }
            $(this).val( $(this).val().replace(/([0-9]+)([0-9]{4})/,"$1-$2") );
        }).focus(function(){
            if( $(this).val() != null && $(this).val() != '' ) {
                $(this).val( $(this).val().replace(/[^0-9]/g, '') );
            }
        }).on('paste',function(){
            var _this = this;
            setTimeout( function() {
                var endIdx = UI.getCursorPosition($(_this)[0]);

                //var val = $(_this).val();
                $(_this).val($(_this).val().replace(/[^0-9]/g,""));

                if ($(_this)[0].selectionEnd || $(_this)[0].selectionEnd === 0) {
                    $(_this)[0].selectionEnd = endIdx;
                }
            }, 100);
        });
    },
    // 移대?踰??
    cardFormAll : function(){
        $('input[data-mode=card]').keydown(function(event) {
            UI.setNumberOnlyKeyDown(event);
            selection = UI.getCursorPositions($(this)[0]);
        }).keyup(function(event){
            var endIdx = UI.getCursorPosition($(this)[0]);
            UI.setWhiteCombinationKeyUp(event);
            if(!UI.isWhiteKeyCode(event)){
                var val = $(this).val();
                $(this).val(val.replace(/[^*0-9]/g,""));
            }

            if( ((event.keyCode >= 48 && event.keyCode <= 57 && !UI._whiteCombinationKey.shift) || (event.keyCode >= 96 && event.keyCode <= 105 && !UI._whiteCombinationKey.shift))
                || event.keyCode == 46 || event.keyCode == 8) { //del,backspace
                var val = $(this).val();
                var dataVal = $(this).data('val') ? $(this).data('val') : '' ;
                var mergeVal = '';
                var newVal;
                if(val.length > dataVal.length){//???
                    newVal = $(this).val().substring(startIdx,endIdx).replace(/([^0-9])/g, '');
                    mergeVal = dataVal.substring(0,startIdx) + newVal + dataVal.substring(startIdx);
                }else if(val.length < dataVal.length){//???
                    if(startIdx==endIdx){//del
                        if(selection.start != selection.end){
                            newVal = $(this).val().substring(startIdx,endIdx).replace(/([^0-9])/g, '');
                            mergeVal = dataVal.substring(0,selection.start) + newVal + dataVal.substring(selection.end);
                        }else{
                            mergeVal = dataVal.substring(0,startIdx) + dataVal.substring(startIdx + dataVal.length - val.length);
                        }
                    }else if(startIdx < endIdx){//???洹? ???
                        newVal = $(this).val().substring(startIdx,endIdx).replace(/([^0-9])/g, '');
                        mergeVal = dataVal.substring(0,startIdx) + newVal +  dataVal.substring(endIdx + dataVal.length - val.length);
                    }else if(startIdx > endIdx){//諛깆?????? / ???洹? ???
                        //ie8 crossbrowsing
                        if(UI.getBrowser().ie8){
                            if(selection.start != selection.end && !UI.isWhiteKeyCode(event)){ //???洹?
                                newVal = $(this).val().substr(selection.start,1).replace(/([^0-9])/g, '');
                                mergeVal = dataVal.substring(0,selection.start) + newVal +  dataVal.substring(selection.end);
                            }else{
                                mergeVal = dataVal.substring(0, endIdx)+dataVal.substring(startIdx);
                            }

                        }else{
                            mergeVal = dataVal.substring(0, endIdx)+dataVal.substring(startIdx);
                        }
                    }

                }else{ //val.length == dataVal.length
                    //mergeVal = dataVal;
                    if(startIdx==endIdx){
                        //ie8 crossbrowsing
                        if(selection.start != selection.end){
                            newVal = $(this).val().substring(selection.start,selection.end).replace(/([^0-9])/g, '');
                            mergeVal = dataVal.substring(0, selection.start) + newVal + dataVal.substring(selection.end);
                        }else{
                            mergeVal = dataVal;
                        }
                    }else{
                        if(event.keyCode == 16){//?ы???
                            mergeVal = dataVal;
                        }else{
                            newVal = $(this).val().substring(selection.start,selection.end).replace(/([^0-9])/g, '');
                            mergeVal = dataVal.substring(0, selection.start) + newVal + dataVal.substring(selection.end);
                        }
                    }
                }
                $(this).data('val',mergeVal);
                if($("#"+this.id+"Num").length > 0){
                    $("#"+this.id+"Num").val(mergeVal);
                }

                var newDataVal1 = mergeVal.substring(0, 4);
                var newDataVal2 = mergeVal.substring(4,12);
                var newDataVal3 = mergeVal.substring(12);
                var maskStr = '';
                for(var i = 0; i < newDataVal2.length; i++){
                    maskStr += '*';
                }

                if(!(event.keyCode==37 || event.keyCode==39 || event.keyCode==16)){
                    $(this).val(newDataVal1+maskStr+newDataVal3);
                    UI.setCursorPosition($(this)[0],newVal != '' ? endIdx : startIdx);
                }
            }
            startIdx = UI.getCursorPosition($(this)[0]);
        }).focus(function(){
            var _this = this;
            setTimeout(function(){
                startIdx = UI.getCursorPosition($(_this)[0]);
                $(_this).val( $(_this).val().replace(/([^*0-9])/g, ''));
                if($("#"+_this.id+"Num").length > 0){
                    $('#' + _this.id + 'Num').val( $('#' + _this.id + 'Num').val().replace(/([^*0-9])/g, '') );
                }
            },1);
        }).blur(function(){
            $(this).val( $(this).val().replace(/([^*0-9])/g, '').replace(/([0-9]{4})([*]{4})([*]{4})([0-9]+)/,"$1-$2-$3-$4") );
            if($("#"+this.id+"Num").length > 0){
                $("#"+this.id+"Num").val( $("#"+this.id+"Num").val().replace(/([0-9]{4})([0-9]{4})([0-9]{4})([0-9]+)/,"$1-$2-$3-$4") );
            }
        }).on('paste cut',function(event){
            event.preventDefault();
        });
    },
    //踰???깅?踰??
    corpFormAll : function(){
        $('input[type=text][data-mode=corp]').keydown(function(event) {
            UI.setNumberOnlyKeyDown(event);
        }).keyup(function(event){
            UI.setNumberOnlyKeyUp(event,this);
            var endIdx = UI.getCursorPosition($(this)[0]);

            if ($(this)[0].selectionEnd || $(this)[0].selectionEnd === 0) {
                $(this)[0].selectionEnd = endIdx;
            }
            // 踰???깅?踰????? 蹂???
        }).blur(function(){
            if( $(this).val() != null && $(this).val() != '' ) {
                $(this).val( $(this).val().replace(/([^0-9])/g, '') );
            }
            $(this).val( $(this).val().replace(/([0-9]{6})([0-9]+)/,"$1-$2") );
        }).focus(function(){
            if( $(this).val() != null && $(this).val() != '' ) {
                $(this).val( $(this).val().replace(/([^0-9])/g, '') );
            }
        }).on('paste',function(){
            var _this = this;
            setTimeout( function() {
                var endIdx = UI.getCursorPosition($(_this)[0]);

                //var val = $(_this).val();
                $(_this).val($(_this).val().replace(/[^0-9]/g,""));

                if ($(_this)[0].selectionEnd || $(_this)[0].selectionEnd === 0) {
                    $(_this)[0].selectionEnd = endIdx;
                }
            }, 100);
        });
    },
    //?ъ????濡????
    compFormAll : function(){
        $('input[type=text][data-mode=comp]').keydown(function(event) {
            UI.setNumberOnlyKeyDown(event);
        }).keyup(function(event){
            UI.setNumberOnlyKeyUp(event,this);
            var endIdx = UI.getCursorPosition($(this)[0]);

            if ($(this)[0].selectionEnd || $(this)[0].selectionEnd === 0) {
                $(this)[0].selectionEnd = endIdx;
            }
            // ?ъ????濡???명??? 蹂???
        }).blur(function(){
            if( $(this).val() != null && $(this).val() != '' ) {
                $(this).val( $(this).val().replace(/([^0-9])/g, '') );
            }
            $(this).val( $(this).val().replace(/([0-9]{3})([0-9]{2})([0-9]+)/,"$1-$2-$3") );
        }).focus(function(){
            if( $(this).val() != null && $(this).val() != '' ) {
                $(this).val( $(this).val().replace(/([^0-9])/g, '') );
            }
        }).on('paste',function(){
            var _this = this;
            setTimeout( function() {
                var endIdx = UI.getCursorPosition($(_this)[0]);

                //var val = $(_this).val();
                $(_this).val($(_this).val().replace(/[^0-9]/g,""));

                if ($(_this)[0].selectionEnd || $(_this)[0].selectionEnd === 0) {
                    $(_this)[0].selectionEnd = endIdx;
                }
            }, 100);
        });
    },
    //?멸뎅?몃?濡????
    foreignerFormAll : function(){
        $('input[type=text][data-mode=foreigner]').keydown(function(event) {
            UI.setNumberOnlyKeyDown(event);
        }).keyup(function(event){
            UI.setNumberOnlyKeyUp(event,this);
            var endIdx = UI.getCursorPosition($(this)[0]);

            if ($(this)[0].selectionEnd || $(this)[0].selectionEnd === 0) {
                $(this)[0].selectionEnd = endIdx;
            }
            // ?멸뎅?몃?濡???명??? 蹂???
        }).blur(function(){
            if( $(this).val() != null && $(this).val() != '' ) {
                $(this).val( $(this).val().replace(/([^0-9])/g, '') );
            }
            $(this).val( $(this).val().replace(/([0-9]{6})([0-9]+)/,"$1-$2") );
        }).focus(function(){
            if( $(this).val() != null && $(this).val() != '' ) {
                $(this).val( $(this).val().replace(/([^0-9])/g, '') );
            }
        }).on('paste',function(){
            var _this = this;
            setTimeout( function() {
                var endIdx = UI.getCursorPosition($(_this)[0]);

                //var val = $(_this).val();
                $(_this).val($(_this).val().replace(/[^0-9]/g,""));

                if ($(_this)[0].selectionEnd || $(_this)[0].selectionEnd === 0) {
                    $(_this)[0].selectionEnd = endIdx;
                }
            }, 100);
        });
    },
    //二쇰??깅?踰??
    residentFormAll : function(){
        $('input[data-mode=resident]').keydown(function(event) {
            UI.setNumberOnlyKeyDown(event);
            selection = UI.getCursorPositions($(this)[0]);
        }).keyup(function(event){
            var endIdx = UI.getCursorPosition($(this)[0]);
            UI.setWhiteCombinationKeyUp(event);
            if(!UI.isWhiteKeyCode(event)){
                var val = $(this).val();
                $(this).val(val.replace(/[^*0-9]/g,""));
            }

            if( ((event.keyCode >= 48 && event.keyCode <= 57 && !UI._whiteCombinationKey.shift) || (event.keyCode >= 96 && event.keyCode <= 105 && !UI._whiteCombinationKey.shift))
                || event.keyCode == 46 || event.keyCode == 8) { //del,backspace
                var val = $(this).val();
                var dataVal = $(this).data('val') ? $(this).data('val') : '' ;
                var mergeVal = '';
                var newVal;
                if(val.length > dataVal.length){//???
                    newVal = $(this).val().substring(startIdx,endIdx).replace(/([^0-9])/g, '');
                    mergeVal = dataVal.substring(0,startIdx) + newVal + dataVal.substring(startIdx);
                }else if(val.length < dataVal.length){//???
                    if(startIdx==endIdx){//del
                        if(selection.start != selection.end){
                            newVal = $(this).val().substring(startIdx,endIdx).replace(/([^0-9])/g, '');
                            mergeVal = dataVal.substring(0,selection.start) + newVal + dataVal.substring(selection.end);
                        }else{
                            mergeVal = dataVal.substring(0,startIdx) + dataVal.substring(startIdx + dataVal.length - val.length);
                        }
                    }else if(startIdx < endIdx){//???洹? ???
                        newVal = $(this).val().substring(startIdx,endIdx).replace(/([^0-9])/g, '');
                        mergeVal = dataVal.substring(0,startIdx) + newVal +  dataVal.substring(endIdx + dataVal.length - val.length);
                    }else if(startIdx > endIdx){//諛깆?????? / ???洹? ???
                        //ie8 crossbrowsing
                        if(UI.getBrowser().ie8){
                            if(selection.start != selection.end && !UI.isWhiteKeyCode(event)){ //???洹?
                                newVal = $(this).val().substr(selection.start,1).replace(/([^0-9])/g, '');
                                mergeVal = dataVal.substring(0,selection.start) + newVal +  dataVal.substring(selection.end);
                            }else{
                                mergeVal = dataVal.substring(0, endIdx)+dataVal.substring(startIdx);
                            }

                        }else{
                            mergeVal = dataVal.substring(0, endIdx)+dataVal.substring(startIdx);
                        }
                    }

                }else{ //val.length == dataVal.length
                    //mergeVal = dataVal;
                    if(startIdx==endIdx){
                        //ie8 crossbrowsing
                        if(selection.start != selection.end){
                            newVal = $(this).val().substring(selection.start,selection.end).replace(/([^0-9])/g, '');
                            mergeVal = dataVal.substring(0, selection.start) + newVal + dataVal.substring(selection.end);
                        }else{
                            mergeVal = dataVal;
                        }
                    }else{
                        if(event.keyCode == 16){//?ы???
                            mergeVal = dataVal;
                        }else{
                            newVal = $(this).val().substring(selection.start,selection.end).replace(/([^0-9])/g, '');
                            mergeVal = dataVal.substring(0, selection.start) + newVal + dataVal.substring(selection.end);
                        }
                    }
                }
                $(this).data('val',mergeVal);
                if($("#"+this.id+"Num").length > 0){
                    $("#"+this.id+"Num").val(mergeVal);
                }

                var newDataVal1 = mergeVal.substring(0, 7);
                var newDataVal2 = mergeVal.substring(7);
                var maskStr = '';
                for(var i = 0; i < newDataVal2.length; i++){
                    maskStr += '*';
                }

                if(!(event.keyCode==37 || event.keyCode==39 || event.keyCode==16)){
                    $(this).val(newDataVal1+maskStr);
                    UI.setCursorPosition($(this)[0],newVal != '' ? endIdx : startIdx);
                }
            }
            startIdx = UI.getCursorPosition($(this)[0]);
        }).focus(function(){
            var _this = this;
            setTimeout(function(){
                startIdx = UI.getCursorPosition($(_this)[0]);
                $(_this).val( $(_this).val().replace(/([^*0-9])/g, ''));
                if($("#"+_this.id+"Num").length > 0){
                    $('#' + _this.id + 'Num').val( $('#' + _this.id + 'Num').val().replace(/([^*0-9])/g, '') );
                }
            },1);
        }).blur(function(){
            $(this).val( $(this).val().replace(/([^*0-9])/g, '').replace(/([0-9]{6})([0-9]{1}[*]{6})/g,"$1-$2") );
            if($("#"+this.id+"Num").length > 0){
                $('#' + this.id + 'Num').val( $('#' + this.id + 'Num').val().replace(/([0-9]{6})([0-9]{7})/g,"$1-$2") );
            }
        }).on('paste cut',function(event){
            event.preventDefault();
        });
    },
    startIdx : 0,	// ?ъ빱?? ?????
    //怨??踰??
    accountFormAll : function(){
        $('input[data-mode=account]').keydown(function(event) {
            UI.setNumberOnlyKeyDown(event);
            selection = UI.getCursorPositions($(this)[0]);
            //console.log(UI.getCursorPositions($(this)[0]).start + '||' + UI.getCursorPositions($(this)[0]).end);
        }).keyup(function(event){
            //endIdx = event.target.selectionEnd;
            var endIdx = UI.getCursorPosition($(this)[0]);
            //console.log(selection.start + '||' + selection.end);
            UI.setWhiteCombinationKeyUp(event);
            if(!UI.isWhiteKeyCode(event)){
                var val = $(this).val();
                //$(this).val(val.replace(/[^??0-9]/g,""));
                $(this).val(val.replace(/[^*0-9]/g,""));
            }
            //console.log(startIdx+'|'+endIdx);
            //if(!(event.keyCode == 35 || event.keyCode == 36 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode== 16)){ //home, end, left, right, shift
            if( ((event.keyCode >= 48 && event.keyCode <= 57 && !UI._whiteCombinationKey.shift) || (event.keyCode >= 96 && event.keyCode <= 105 && !UI._whiteCombinationKey.shift))
                || event.keyCode == 46 || event.keyCode == 8) { //del,backspace
                var val = $(this).val();
                var dataVal = $(this).data('val') ? $(this).data('val') : '' ;
                var mergeVal = '';
                var newVal;
                if(val.length > dataVal.length){//???
                    newVal = $(this).val().substring(startIdx,endIdx).replace(/([^0-9])/g, '');
                    mergeVal = dataVal.substring(0,startIdx) + newVal + dataVal.substring(startIdx);
                }else if(val.length < dataVal.length){//???
                    if(startIdx==endIdx){//del
                        if(selection.start != selection.end){
                            newVal = $(this).val().substring(startIdx,endIdx).replace(/([^0-9])/g, '');
                            mergeVal = dataVal.substring(0,selection.start) + newVal + dataVal.substring(selection.end);
                        }else{
                            mergeVal = dataVal.substring(0,startIdx) + dataVal.substring(startIdx + dataVal.length - val.length);
                        }
                    }else if(startIdx < endIdx){//???洹? ???
                        newVal = $(this).val().substring(startIdx,endIdx).replace(/([^0-9])/g, '');
                        mergeVal = dataVal.substring(0,startIdx) + newVal +  dataVal.substring(endIdx + dataVal.length - val.length);
                    }else if(startIdx > endIdx){//諛깆?????? / ???洹? ???
                        //ie8 crossbrowsing
                        if(UI.getBrowser().ie8){
                            if(selection.start != selection.end && !UI.isWhiteKeyCode(event)){ //???洹?
                                newVal = $(this).val().substr(selection.start,1).replace(/([^0-9])/g, '');
                                mergeVal = dataVal.substring(0,selection.start) + newVal +  dataVal.substring(selection.end);
                            }else{
                                mergeVal = dataVal.substring(0, endIdx)+dataVal.substring(startIdx);
                            }

                        }else{
                            mergeVal = dataVal.substring(0, endIdx)+dataVal.substring(startIdx);
                        }
                    }

                }else{ //val.length == dataVal.length
                    //mergeVal = dataVal;
                    if(startIdx==endIdx){
                        //ie8 crossbrowsing
                        if(selection.start != selection.end){
                            newVal = $(this).val().substring(selection.start,selection.end).replace(/([^0-9])/g, '');
                            mergeVal = dataVal.substring(0, selection.start) + newVal + dataVal.substring(selection.end);
                        }else{
                            mergeVal = dataVal;
                        }
                    }else{
                        if(event.keyCode == 16){//?ы???
                            mergeVal = dataVal;
                        }else{
                            newVal = $(this).val().substring(selection.start,selection.end).replace(/([^0-9])/g, '');
                            mergeVal = dataVal.substring(0, selection.start) + newVal + dataVal.substring(selection.end);
                        }
                    }
                }

                $(this).data('val',mergeVal);
                if($("#"+this.id+"Num").length > 0){
                    $("#"+this.id+"Num").val(mergeVal);
                }

                var newDataVal1 = mergeVal.substring(0, 8);
                var newDataVal2 = mergeVal.substring(8);
                var newDataVal3 = newDataVal2.substr(0,newDataVal2.length< 3 ? 0 : newDataVal2.length-3);

                var maskStr = '';

                for(var i = 0; i < newDataVal2.length - newDataVal3.length; i++){
                    maskStr += '*';
                }

                //if(!UI.isWhiteKeyCode(event) ){
                if(!(event.keyCode==37 || event.keyCode==39 || event.keyCode==16)){
                    $(this).val(newDataVal1 + newDataVal3 + maskStr);
                    UI.setCursorPosition($(this)[0],newVal != '' ? endIdx : startIdx);
                }
            }

            startIdx = UI.getCursorPosition($(this)[0]);
        }).blur(function(){
            $(this).val( $(this).val().replace(/([^*0-9])/g, ''));
            if($("#"+this.id+"Num").length > 0){
                $("#"+this.id+"Num").val( $("#"+this.id+"Num").val().replace(/([^0-9]+)/,"$1") );
            }
        }).focus(function(){
            var _this = this;
            setTimeout(function(){
                startIdx = UI.getCursorPosition($(_this)[0]);
            },1);
        }).on('paste cut',function(event){
            event.preventDefault();
        });
    },
    // ??? 湲??
    noKoreanFormAll : function(){
        $('input[type=text][data-mode=noKorean]').keydown(function(event) {
            if( ((!(event.keyCode >= 48 && event.keyCode <= 57 && !UI._whiteCombinationKey.shift) && !(event.keyCode >= 96 && event.keyCode <= 105 && !UI._whiteCombinationKey.shift))
                && !(event.keyCode >=65 && event.keyCode <= 90)
                && !UI.isWhiteKeyCode(event) && !UI.isWhiteCombinationKeyDown(event)) || event.keyCode == 229 ) {
                //ie8 踰???깆??? event.preventDefault 吏??? ???.
                return UI.preventDefault(event);
            }
        }).keyup(function(event){
            var _this = this;
            UI.setWhiteCombinationKeyUp(event);
            //????ㅼ? ?ъ빱?? ???
            if( !UI.isWhiteKeyCode(event) ){
                if($(_this).val() != $(_this).val().replace(/[^a-zA-Z0-9]/g,"")){
                    $(_this).val($(_this).val().replace(/[^a-zA-Z0-9]/g,""));
                }
            }
        }).on('paste',function(){
            var _this = this;
            setTimeout( function() {
                var val = $(_this).val();
                $(_this).val( val.replace(/[^a-zA-Z0-9]/g, '') );
            }, 100);
        });
    },
    accountValidityCheckBtnChange : function(flag, id){
        if(flag){
            $('#'+id).removeClass('disabled');
        }else{
            $('#'+id).addClass('disabled');
        }
    }
    , showObj : function(obj) {
        var str = "";
        for(key in obj) {
            str += key+"="+obj[key]+"\n";
        }
        //console.log(str);
    },
    objectDebug : function (obj,depth){
        var str = "depth: " + depth + " ";
        var index = 0;
        jQuery.each(obj , function(key,value) {
            if(index==0){for (var i = 0; i < depth * 4; i++) { str = str + ' ';}}
            if(typeof(value)=="object"){
                //console.log(str + 'type: [' + typeof obj[key] + '], key: [' + key + '] ---->');
                if(key=='target'){
                    UI.object(obj[key],depth+1);
                }
                //UI.object(obj[key],depth+1);
                return true;
            }
            index++;
            //console.log(str + 'type: [' + typeof obj[key] + '], key: [' + key + '], value: [' + obj[key] + ']');
        });
    },
    getCursorPosition : function ($element) {
        var position = 0,
            selection;

        if (document.selection) {
            // IE Support
            $element.focus();
            selection = document.selection.createRange();
            selection.moveStart ('character', -$element.value.length);
            position = selection.text.length;
            /*$element.focus();

            var r = document.selection.createRange();
            if (r == null) {
              return 0;
            }

            var re = $element.createTextRange(),
                rc = re.duplicate();
            re.moveToBookmark(r.getBookmark());
            rc.setEndPoint('EndToStart', re);

            position = rc.text.length; */

        } else if ($element.selectionStart || $element.selectionStart === 0) {
            position = $element.selectionStart;
        }

        return position;
    },
    setCursorPosition : function($element, position){
        var selection;

        if (document.selection) {
            // IE Support
            $element.focus ();
            selection = document.selection.createRange();
            selection.moveStart ('character', -$element.value.length);
            selection.moveStart ('character', position);
            selection.moveEnd ('character', 0);
            selection.collapse();
            selection.select ();
            /*var inputRange = $element.createTextRange ();
            inputRange.moveStart ("character", position);
            inputRange.collapse ();
            inputRange.moveEnd ("character", position);
            inputRange.select ();*/
        } else if ($element.selectionStart || $element.selectionStart === 0) {
            $element.selectionStart = position;
            $element.selectionEnd = position;
            $element.focus ();
        }
    },
    getX : function(inputBox){
        if ("selectionStart" in inputBox) {
            return {
                start: inputBox.selectionStart,
                end: inputBox.selectionEnd
            }
        }

        //and now, the blinkered IE way
        var bookmark = document.selection.createRange().getBookmark()
        var selection = inputBox.createTextRange()
        selection.moveToBookmark(bookmark)

        var before = inputBox.createTextRange()
        before.collapse(true)
        before.setEndPoint("EndToStart", selection)

        var beforeLength = before.text.length
        var selLength = selection.text.length

        return {
            start: beforeLength,
            end: beforeLength + selLength
        }
    },
    getCursorPositions : function(ctrl){
        // IE < 9 Support
        if (document.selection) {
            ctrl.focus();
            var range = document.selection.createRange();
            var rangelen = range.text.length;

            range.moveStart ('character', -ctrl.value.length);
            var start = range.text.length - rangelen;

            return {'start': start, 'end': start + rangelen };
        }
        // IE >=9 and other browsers
        else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
            return {'start': ctrl.selectionStart, 'end': ctrl.selectionEnd };
        } else {
            return {'start': 0, 'end': 0};
        }
    },
    copyToClipboard : function(val) {
        val = val == undefined ? location.href: val;
        //var clipboardData;

        if (this.getBrowser().name == 'chrome')
        {
            var t = document.createElement("textarea");
            document.body.appendChild(t);
            t.value = val;
            t.select();
            document.execCommand('copy');
            document.body.removeChild(t);
        } else if(this.getBrowser().name == 'firefox'){
            var t = document.createElement("a");
            document.body.appendChild(t);
            t.text = val;
            var range = document.createRange();
            range.selectNode(t);
            window.getSelection().addRange(range);
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
        }else if(this.getBrowser().name == 'safari'){
            //window.prompt("????? URL?? 蹂듭?(Ctrl+C)???\n????? 怨녹? 遺???ｊ린(Ctrl+V)?????", val);
            $('.url-copy input').focus();
            alert('URL?? 蹂듭???? ????? 怨녹? 遺???ｊ린 ?????.');

        } else {
            window.clipboardData.setData("Text", val);
        }

        if(this.getBrowser().name != 'safari'){
            alert('二쇱?媛? 蹂듭?????듬???.\n????? 怨녹? 遺???ｊ린 ?댁＜?몄?.');
        }
    },
    // 留????? 踰??
    minusFormAll : function(){
        $('.btn-minus').on('click', function(){
            //debugger;
            //console.dir($(this).next('input').val());
            var val = Number($(this).next('input').val()) - 1;
            if(val < 2){
                val = 1;
            }
            $(this).next('input').val(val);
        });
    },
    // ????? 踰??
    plusFormAll : function(){
        $('.btn-plus').on('click', function(){
            //debugger;
            //console.dir($(this).prev('input').val());
            var val = Number($(this).prev('input').val()) + 1;

            // ???濡? 10源??留? 利?? ?대? ????? ?ш? ??? 留??留? 利????? ??? ???
            if(val > 10){
                val = 10;
            }
            $(this).prev('input').val(val);
        });
    },
    modal : function(param){

        if(param.execute){
            $(param.execute).off('click');
            $(param.execute).click(function(){
                UI.modal(param);
            });
        }

        var modal = param.modal;

        var button = param.button;
        if(param.buttonType=='alert'){
            button = '<button type="button" class="btn-primary btn-md">???</button>';
        }else if(param.buttonType=='confirm'){
            button = '<button type="button" class="btn-semi btn-md">痍⑥?</button><button type="button" class="btn-primary btn-md">???</button>';
        }else if(param.buttonType=='yesno'){
            button = '<button type="button" class="btn-semi btn-md">?????</button><button type="button" class="btn-primary btn-md">??</button>';
        }

        if($(modal).length == 0 || param.modalType != undefined) {
            if($(modal).length > 0) $(modal).remove();
            var modalType = param.modalType == undefined ? 'alert' :  param.modalType;
            var modalId = modal.replace('#','');
            var html = '';
            if(modalType == 'alert'){
                html += '<div class="modal modal-alert modal-overlay" id="' + modalId + '" role="dialog" aria-modal="true">';
                html += '<div class="modal-dialog" role="document">';
                html += '<div class="modal-inner">';
                html += '<div class="modal-body">';
                html += '<div class="modal-header">';
                html += '<h1 class="modal-title"></h1>';
                html += '</div>';
                html += '<div class="modal-content">';
                html += '</div>';
                html += '<div class="modal-footer">';
                html += '<div class="btn-area">';
                html += '</div>';
                html += '</div>';
                html += '<button type="button" class="btn-close">';
                html += '<span class="ico-close">??? ?リ린</span>';
                html += '</button>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
                html += '<div class="dimmed"><iframe frameborder="0" src="about:blank" title="踰?렇?쎌???" class="iframe-bugfix"></iframe></div>';
                html += '</div>';
            } else if(modalType == 'normal'){
                html += '<div class="modal modal-overlay" id="' + modalId + '" role="dialog" aria-modal="true">';
                html += '<div class="modal-dialog" role="document">';
                html += '<div class="modal-inner">';
                html += '<div class="modal-body">';
                html += '<div class="modal-header">';
                html += '<h1 class="modal-title"></h1>';
                html += '</div>';
                html += '<div class="modal-content">';
                html += '</div>';
                html += '<div class="modal-footer">';
                html += '<div class="btn-area">';
                html += '</div>';
                html += '</div>';
                html += '<button type="button" class="btn-close">';
                html += '<span class="ico-close">??? ?リ린</span>';
                html += '</button>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
                html += '<div class="dimmed"><iframe frameborder="0" src="about:blank" title="踰?렇?쎌???" class="iframe-bugfix"></iframe></div>';
                html += '</div>';
            }

            $('body').append(html);
        }

        $(modal).find('.modal-title').html(param.title);
        $(modal).find('.modal-content').html(param.content);
        $(modal).find('.modal-footer .btn-area').html(button);

        $(modal).find('.modal-footer .btn-area').children().click(function(){
            $(modal).hide();
            $('body').removeClass('js-noscroll');
        });

        $( modal + ' .btn-close').on('click', function() {
            $(modal).hide();
            $('body').removeClass('js-noscroll');
        });

        $( modal).click(function(e){
            if(!$('.modal-body').has(e.target).length) {
                $(modal).hide();
                $('body').removeClass('js-noscroll');
            }
        });

        if(param.callBack){
            param.callBack(modal, param);
        }

        $(modal).show();
        $('body').addClass('js-noscroll');
    },
    modalAll : function(){
        $('[data-modal]').modal();
    },
    tooltip : function(param){
        //var $tooltip = $(param.tooltip);
        var btn = param.excute;
        var $tooltip = $(btn).parent('.ico-tooltip-wrap').find(param.tooltip);
        $tooltip.toggle();
    },
    tooltipAll : function(){
        $('[data-tooltip]').tooltip();
    },
    sticky : function(){
        //GNB2
        $( window ).on('scroll resize',function() {
            //console.log($(this).scrollTop());
            var left = $(this).scrollLeft();
            var wWidth = $(this).outerWidth();
            //GNB2
            if($('#header .h_lnb_wrap #gnb2').length > 0){

                if($(this).scrollTop()>70){
                    $('#header .h_lnb_wrap #gnb2').css({'top':'0px', 'left': -left, 'position':'fixed'});

                }else{
                    $('#header .h_lnb_wrap #gnb2').css({'top':'', 'left': '', 'position':''});
                }
                $('#header .h_lnb_wrap #gnb2 .lnb_wrap').css('margin-left',$('#header .gnb_wrap').css('margin-left'));
            }


            //??? Mobile > detail > ??? 二쇰Ц??린 ????? (mobile_detail)
            if($('.checkpoint-wrap').offset() && $('.sticky-detail-wrap .sticky-detail').length > 0){
                if($(this).scrollTop() >= $('.checkpoint-wrap').offset().top-$(this).outerHeight()){
                    $('.sticky-detail-wrap .sticky-detail').removeClass('sticky-on');
                    $('.sticky-detail-wrap .sticky-detail').css({'left' : ''});
                }else{
                    $('.sticky-detail-wrap .sticky-detail').addClass('sticky-on');
                    $('.sticky-detail-wrap .sticky-detail').css({'left' : -left });
                }
                $('.sticky-detail-wrap .sticky-detail .l-grid').css('margin-left',$('#header .gnb_wrap').css('margin-left'));
            }

            //怨듭?吏???? > 紐⑸? > ??? 怨듭?吏???? 蹂??? ??┝ ?????(disclosure_list)
            if($('.checkpoint-wrap').offset() && $('.sticky-disclosure-wrap .disclosure-notice-wrap').length > 0){
                //var left
                if($(this).scrollTop() >= $('.checkpoint-wrap').offset().top-$(this).outerHeight()){
                    $('.sticky-disclosure-wrap .disclosure-notice-wrap').removeClass('sticky-on');
                    $('.sticky-disclosure-wrap .disclosure-notice-wrap .l-grid').css({'left' : ''});

                }else{
                    $('.sticky-disclosure-wrap .disclosure-notice-wrap').addClass('sticky-on');
                    $('.sticky-disclosure-wrap .disclosure-notice-wrap .l-grid').css({'left' : wWidth<1200 ? 10 - left :0 - left });
                }
            }

            //T???蹂댁?蹂댁? (t-relax-security)
            if($('.wrap .footer').offset() && $('.security-floating-area .security-floating').length > 0){
                if($(this).scrollTop() >= $('.wrap .footer').offset().top-$(this).outerHeight()){
                    $('.security-floating-area .security-floating').removeClass('sticky-on');
                    $('.security-floating-area .security-floating').css({'left' : ''});
                }else{
                    $('.security-floating-area .security-floating').addClass('sticky-on');
                    $('.security-floating-area .security-floating').css({'left' : -left });
                }
                $('.security-floating-area .security-floating .l-grid').css('margin-left',$('#header .gnb_wrap').css('margin-left'));
            }

            //二쇰Ц?????
            if($('.purchase-cont').offset() && $('.purchase-wrap .purchase-spot').length > 0){
                var left = $('.purchase-cont').width() + $('.purchase-cont').offset().left + 56 - $(this).scrollLeft();
                if($(this).scrollTop() >= $('.purchase-wrap').offset().top-70){
                    if($(this).scrollTop() >= $('.last-btn-area').offset().top - $('.purchase-wrap .purchase-spot').outerHeight()+110){//?????? ?????
                        var top = $('.last-btn-area').offset().top - $('.purchase-wrap .purchase-spot').outerHeight() -$(this).scrollTop()+130;
                        $('.purchase-wrap .purchase-spot').css({'top' : top, 'left' :  left, 'position': 'fixed'});
                    }else{//?????? ?????
                        $('.purchase-wrap .purchase-spot').css({'top':'71px', 'left' :  left, 'position':'fixed'});
                    }
                }else{
                    $('.purchase-wrap .purchase-spot').css({'position': ''});

                }
            }

            //二쇰Ц?? ????대?吏?
            if($('.mobile-detail-content .product-spot-wrap .product-spot-img').offset() && $('.mobile-detail-content .product-spot-wrap .product-spot-img').length > 0){
                var left = $('.product-spot-wrap .l-grid').offset().left - $(this).scrollLeft();
                if(!$('.product-spot-info').height() < $('.product-spot-img').height()){
                    if($(this).scrollTop() >= $('.product-spot-wrap .l-grid').offset().top-70){
                        if($(this).scrollTop() >= $('.product-spot-wrap').outerHeight() - $('.product-spot-img').outerHeight() ){//?????? ?????
                            //console.log('aa');
                            var top = $('.product-spot-wrap .l-grid').offset().top + $('.product-spot-wrap .l-grid').outerHeight() - $('.product-spot-img').outerHeight() - $(this).scrollTop();
                            $('.product-spot-img').css({'top' : top, 'left' :  left	, 'position': 'fixed'});
                        }else{//?????? ?????
                            //console.log('aaa');
                            $('.mobile-detail-content .product-spot-wrap .product-spot-img').css({'top':'71px', 'left' :  left	, 'position':'fixed'});
                        }
                    }else{
                        $('.product-spot-img').css({'position': ''});

                    }
                }
            }

            //??? Mobile > ???怨??湲? > ??? ????? (product_internet_iptv_fee_calculator)
            var $floatPoint = $('.iptv-content .lr-wrap.type-period');
            var $floatingObj = $('.iptv-content .calculate-price-area');
            //var $floatingInner = $floatingObj.find('.calculate-price-list');

            //console.log($floatPoint.offset().top + $floatPoint.outerHeight() + $floatingObj.outerHeight() - $(this).outerHeight());
            if($floatPoint.offset() && $floatingObj.length > 0){
                if($(this).scrollTop() >= $floatPoint.offset().top + $floatPoint.outerHeight() + $floatingObj.outerHeight() - $(this).outerHeight()){
                    $floatingObj.css({'left' : '', 'position': '',bottom:'', right:''});
                }else{
                    $floatingObj.css({'left' : -left ,'position': 'fixed',bottom:'0',right:'0'});
                    //$('.calculate-price-area .calculate-price-list').css('margin-left',$('#header .gnb_wrap').css('margin-left'));
                    //$('.calculate-price-area .calculate-price-list').css('margin-right',$('#header .gnb_wrap').css('margin-right'));
                }
            }
        });
        $( window ).on('scroll',function() {
            //MENU ?ㅽ?濡ㅼ???? ?リ린
            $('#header .h_lnb_allwrap').hide();
            $('#header .h_lnb_allmenu:visible').hide();
            $('.wrap #dimed').hide();
            //myT ?ㅽ?濡ㅼ???? ?リ린
            $('#header .aside_wrap .g_myt').find('.layer_con_aside').slideUp(100);
            $('#header .aside_wrap .g_myt').removeClass('over');
        });
        $( window ).on('resize',function() {
            var left = $(this).scrollLeft();
            //MENU?????
            if($('#header .h_lnb_allwrap').length > 0 && $('#header .header_con .h_lnb_wrap .h_lnb .lnb').offset()){
                if($(this).scrollTop()>70){
                    $('#header .h_lnb_allwrap').css({'top':'47px','left': $('#header .header_con .h_lnb_wrap .h_lnb .lnb').offset().left - left, 'position':'fixed'});
                }else{
                    $('#header .h_lnb_allwrap').css({'top':'','left': '', 'position':''});
                }
            }
        });
        $(window).trigger('scroll');
    },
    global : function(){
        /* ===============================================================
        Form
        ================================================================*/
        //Designed html selectbox
        $('.c-select, .c-select-outline').has('.select-list .select-item .item').on('click', function(e) {
            //ie crossbrowsing (css pointer-events: none;)
            if($(this).hasClass('disabled')){
                return false;
            }
            //firefox crossbrowsing
            if($(this).data('keydown')==32){
                $(this).addClass('active');
            }else{
                var ev = jQuery.Event("keydown");
                ev.keyCode = 13; // # Some key code value
                $(this).trigger(ev);
            }
            $(this).data('keydown',false);
            $(this).find('button.head').focus();
        }).keydown(function(e){
            if(!$(this).data('init')){$(this).trigger('init');}
            if(e.keyCode!=9  ){
                e.preventDefault();
            }
            $(this).data('keydown',e.keyCode);
            if($(this).hasClass('active')){
                var length = $(this).find('.select-item').length;
                var activeIndex = $(this).data('active-index');
                var index = activeIndex >-1 ? activeIndex : $(this).find('.select-item').index($(this).find('.select-item .item.hover'));
                var itemHeight = 0;
                var listHeight = $(this).find('.select-list').height();
                var listScrollTop = $(this).find('.select-list').scrollTop();
                if(e.keyCode==38){//??
                    index = index < 1 ? 0 : index-1;
                    $(this).find('.select-item').find('.item').removeClass('hover');
                    $(this).find('.select-item').eq(index).find('.item').addClass('hover');
                    $(this).data('active-index', index);
                    $(this).find('.select-item:lt('+(index)+')').each(function(){
                        itemHeight += $(this).height();
                    });
                    if(listScrollTop > itemHeight){
                        $(this).find('.select-list').scrollTop(itemHeight);
                    }

                    if(listHeight <= itemHeight-listScrollTop){
                        $(this).find('.select-list').scrollTop(itemHeight-listHeight+$(this).find('.select-item').eq(index).height());
                    }

                }else if(e.keyCode==40){//???
                    index = index+1 < length ? index+1 : index;
                    $(this).find('.select-item').find('.item').removeClass('hover');
                    $(this).find('.select-item').eq(index).find('.item').addClass('hover');
                    $(this).data('active-index', index);
                    $(this).find('.select-item:lt('+(index+1)+')').each(function(){
                        itemHeight += $(this).height();
                    });
                    if(itemHeight >= listHeight){
                        $(this).find('.select-list').scrollTop(itemHeight-listHeight);
                    }

                    if(itemHeight < listScrollTop){
                        $(this).find('.select-list').scrollTop(itemHeight-$(this).find('.select-item').eq(index).height());
                    }
                }else if(e.keyCode==13){ //enter
                    if(index==-1){
                        $(this).removeClass('active');
                    }else{
                        $(this).find('.select-item').eq(index).trigger('click');
                    }
                }else if( e.keyCode==32) {//spacebar
                    return false;
                }else if(e.keyCode==27){//esc
                    $(this).find('.select-item').find('.item').removeClass('hover');
                    $(this).removeData('active-index');
                    $(this).removeClass('active');
                }else if(e.keyCode==9){	//tab
                    $(this).find('.select-item').find('.item').removeClass('hover');
                    $(this).removeData('active-index');
                    $(this).removeClass('active');
                    e.preventDefault();
                }

            }else{
                if(e.keyCode==13){//enter
                    $(this).addClass('active');
                }else if( e.keyCode==32) {//spacebar
                    $(this).addClass('active');
                }
            }
        }).on('init',function(){
            $(this).data('init',true);
            var _this = this;
            $('*').on('click',function(e){
                if($(_this).hasClass('active') && e.target != _this) {
                    if(!$(_this).has(e.target).length) {
                        $(_this).removeClass('active');
                    }
                }

            });
            $(this).find('.select-item').off('hover').hover(
                function(){
                    var index = $(_this).find('.select-item').index(this);
                    $(this).siblings().find('.item').removeClass('hover');
                    $(this).find('.item').addClass('hover');
                    $(_this).data('active-index',index);
                },
                function(){
                }
            ).click(function(e){
                //????? ???????? 泥?━遺?遺?
                setTimeout(function(){$(_this).removeClass('active');},100);
                var index = $(this).index();
                $(_this).data('selected-index', index);
                //console.log($(_this).data('selected-index'));
                $(_this).find('.select-item').find('.item').removeClass('hover');
                $(_this).removeData('active-index');
                $(this).find('button.head').focus();
                return false;
            });
        });

        //CHECKBOX
        //$('.c-chk input:checkbox, .c-ick-btn .label, .c-ick-var .label').on('click', function(e) {
        $(document).on('click','.c-chk input:checkbox, .c-ick-btn .label, .c-ick-var .label, .mysec-chk input:checkbox',function(e) {
            //console.log('checkbox click');
            //.disabled pointer-events: none; ie8 誘몄???
            //ie crossbrowsing (css pointer-events: none;)
            if($(this).parent('span').hasClass('disabled')){
                return false;
            }
            if ($(this).is(':radio')) {
                $(this).parent().addClass('checked');
                $(this).parent().siblings().removeClass('checked');
            } else if ($(this).prev().is(':radio') || $(this).parent().attr('role') == "tab") {
                if($(this).parent().attr('aria-controls')=='_mbrClsPnl3'){
                    UI.modal({modal: '#modalAlert', title: '??┝', content: '?대??? 援щℓ瑜? ?????? 踰?? 怨???????? ?????? 二쇰Ц?? ?댁??????. (援????? 1599-0224)',buttonType:'alert'});
                    return false;
                }
                $(this).parent().addClass('checked');
                $(this).parent().siblings().removeClass('checked');
            } else {
                $(this).parent().toggleClass('checked');
            }
        });

        $(document).on('allunchecked','.c-chk input:checkbox, .c-ick-btn input:checkbox, .c-ick-var input:checkbox, .mysec-chk input:checkbox',function(e) {
            $(this).filter(':checked').trigger('click');
            //$(this).parent().removeClass('checked');
            //$(this).prop('checked',false);
        });

        $(document).on('allchecked','.c-chk input:checkbox, .c-ick-btn input:checkbox, .c-ick-var input:checkbox, .mysec-chk input:checkbox',function(e) {
            $(this).not(':checked').trigger('click');
            //$(this).parent().addClass('checked');
            //$(this).prop('checked',true);
        });

        //RADIO
        $('.c-rdo input:radio, .c-ick-btn input:radio, .c-ick-var input:radio, .mysec-rdo input:radio').on('change', function(){
            //console.log('radio chagnge');
            var thisName = $(this).attr('name');
            var thisGroup = $('input[name=' + thisName + ']:radio');

            if($(this).is(':checked')){
                $(this).parent().addClass('checked');
            }

            $(thisGroup).not(this).each(function(){
                $(this).parent().removeClass('checked');
            });
        }).click(function(){
            //console.log('radio click');
            var thisName = $(this).attr('name');
            var thisGroup = $('input[name=' + thisName + '][data-radio=unchecked]:radio');
            var index = thisGroup.index(this);

            if( $(this).is('input[data-radio=unchecked]:radio')){
                if($(this).data('radio-chckedindex')== index){
                    $(this).prop('checked', false );
                    $(this).parent().removeClass('checked');
                    thisGroup.removeData('radio-chckedindex');
                }else{
                    thisGroup.data('radio-chckedindex', index);
                }
                //console.log($(this).data('radio-chckedindex'));
            }
        });

        //INPUT FOCUS
        $('.c-input input, .c-input-outline input').on('focus', function() { $(this).parent().addClass('focus');}).on('focusout', function() {$(this).parent().removeClass('focus');});




        //?쎄????
        //?대? 媛???? ???吏??? prop checked?? 遺?遺?? ??? ?쇰? prop checked 二쇱?泥?━
        //$checkAllInput.on('click', function() {
        $(document).on('click','.agree-area:not(.improvement):not(.except) .agree-item.check-all .c-chk' ,function(){
            var $checkAllInput = $('.agree-item.check-all').find('.c-chk');
            var $checkSingle   = $checkAllInput.parents('.agree-area').find('.agree-list .c-chk');
            if ($(this).hasClass('checked')) {
                $checkSingle.each(function() {
                    $(this).addClass('checked');
                    //$(this).find('input:checkbox').prop('checked',true);
                });
            } else {
                $checkSingle.each(function() {
                    $(this).removeClass('checked');
                    //$(this).find('input:checkbox').prop('checked',false);
                });
            }
        });

        //$checkSingle.on('click', function () {
        $(document).on('click','.agree-area:not(.improvement):not(.except) .agree-list .c-chk',function(){
            var $checkAllInput = $('.agree-item.check-all').find('.c-chk');
            var $checkSingle   = $checkAllInput.parents('.agree-area').find('.agree-list .c-chk');
            if ($(this).hasClass('checked')) {
                var $isAllChecked = 0;

                $checkSingle.each(function() {
                    if (!$(this).hasClass('checked')) {
                        $isAllChecked = 1;
                    }
                });

                if ($isAllChecked == 0) {
                    //媛?? input ??껜 泥댄???
                    $checkAllInput.addClass('checked');
                    //$checkAllInput.find('input:checkbox').prop('checked',true);
                }
            } else {
                //媛?? input 泥댄? ?댁???
                $checkAllInput.removeClass('checked');
                //$checkAllInput.find('input:checkbox').prop('checked',false);
            }
        });

        //媛???? ?쎄????
        $(document).on('click','.agree-area.improvement:not(.except)  .agree-item.check-all .c-chk :checkbox' ,function(event){
            //event.preventDefault();
            var $checkAllInput = $('.agree-item.check-all').find('.c-chk :checkbox');
            var $checkSingle   = $checkAllInput.parents('.agree-area').find('.agree-list .c-chk :checkbox');
            if ($(this).prop('checked')) {
                $checkSingle.not(':checked').closest('.c-chk').addClass('checked');
                $checkSingle.not(':checked').prop('checked',true).trigger('change');
            } else {

                $checkSingle.filter(':checked').closest('.c-chk').removeClass('checked');
                $checkSingle.filter(':checked').prop('checked',false).trigger('change');
            }
        });

        //$checkSingle.on('click', function () {
        $(document).on('click','.agree-area.improvement:not(.except) .agree-list .c-chk :checkbox',function(){
            var $checkAllInput = $('.agree-item.check-all').find('.c-chk :checkbox');
            var $checkSingle   = $checkAllInput.parents('.agree-area').find('.agree-list .c-chk :checkbox');
            if ($(this).prop('checked')) {
                var $isAllChecked = 0;

                $checkSingle.each(function() {
                    if (!$(this).prop('checked')) {
                        $isAllChecked = 1;
                    }
                });

                if ($isAllChecked == 0) {
                    //媛?? input ??껜 泥댄???
                    $checkAllInput.closest('.c-chk').addClass('checked');
                    $checkAllInput.prop('checked',true).trigger('change');
                }
            } else {
                //媛?? input 泥댄? ?댁???
                $checkAllInput.closest('.c-chk').removeClass('checked');
                $checkAllInput.prop('checked',false).trigger('change');
            }
        });



        //$checkAllFold.on('click', function () {
        $(document).on('click', '.btn-trigger-all', function(){
            var $checkAllFold = $('.btn-trigger-all');
            var $checkSingleFold = $('.btn-trigger');
            var $agreeItem = $checkSingleFold.parents('.agree-item');
            var $checkAllBtn = $(this).parents('.agree-item.check-all');
            var $checkAllList = $checkAllBtn.next('.agree-list');

            $checkAllBtn.toggleClass('active');
            $checkAllFold.attr('aria-expanded',
                $checkAllFold.attr('aria-expanded')=='false' ? 'true' : 'false'
            );
            $checkAllList.toggle();

            if ($checkAllList.children('.agree-item').length < 3) {
                $agreeItem.addClass('active');
                $checkSingleFold.attr('aria-expanded',
                    $checkSingleFold.attr('aria-expanded')=='false' ? 'true' : 'false'
                );
            }
        });

        function triggerGroup($btnTrigger, $parentEl) {
            //$($btnTrigger).on('click', function () {
            $(document).on('click',$btnTrigger, function(){
                if ($parentEl.length) {
                    var $this = $(this);
                    var $parentCur = $this.closest($parentEl);

                    //console.log($parentCur);

                    $parentCur.toggleClass('active');
                    $this.attr('aria-expanded',
                        $this.attr('aria-expanded')=='false' ? 'true' : 'false'
                    );
                }

                if($btnTrigger == '.purchase-spot .btn-trigger'){
                    $(window).trigger('scroll');
                }
            });
        }
        triggerGroup('.agree-area .btn-trigger', '.agree-item');
        triggerGroup('.purchase-spot .btn-trigger', '.purchase-spot');

        /* ===============================================================
        //?쇳?媛??대? 援щℓ??린
        ================================================================*/
        $('.review-wrap .btn-more').on('click', function () {
            $(this).parents('li').toggleClass('active')
        });

        $('.category a').on('click', function() {
            $('.cont').hide();
            $('#category').show();
        });

        $('.openup a').on('click', function() {
            $('.cont').hide();
            $('#openup').show();
        });

        $('.commission a').on('click', function() {
            $('.cont').hide();
            $('#commission').show();
        });


        //my 臾몄???린
        $('.inquiry-list-wrap .btn-more').on('click', function () {
            $(this).parent().parent().toggleClass('active')
        });

        /* ===============================================================
        //怨듯? ?????
        ================================================================*/
        $('.fixed-btn-area .btn-close').on('click', function(){
            $(this).parent().removeClass('open');
        });
        $('.fixed-btn-area .btn-tit').on('click', function(){
            $(this).parent().addClass('open');
        });

        /* ===============================================================
        //援щℓ????몄?
        ================================================================*/
        function rdoTab($parent, $input, $expand) {
            var $tabItemInput = $($parent).find($input);
            $($tabItemInput).each(function(){
                var $tabItem = $(this).closest('.c-rdo');
                var $tabPanel = $($tabItem).closest($parent).find($expand);

                if ($($tabItem).hasClass('checked')) {
                    $tabPanel.hide().eq($tabItem.index()).show();
                }

                $($(this)).on('click', function () {
                    $tabPanel.hide().eq($tabItem.index()).show();
                });
            });
        }

        rdoTab('.td-auth', '.fluid-types input', '.expand-panel'); //蹂몄??몄? 諛⑸?
        rdoTab('.td-usim', '.fluid-types input', '.expand-panel'); //USIM
        rdoTab('.td-attached-minor', '.fluid-types input', '.expand-panel'); //誘몄???? 泥⑤????

        //????リ린
        $('.popup .popup-body .popup-footer .btn-area button, .popup.popup-cousel-finish .popup-body button').click(function(){
            if($(this).text()=='???'){
                self.close();
            }
        });
    },
    componentInitSwipers : function(obj){
        return obj.find('.swiper-config-pagination.swiper-container').parent().attr('visibility','hidden');
    },
    componentBindingEvent : function(obj, callback){
        UI.componentBindingCallback.callback = callback;
        var result = [];
        obj.find('.swiper-config-pagination.swiper-container').each(function(index){
            //console.log(index);
            var numIdTmp = [];
            $('[id^=pagination]').each(function(){
                numIdTmp.push($('[id^=pagination]').attr('id').replace('pagination',''));
            });
            var numId = numIdTmp.length > 0 ?  Math.max.apply(Math,numIdTmp) + 1 : 1;
            var paginationId = '';
            var _this = this;
            var sildeLength = $(this).find('.swiper-slide').length;
            //console.log(sildeLength);
            var loop = true;

            //console.log(numId);

            if($(this).find('.pagination').length > 0){
                paginationId = 'pagination' + numId;
                $(this).find('.pagination').attr('id',paginationId);
                //console.log(paginationId);
            }else if($(this).next('.pagination').length> 0 ){
                paginationId = 'pagination' + numId;
                $(this).next('.pagination').attr('id',paginationId);
                //console.log(paginationId);
            }else if($(this).next().find('.pagination').length> 0 ){
                paginationId = 'pagination' + numId;
                $(this).next().find('.pagination').attr('id',paginationId);
            }
            if(sildeLength==1){
                loop = false;
                $(this).find('.pagination').hide();
                $(this).next('.pagination').hide();
                $(this).next('.swiper-btn-bottom').hide();
            }
            //swipers[0].startAutoplay();
            //swipers[0].stopAutoplay();

            result.push(
                new Swiper(this, {
                    pagination: paginationId ? '#' + paginationId : '' ,
                    loop: loop,
                    paginationClickable: true,
                    grabCursor: true,
                    autoplay: 5000,
                    autoplayDisableOnInteraction: false,
                    slidesPerView : 1,
                    //initialSlide : 1,
                    onFirstInit : function(swiper){
                        //console.log(swiper);
                        //console.log($(swiper.getSlide(1)).data('tos-loadurl'));
                        UI.componentBindingCallback.swiperInit(swiper);
                        //setTimeout(function(){swiper.swipeTo(2)},1);
                        /*if(swiper.slides.length>0){
                            sildeLength = swiper.slides.length - 2;
                            console.log(sildeLength);
                            if(sildeLength==1){
                                console.log(swiper.paginationContainer);
                                $(swiper.paginationContainer).hide();
                            }
                        }*/
                    },
                    onSlideClick : function(swiper){
                        //console.log('onSlideClick:' + swiper.clickedSlideIndex);
                        //$(_this).find('[data-tos-clickurl]:not([data-tos-clickurl=""])').eq(swiper.clickedSlideIndex+1).trigger('onSlideClick');
                        //console.log(swiper.clickedSlide);
                        //console.log($(swiper.clickedSlide).find('[data-tos-clickurl]').data('tos-clickurl'));
                        if(UI.componentBindingCallback.isClick){
                            var param = $(swiper.clickedSlide).find('[data-tos-click-params]').data('tos-click-params');
                            UI.componentBindingCallback.excute(param);
                            UI.componentBindingCallback.isClick = false;
                        }
                    },
                    onTouchEnd : function(){
                        //console.log('onTouchEnd');
                    },
                    onImagesReady: function(swiper){
                        //console.log(swiper.paginationContainer);
                        if($(_this).parent().css('visibility') == 'hidden'){
                            swiper.swipeReset();
                            $(_this).parent().hide();
                            $(_this).parent().css('visibility','visible');
                            $(_this).parent().fadeIn();
                        }
                    }
                })
            );
            $(this).find('[data-tos-click-params]:not([data-tos-click-params=""])').click(function(){
                //console.log('click');
                UI.componentBindingCallback.isClick = true;
            });

            if($(this).has('.swiper-button-prev').length){
                $(this).find('.swiper-button-prev').on('click', function(){
                    result[index].swipePrev();
                });
                $(this).find('.swiper-button-next').on('click', function(){
                    result[index].swipeNext();
                });
                if(sildeLength ==1 && !$(this).find('.swiper-button-prev, .swiper-button-next').is('.js-nothidden')){
                    $(this).find('.swiper-button-prev, .swiper-button-next').hide();
                }

            }else{
                $(this).nextAll('.swiper-button-prev').on('click', function(){
                    result[index].swipePrev();
                });
                $(this).nextAll('.swiper-button-next').on('click', function(){
                    result[index].swipeNext();
                });
                if(sildeLength ==1 && !$(this).nextAll('.swiper-button-prev, .swiper-button-next').is('.js-nothidden')){
                    $(this).nextAll('.swiper-button-prev, .swiper-button-next').hide();
                }
            }

            //autoplay
            result[index].stopAutoplay();
            if($(this).nextAll('.swiper-btn-bottom').find('.swiper-btn-play').length> 0 && $(this).nextAll('.swiper-btn-bottom').find('.swiper-btn-stop').length> 0){
                var sbbWidth = $(this).next('.swiper-btn-bottom').find('.pagination').width() + 38;
                $(this).nextAll('.swiper-btn-bottom').css({width:sbbWidth,'margin-left': -sbbWidth/2, left:'50%'});
                result[index].startAutoplay();
                $(this).nextAll().find('.swiper-btn-play').click(function(){
                    $(this).hide().siblings('.swiper-btn-stop').show();
                    result[index].startAutoplay();
                });
                $(this).nextAll().find('.swiper-btn-stop').click(function(){
                    $(this).hide().siblings('.swiper-btn-play').show();
                    result[index].stopAutoplay();
                });
            }

        });

        //?쇰?????
        obj.find('.component-binding-event').each(function(index){
            $(this).find('[data-tos-load-params]:not([data-tos-load-params=""])').each(function(){
                var loadParam = $(this).data('tos-load-params');
                UI.componentBindingCallback.excute(loadParam);
            });

            $(this).find('[data-tos-click-params]:not([data-tos-click-params=""])').click(function(){
                var clickParam = $(this).data('tos-click-params');
                UI.componentBindingCallback.excute(clickParam);
            });

        });

        return result;
    },
    componentNewProduct : function(obj){
        //??-?ㅼ?????? 理???대???
        obj.find('.new-product:first').show();
        obj.find('.link-rank').on('click',function(e){
            $(this).addClass('active').parent('li').siblings('li').find('a.active').removeClass('active');
            $(this).next('.new-product').show().parent('li').siblings('li').find('.new-product').hide();
            e.preventDefault();
        });
    },
    componentBindingCallback : {
        callback: '',
        isClick : false,
        isExcute : [],
        swiperInit : function(swiper){
            var param = $(swiper.getSlide(1)).data('tos-load-params');
            param = param ? param : $(swiper.getSlide(1)).find('[data-tos-load-params]').data('tos-load-params');
            this.excute(param);
            swiper.addCallback('SlideChangeEnd', function(swiper){
                var param = $(swiper.visibleSlides[0]).data('tos-load-params');
                param = param ? param : $(swiper.visibleSlides[0]).find('[data-tos-load-params]').data('tos-load-params');
                UI.componentBindingCallback.excute(param);
            });
        },
        excute : function(param){
            if(param && $.inArray(param, this.isExcute) == -1){
                //console.log('ajax slide 1');
                //console.log(param);
                if($.isFunction(this.callback)){
                    this.callback(param);
                }
                this.isExcute.push(param);
                /*var scr = document.createElement( "SCRIPT" );
                scr.src = url;
                document.body.appendChild( scr );*/
                /*$.ajax({
                    url: url,
                    dataType: 'post'
                }).done(function(){
                    //console.log('done');
                }).fail(function(){
                    //console.log('fail');
                });*/
            }
        }
    },
    gnb : {
        isAutoMyT : false,
        isOnMyT : false,
        init : function(){
            this.depth1();
            this.depth2();
            this.depth2List();

        },
        depth1 : function(){
            $('#header .header_con .h_gnb .gnb_wrap ul.gnb li a').hover(function(){
                $(this).closest('.gnb').addClass('f_action');
            },function(){
                $(this).closest('.gnb').removeClass('f_action');
            });
            //??낫湲?
            $('#header .gnb_wrap .g_more').hover(
                function(){
                    $(this).addClass('over');
                    $(this).find('a').next('.snb_wrap').show();
                    $(this).parent('.gnb').addClass('f_action');
                },
                function(){
                    $(this).removeClass('over');
                    $(this).find('a').next('.snb_wrap').slideUp(100);
                    $(this).parent('.gnb').removeClass('f_action');
                }
            );

            //寃???
            $('#header .aside_wrap .g_srch a').click(function(){
                //硫???リ?
                $('#header .h_lnb_allwrap').hide();
                $('.wrap #dimed').hide();

                $(this).toggleClass('close');
                $('#header .t_srch_wrap').toggle();
                $('#header .t_srch_wrap .sch_right .popular_word').hover(
                    function(){
                        $(this).addClass('on');
                    },
                    function(){
                        $(this).removeClass('on');
                    }
                );

            });

            //myt
            $('#header .aside_wrap .g_myt').on('mouseenter mouseleave focusin focusout',function(e){
                if (e.type === 'mouseenter' || e.type === 'focusin') {
                    UI.isOnMyT = true;
                    e.preventDefault();
                    $(this).find('.layer_con_aside').show();
                    $(this).addClass('over');
                } else if ((e.type === 'mouseleave' || e.type === 'focusout') ) {


                }
            }).hover(function(){

            },function(e){
                e.preventDefault();
                UI.isOnMyT=false;
                var _this = this;
                setTimeout(function(){
                    if(UI.isOnMyT==false){
                        $(_this).find('.layer_con_aside').slideUp(100,function(){});
                        $(_this).removeClass('over');
                        UI.isOnMyT==false;
                    }
                },50);
            });

            //myT 濡?렇?? ??? 硫?? ?대┃
            $('#header .typeB .my_mbox_menus_wrapB1 .my_mbox_menus > ul > li > a').click(function(e){
                /*var _this = this;
                //$(this).closest('.my_mbox_menus_wrapB1').prev('.my_mbox_info').css('margin-left','-200px');
                //$(this).closest('.my_mbox_menus_wrapB1').addClass('menus_open').css('width','100%');
                $(this).closest('.my_mbox_menus_wrapB1').addClass('menus_open').animate({'width':'100%'},200,function(){
                    $(_this).closest('.my_mbox_menus_wrapB1').prev('.my_mbox_info').animate({'margin-left':'-200px'},200);
                });


                $(this).closest('.my_mbox_menus').addClass('f_action');
                $(this).closest('li').siblings().removeClass('on');
                $(this).closest('li').addClass('on');
                $(this).closest('ul').find('a').next('.smenu_dep2').hide();
                $(this).next('.smenu_dep2').show();

                $(this).next('.smenu_dep2').find('> div > ul').eq(0).find('a').css({'position': 'relative', 'marginLeft': '-100%', 'opacity': 0}).each(function (index, ele) {
                    $(ele).animate({'marginLeft': '0%', 'opacity': 1 }, (index + 1) * 50);
                });
                $(this).next('.smenu_dep2').find('> div > ul').eq(1).find('a').css({'position': 'relative', 'marginLeft': '-100%', 'opacity': 0}).each(function (index, ele) {
                    $(ele).animate({'marginLeft': '0%', 'opacity': 1 }, (index + 1) * 50);
                });*/


                e.preventDefault();
                var _that = {}
                _that.slideTime = 100;
                var _this = $(this),
                    _parentMenu = _this.closest('.my_mbox_menus_wrapB1'),
                    _3depthMenu = _this.siblings('.smenu_dep2');

                _that.mytIndex = $(this).parent().index();

                if (_parentMenu.hasClass('menus_open')) {
                    if (!_this.parent().hasClass('on')) {
                        _this.parent().siblings('li').removeClass('on').find('.smenu_dep2').hide();
                        _this.parent().addClass('on').parent().parent().addClass('f_action');
                        _3depthMenu.show().find('ul').css({'overflow': 'hidden'}).find('a').show();
                        _3depthMenu.find('> div > ul').eq(0).find('a').css({'position': 'relative', 'marginLeft': '-100%', 'opacity': 0}).each(function (index, ele) {
                            $(ele).animate({'marginLeft': '0%', 'opacity': 1 }, (index + 1) * 50);
                        });
                        _3depthMenu.find('> div > ul').eq(1).find('a').css({'position': 'relative', 'marginLeft': '-100%', 'opacity': 0}).each(function (index, ele) {
                            $(ele).animate({'marginLeft': '0%', 'opacity': 1}, (index + 1) * 50);
                        });
                    }
                } else {
                    $('.my_mbox_other').hide();
                    _this.parent().addClass('on').parent().parent().addClass('f_action');
                    _parentMenu.addClass('menus_open').animate({'width': '100%'}, _that.slideTime);
                    _parentMenu.siblings('.my_mbox_info').animate({
                        'margin-left': '-200px'
                    }, _that.slideTime, function () {
                        _parentMenu.siblings('.my_mbox_info').css({'visibility': 'hidden'}).attr('aria-hidden', true);
                        $('.btn_back').css({'display': 'block', 'left': '0px'}).animate({
                            'left': '-39px'
                        }, _that.slideTime, function () {
                            _3depthMenu.show().find('ul').css({'overflow': 'hidden'}).find('a').show();
                            _3depthMenu.find('> div > ul').eq(0).find('a').css({'position': 'relative', 'margin-left': '-100%', 'opacity': 0.5}).each(function (index, ele) {
                                $(ele).animate({'marginLeft': '0%', 'opacity': 1}, (index + 1) * 50);
                            });
                            _3depthMenu.find('> div > ul').eq(1).find('a').css({'position': 'relative', 'margin-left': '-100%', 'opacity': 0.5}).each(function (index, ele) {
                                $(ele).animate({'marginLeft': '0%', 'opacity': 1}, (index + 1) * 50);
                            });
                        });
                    });
                }
            });

            //myT 濡?렇?? ??? 硫?? back踰??
            $('#header .typeB .my_mbox_menus_wrapB1 .my_mbox_menus .btn_back').click(function(e){
                /*var $this = $(this).closest('.my_mbox_menus').find('ul li a');
                $this.next('.smenu_dep2').hide();
                //$this.closest('.my_mbox_menus_wrapB1').prev('.my_mbox_info').css('margin-left','');
                $this.closest('.my_mbox_menus_wrapB1').prev('.my_mbox_info').animate({'margin-left': '0px'},200);
                $('.my_mbox_other').css({'margin-left': '-205px', 'display': 'block'}).animate({
                    'margin-left': '0px'
                }, 200);

                $this.closest('.my_mbox_menus_wrapB1').removeClass('menus_open').css('width','');
                $this.closest('.my_mbox_menus').removeClass('f_action');
                $this.closest('li').removeClass('on');*/


                e.preventDefault();
                var _that = {}
                _that.slideTime = 100;
                var _this = $(this),
                    _parentMenu = _this.closest('.my_mbox_menus_wrapB1'),
                    _3depthMenu = _this.siblings('ul').find('li.on > .smenu_dep2');

                _3depthMenu.hide();
                _this.animate({
                    'marginLeft': '0px'
                }, _that.slideTime, function () {
                    _parentMenu.siblings('.my_mbox_info').animate({
                        'marginLeft': '0px'
                    }, _that.slideTime, function () {
                        _parentMenu.siblings('.my_mbox_info').css({'visibility': ''}).attr('aria-hidden', false).css('margin-left','');
                    });
                    _parentMenu.animate({'width': '407px'}, _that.slideTime, function () {
                        _parentMenu.removeClass('menus_open').css('width','');
                        _this.siblings('ul').find('li.on').removeClass('on').parent().parent().removeClass('f_action');
                        $('.my_mbox_other').css({'margin-left': '-205px', 'display': 'block'}).animate({
                            'marginLeft': '0px'
                        }, _that.slideTime);
                    });

                    //$(_that.loginId).find('.my_mbox_menus > ul > li > a').eq(_that.mytIndex).focus();
                });


            });

            //myT ??껜 硫?? 蹂닿린
            //, #header .h_lnb_wrap .btn_allmenu
            $('#header .typeB .my_mbox_menus_wrapB1 .my_mbox_foot').click(function(){
                $('#header .aside_wrap .g_myt').find('.layer_con_aside').hide();
                $('#header .aside_wrap .g_myt').removeClass('over');
                $('#header .h_lnb_allwrap').show();
                $('#header .h_lnb_allwrap .h_lnb_allmenu.menu7.u7').show();
                $('.wrap #dimed').show();
                $('#header .aside_wrap .g_srch a').removeClass('close');
                $('#header .t_srch_wrap').hide();
                UI.gnb.isAutoMyT = false; // 湲곕??댁?
            });

            //myT ??껜 硫?? 3???
            $('#header .h_lnb_allwrap .h_lnb_allmenu.menu7.u7 .wrap_innr .m_list .view_smenu').click(function(){
                $(this).next('.smenu').toggle();
                $(this).find('a').toggleClass('down');
                $(this).find('a').find('em').text( $(this).find('a').find('em').text()== '???硫?? ?닿린' ? '???硫?? ?リ린' : '???硫?? ?닿린' );

                //?⑤????
                //$('#header .h_lnb_allwrap .h_lnb_allmenu.menu7.u7 .wrap_innr .m_list .view_smenu').not(this).find('a').removeClass('down').find('em').text('???硫?? ?닿린');
                //$('#header .h_lnb_allwrap .h_lnb_allmenu.menu7.u7 .wrap_innr .m_list .view_smenu').not(this).next('.smenu').hide();
            });

            //myT ????? ?ㅻⅨ?? ?대┃
            $(document).click(function(e){
                //console.log(e.target);
                if(!$('#header #gnb_login .typeB').has(e.target).length > 0 && !$('#header .h_lnb_allmenu .btn_m_close').has(e.target).length > 0 && !$('#dimed').has(e.target).length > 0 ) {
                    $('#header .aside_wrap .g_myt').find('.layer_con_aside').hide();
                    $('#header .aside_wrap .g_myt').removeClass('over');

                }
            });

        },
        depth2: function(){
            //硫?? ?닿린
            $('#header .h_lnb_wrap .btn_allmenu').on('click',function(){
                var left = $(this).scrollLeft();
                if($('#header .h_lnb_allwrap').length > 0 && $('#header .header_con .h_lnb_wrap .h_lnb .lnb').offset()){
                    if($(window).scrollTop()>70){
                        $('#header .h_lnb_allwrap').css({'top':'47px','left': $('#header .header_con .h_lnb_wrap .h_lnb .lnb').offset().left - left, 'position':'fixed'});
                    }else{
                        $('#header .h_lnb_allwrap').css({'top':'','left': '', 'position':''});
                    }
                }

                //???
                /*if($('#header .h_lnb_allwrap').css('display')=='block' && $('#header .h_lnb_allwrap .h_lnb_allmenu.menu7.u7').css('display') == 'block'){
                    $('#header .h_lnb_allwrap .h_lnb_allmenu.menu7.u7').hide();
                }else{
                    $('#header .h_lnb_allwrap .h_lnb_allmenu.menu7.u7').hide();
                    $('#header .h_lnb_allwrap').toggle();
                    $('.wrap #dimed').toggle();
                }*/
                $('#header .h_lnb_allwrap .h_lnb_allmenu.menu7.u7').hide();
                $('#header .h_lnb_allwrap, #header .h_lnb_allmenu.menu2.u2').show();
                $('.wrap #dimed').show();


            });

            //硫?? ?リ린
            $('#header .h_lnb_allmenu .btn_m_close').on('click', function(e){
                e.preventDefault();
                e.stopPropagation();
                $('#header .h_lnb_allmenu:visible').slideUp(100,function(){$('#header .h_lnb_allwrap').hide();});
                $('.wrap #dimed').hide();
                if(UI.gnb.isAutoMyT == true){
                    $('#header .aside_wrap .g_myt').find('.layer_con_aside').show();
                    $('#header .aside_wrap .g_myt').addClass('over');
                    UI.gnb.isAutoMyT = false;
                }

            });

            //?ㅻ? ?대┃?? (?ъ??? ??껜 ?ㅻ? ?명?????쇰? ?ロ??쇰? ??━)
            $('.wrap #dimed').click(function(e){
                e.preventDefault();
                e.stopPropagation();
                $('#header .h_lnb_allmenu:visible').slideUp(100,function(){$('#header .h_lnb_allwrap').hide();});
                $('.wrap #dimed').hide();

                //留???? ?ы??깊?
                //$('#header .aside_wrap .g_myt').find('.layer_con_aside').show();
                //$('#header .aside_wrap .g_myt').addClass('over');
            });



        },
        depth2List : function(){
            var timer;
            //gnb2 hover
            $('#gnb2 .lnb_wrap .lnb .lnb_list li.nb').off('mouseenter mouseleave').hover(
                function(){
                    var _this = this;
                    timer = setTimeout(function(){
                        $(_this).addClass('on');
                        $(_this).find('.snb_wrap').show();
                    },100);

                },
                function(){
                    clearTimeout(timer);
                    $(this).removeClass('on');
                    $(this).find('.snb_wrap').stop().slideUp(100);
                }
            );
        }
    },
    loading : {
        sample: function(){
            $(document).on('click', '.filter-body input:checkbox', function(){
                UI.loading.start();
                UI.loading.end();
            });
        },
        start : function(){
            $('.js-transition').stop(true,true).fadeIn(150);
        },
        end : function(){
            $('.js-transition').stop(true,true).fadeOut(150);
        }
    },
    //?ъ빱?ㅼ? ???fixed硫???? 媛??ㅼ??? ?ㅽ?濡?
    focusScroll: function(){
        $("input, textarea").focus(function(e){
            //console.log('focusScroll');
            if($(this).offset().top - 47 <  $(window).scrollTop()){
                //window.scrollBy(0, -100);
                $(window).scrollTop($(window).scrollTop()-100);
            }
        });
    }
}
UI.init();
/* ===============================================================
 //Modal
 ================================================================*/
/*$('.modal .js-modal-close, .modal .btn-close').on('click', function() {
	$('.modal').hide();
	$('body').removeClass('js-noscroll');
});

function modalGroup($modalBtn, $modalOpenGroup) {
	$($modalBtn).on('click', function() {
		$($modalOpenGroup).show();
		$('body').addClass('js-noscroll');
	});
}*/
//modalGroup('.js-modal-disclosure-notice', '.modal-disclosure-notice');
//modalGroup('.disclosure-notice-wrap .btn-area .btn-secondary', '.modal-disclosure-notice'); //?⑤?吏???? 蹂????由?
//modalGroup('.js-modal-delivery', '.modal-delivery'); 						   //??? 二쇰Ц??린?????(???)
//modalGroup('.js-modal-delivery2', '.modal-delivery2'); 						   //??? 二쇰Ц??린?????(?????┝)
//modalGroup('.js-modal-login-guide', '.modal-login-guide'); 					   //??? 濡?렇?멸??대?
//modalGroup('.js-modal-device-failure', '.modal-device-failure');    		   //?⑤???? ?ㅽ?
//modalGroup('.js-modal-device-serial', '.modal-device-serial');      		   //?쇰?踰?? ???
//modalGroup('.js-modal-personal-failure', '.modal-personal-failure');		   //蹂몄??몄? ?ㅽ?
//modalGroup('.js-modal-agreement', '.modal-agreement'); 						   //?쎄? ???
//modalGroup('.js-modal-credit-personal', '.modal-credit-personal');  		   //???移대? 蹂몄??몄? ???
//modalGroup('.js-modal-check-required', '.modal-check-required');    		   //?????ぉ ???
//modalGroup('.js-modal-unused-info', '.modal-unused-info'); 					   //怨듦린怨? ??낫
//modalGroup('.js-modal-my-nonmembers', '.modal-my-nonmembers'); 				   //鍮???? 二쇰Ц議고?
//modalGroup('.js-modal-my-return', '.modal-my-return'); 						   //怨?? ???
//modalGroup('.js-modal-my-inform', '.modal-my-inform'); 						   //諛?????
//modalGroup('.js-modal-my-refund', '.modal-my-refund'); 						   //??????
//modalGroup('.product-internet-section .link-block', '.modal-internet-detail'); //internet,iptv detail

//modalGroup('.js-modal-repayment-fee', '.modal-repayment-fee');
//modalGroup('.sticky-detail .btn-text', '.modal-repayment-fee');  			   //遺????? ???猷? 議고???린
//modalGroup('.js-modal-process-detail1', '#_modalOrderDetail1');  			   //二쇰Ц???: 湲곌린蹂?寃?
//modalGroup('.js-modal-process-detail2', '#_modalOrderDetail2');  			   //二쇰Ц???: 踰???대?
//modalGroup('.js-modal-process-detail3', '#_modalOrderDetail3');  			   //二쇰Ц???: ???媛???
//modalGroup('.js-modal-phone-return', '.modal-phone-return');  			       //援щℓ????몄? > ?곕? ?? 諛??
//modalGroup('.js-modal-process-detail-used1', '#_modalOrderDetailUsed1');  	   //怨듦린怨?/以????: 二쇰Ц???: 湲곌린蹂?寃?
//modalGroup('.js-modal-process-detail-used2', '#_modalOrderDetailUsed2');  	   //怨듦린怨?/以????: 二쇰Ц???: 踰???대?
//modalGroup('.js-modal-process-detail-used3', '#_modalOrderDetailUsed3');  	   //怨듦린怨?/以????: 二쇰Ц???: ???媛???
//modalGroup('.js-modal-check-address', '.modal-check-address');  	   //怨듦린怨?/以????: IMEI,Wi-Fi MAC address ???諛⑸?
//modalGroup('.js-modal-pay', '.modal-pay'); 						 			   //寃곗???린
//modalGroup('.js-modal-penalty-noti', '.modal-penalty-noti');	 			   //?댁????湲? ???
//modalGroup('.js-modal-usim', '.modal-usim'); 					 			   //USIM移대? ?쇰?踰?????
//modalGroup('.js-modal-pay-acc', '.modal-pay-acc'); 				 			   //acc: 寃곗???린
//modalGroup('.js-modal-request-noti', '.modal-request-noti');        		   //acc: ??? ??┝ ??껌??린
//modalGroup('.js-modal-request-noti-complete', '.modal-request-noti-complete'); //acc: ??? ??┝ ??껌 ???
//modalGroup('.js-modal-process-detail-acc', '#_modalOrderDetailAcc');  		   //acc: 二쇰Ц???
//modalGroup('.js-modal-share', '.modal-share');  		   //湲고??????: 怨듭???린
//modalGroup('.js-modal-address', '.modal-address');  		   //二쇱?李얘린

/* ===============================================================
Library - Swiper
================================================================*/
/*var swiperHomeiot = new Swiper('.slider-homeiot .swiper-container', {
	pagination: '.pagination',
	loop: true,
	grabCursor: true,
	paginationClickable: true,
	//autoplay: 5000,
	//autoplayDisableOnInteraction: false,
	onFirstInit : function(swiper){
		if($('.slider-homeiot .swiper-container').parent().css('visibility') == 'hidden'){
			$('.slider-homeiot .swiper-container').parent().hide();
			$('.slider-homeiot .swiper-container').parent().css('visibility','visible');
			$('.slider-homeiot .swiper-container').parent().fadeIn();
			UI.componentBindingCallback.callback = function(param){console.log(param)}
			UI.componentBindingCallback.swiperInit(swiper);
		}
	},
	onSlideClick : function(swiper){
		if(UI.componentBindingCallback.isClick){
			var param = $(swiper.clickedSlide).find('[data-tos-click-params]').data('tos-click-params');
			UI.componentBindingCallback.excute(param);
			UI.componentBindingCallback.isClick = false;
		}
	}
});

$('.slider-homeiot .swiper-container').find('[data-tos-click-params]:not([data-tos-click-params=""])').click(function(){
	UI.componentBindingCallback.isClick = true;
});
swiperBtn('.slider-homeiot', swiperHomeiot);*/
var swiperHomeiot = UI.componentBindingEvent($('.iot-list-content'), function(param){/*console.log(param);*/});

/*var swiperAcc = new Swiper('.slider-acc .swiper-container', {
	pagination: '.pagination',
	loop: true,
	grabCursor: true,
	paginationClickable: true
});
swiperBtn('.slider-acc', swiperAcc);
*/
function swiperBtn($parent, $swiperName) {
    $($parent).find('.swiper-button-prev').on('click', function(){
        $swiperName.swipePrev();
    });

    $($parent).find('.swiper-button-next').on('click', function(){
        $swiperName.swipeNext();
    });
}





//?ㅼ??댄? ?????
//var html = '<div class="swiper-slide"><div class="ct"><a href="#none" class="btn-delete">???</a><span class="thumb"><img src="../img/@tmp_disclosure_01.jpg" alt="媛ㅻ??? ?명? 9"></span><span class="device-area"><span class="device"><em class="name">Galaxy 9</em></span></span></div></div>';
//?щ??대? ??굅
//swiperNoti.removeSlide(1);
//?щ??대? 異??
//swiperNoti.appendSlide(slides);
var swiperNoti = swiperNoti = new Swiper('.notice-panel .swiper-container', {
    slidesPerView: 6,
    loop: false
});

swiperBtn('.disclosure-notice-wrap', swiperNoti);

$('.disclosure-notice-wrap .notice-arrow').on('click', function() {
    $(this).parent().parent().toggleClass("active");
    /*if(!swiperNoti){
        swiperNoti = new Swiper('.notice-panel .swiper-container', {
            slidesPerView: 6,
            loop: false
        });
    }
    swiperBtn('.disclosure-notice-wrap', swiperNoti);*/
});

/*var swiperMainVisual = new Swiper('.home-visual-wrap .swiper-container', {
	pagination: '.pagination',
	loop: false,
	paginationClickable: true
});
swiperBtn('.home-visual-wrap', swiperMainVisual);*/

/*var swiperOfferingVisual = new Swiper('.home-offering-wrap .swiper-container', {
	pagination: '.pagination',
	loop: false,
	paginationClickable: true
});
swiperBtn('.home-offering-wrap', swiperOfferingVisual);*/

/*var swiperBrand = new Swiper('.home-brand-wrap .swiper-container', {
	pagination: '.pagination',
	loop: false,
	paginationClickable: true
});
swiperBtn('.home-brand-wrap', swiperBrand);*/








/* ===============================================================
Layout
================================================================*/
/*$('.header .gnb-btn-hamburger').on('click', function() {
	$('.gnb-drawer').toggle();
});

$('.header .gnb-drawer .btn-close').on('click', function() {
	$('.gnb-drawer').toggle();
});

$('.header .lnb .main-item.has-sub > .link-block').hover(
	function() {
		$(this).closest('.main-item.has-sub').addClass('active');
	}, function() {
		$(this).closest('.main-item.has-sub').removeClass('active');
	}
);*/


/* ===============================================================
//怨듭?吏????
================================================================*/
$('.notice-panel .btn-delete').on('click', function() {
    //$(this).parent().parent().hide();
    var index = $('.notice-panel .btn-delete').index($(this));
    swiperNoti.removeSlide(index);
});

/* ===============================================================
//??????
================================================================*/
$('.product-option-item #_payTypeRental').on('click', function() {
    $('#_layerPayTypeTrental').show();
    $('#_layerPayTypeSingle').hide();
    $('#_layerPayType').hide();
});

$('.product-option-item #_payType12,.product-option-item #_payType24,.product-option-item #_payType30').on('click', function() {
    $('#_layerPayTypeTrental').hide();
    $('#_layerPayType').show();
    $('#_layerPayTypeSingle').hide();
});

$('.product-option-item #_payTypeSingle').on('click', function() {
    $('#_layerPayTypeTrental').hide();
    $('#_layerPayType').hide();
    $('#_layerPayTypeSingle').show();
});

$('.product-option-item #_optDiscount1 + .label').on('click', function() {
    $('.product-option-item .discount-cont').hide();
    $('.product-option-item #_optDiscount1Cont').show();
});
$('.product-option-item #_optDiscount2 + .label').on('click', function() {
    $('.product-option-item .discount-cont').hide();
    $('.product-option-item #_optDiscount2Cont').show();
});
$('.product-option-item #_optDiscount3 + .label').on('click', function() {
    $('.product-option-item .discount-cont').hide();
    $('.product-option-item #_optDiscount3Cont').show();
});
$('.product-option-item #_optDiscount4 + .label').on('click', function() {
    $('.product-option-item .discount-cont').hide();
    $('.product-option-item #_optDiscount4Cont').show();
});

$('.product-detail-wrap .btn-more-product').on('click', function() {
    $('.product-detail-wrap .product-detail').removeClass('fewer');
    $(this).closest('.btn-more-area').hide();
});

$('.sticky-bar-detail .counsel-group .btn-light').on('click', function() {
    $('.sticky-bar-detail .counsel-layer').toggle();
});

/* ===============================================================
//tooltip
================================================================*/
/*$('.js-modal-tooltip').on('click', function() {
	$(this).siblings('.tooltip-ly').toggle();
});
$('.tooltip-ly .tooltip-close').on('click', function() {
	$(this).parent('.tooltip-ly').hide();
});*/


/* ===============================================================
//my 援щℓ??린
================================================================*/
$('.my-review-list-wrap .btn-more').on('click', function () {
    $(this).parent().parent().toggleClass('active')
});

//my 援щℓ??린 ???
$('.modal-sub-tit .star').on('click', function(){
    var star= $(this).find('em').html();
    $('.modal-sub-tit .rating-point').removeClass().addClass('rating-point')
    $('.modal-sub-tit .rating-point').addClass('point'+star).find('em').html(star)
});



/* ===============================================================
//?????/以??/?댁?吏?뎄?? 媛?? 議고?
================================================================*/
//##NOTUSE .unused-cont ???
$(".unused-cont .btn-default").on("click", function(){
    $(this).parent().find(".list-layer").toggleClass("active");
});

/*var tabWrapper = $('.tab-sub-wrap'),
	tabMnu = tabWrapper.find('.tab-sub li'),
	tabContent = tabWrapper.find('.tab-area > .tab-con');

tabContent.not(':first-child').hide();

tabMnu.each(function(i){
	$(this).attr('data-tab','tab'+i);
});
tabContent.each(function(i){
	$(this).attr('data-tab','tab'+i);
});

tabMnu.click(function(){
	var tabData = $(this).data('tab');
	tabWrapper.find(tabContent).hide();
	tabWrapper.find(tabContent).filter('[data-tab='+tabData+']').show();
});*/

/*$('.tab-sub > li').click(function(){
	var before = $('.tab-sub li.on');
	before.removeClass('on');
	$(this).addClass('on');

	$(before).click(function(){
		var txt = $(this).find("a").text(),
			tgArea = $(this).parent().next();
		tgArea.text(txt);
	});
});*/

function tabGroup($tabList, $tabItem, $active) {
    $($tabList).find($tabItem).on('click', function () {
        var index = $($tabItem).index(this);
        if ($(this).is('[type=button]') && index != 2) {
            if ($(this).siblings().hasClass($active)) {
                $(this).addClass($active).siblings().removeClass($active);
            }

            $(this).attr('aria-selected', true).siblings().attr('aria-selected', false);

            var $tabPanel 	= $(this).attr('aria-controls');
            var $tabPanelOn = $("#" + $tabPanel);
            $(this).parents($tabList).parents('.h-area').nextAll('[role=tabpanel]').attr('aria-hidden', true);
            $tabPanelOn.attr('aria-hidden', false);
        }else{
            UI.modal({modal: '#modalAlert', title: '??┝', content: '?대??? 援щℓ瑜? ?????? 踰?? 怨???????? ?????? 二쇰Ц?? ?댁??????. (援????? 1599-0224)',buttonType:'alert'});
            return false;
        }
    });
}
tabGroup('.h-area .fluid-types', '[class^=c-]', 'checked');

//二쇰Ц????? > ?ㅽ??? ?듯?泥?뎄 ?щ? ???
function btnFold($btn, $parent, $unfoldItem) {
    $($btn).on('click', function () {
        var $item = $(this).closest($parent).find($unfoldItem);

        if (!$(this).closest('.c-chk').hasClass('checked')) {
            $item.show();
        } else {
            $item.hide();
        }
    });
}
btnFold('.section-bill .c-chk input:checkbox', 'td', '.expand-panel');

/* 援щℓ????몄? ?ㅽ?濡? ?? & ?ㅼ??? sticky
var sidebar = document.getElementById('_purchaseAside');

var stickySidebar = new StickySidebar(sidebar, {
	topSpacing: 20,
	bottomSpacing: 0,
	containerSelector: '.purchase-wrap .l-grid',
	innerWrapperSelector: '.purchase-spot .aside-wrap',
	resizeSensor: false,
	stickyClass: 'sticky-on'
});
*/
function foldTitGroup($btn, $parentEl, $foldTit, $foldCon) {
    if($($parentEl).hasClass('not-accordion')){
        $($parentEl).find($foldTit).addClass('active').next($foldCon).show();
    }
    $($btn).on('click', function () {
        var $parentCur = $(this).parents($parentEl);
        var $toggledItem = $(this).closest($foldTit);

        if ($parentCur.length) {
            if($($parentEl).hasClass('popup-imei') || $($parentEl).hasClass('toggle-accordion')){
                $toggledItem.siblings().removeClass('active').next($foldCon).hide();
                $toggledItem.toggleClass('active').next($foldCon).toggle();
            }else{
                if(!$($parentEl).hasClass('not-accordion')){
                    $($foldTit).removeClass('active').next($foldCon).hide();
                }
                $toggledItem.toggleClass('active').next($foldCon).toggle();
            }

        }
    });
}
foldTitGroup('.btn-trigger', '#_modalOrderDetail1', '.h-area', '.cont-area');
foldTitGroup('.btn-trigger', '#_modalOrderDetail2', '.h-area', '.cont-area');
foldTitGroup('.btn-trigger', '#_modalOrderDetail3', '.h-area', '.cont-area');
foldTitGroup('.btn-trigger', '#_modalOrderDetailAcc', '.h-area', '.cont-area');
foldTitGroup('.btn-trigger', '#_modalOrderDetailUsed1', '.h-area', '.cont-area');
foldTitGroup('.btn-trigger', '#_modalOrderDetailUsed2', '.h-area', '.cont-area');
foldTitGroup('.btn-trigger', '#_modalOrderDetailUsed3', '.h-area', '.cont-area');
foldTitGroup('.btn-trigger', '.popup-insurance-join', '.h-area', '.cont-area');

if ($('.popup-imei').length) { foldTitGroup('.btn-trigger', '.popup-imei', '.fold-tit', '.fold-con');}
if ($('.popup-optional-service').length) { foldTitGroup('.btn-trigger', '.popup-optional-service', '.fold-tit', '.fold-con');}
foldTitGroup('.btn-toggle', '.popup-tgift', '.s-checkpoint-wrap', '.s-checkpoint-cont');

//?????/以??/?댁?吏?뎄?? 媛?? > 紐⑤?紐? ?????? ????? ?????
$('.used-wrap .c-input-outline').next('.list-layer').prev('.c-input-outline').find('input').keyup(function(){
    //console.log($(this).val());
    if($(this).val() == '' || $(this).val() == null){
        $(this).parent('span').next('.list-layer').hide();
        $(this).parents('.form-inner').next('button').addClass('disabled');
        $(this).parents('.form-inner').next('button').prop('disabled',true);
    }else{
        $(this).parent('span').next('.list-layer').show();
        $(this).parents('.form-inner').next('button').removeClass('disabled');
        $(this).parents('.form-inner').next('button').prop('disabled',false);
    }
}).focus(function(){
    if($(this).val() == '' || $(this).val() == null){
        $(this).parents('.form-inner').next('button').addClass('disabled');
        $(this).parents('.form-inner').next('button').prop('disabled',true);
    }else{
        $(this).parent('span').next('.list-layer').show();
        $(this).parents('.form-inner').next('button').removeClass('disabled');
        $(this).parents('.form-inner').next('button').prop('disabled',false);
    }
}).blur(function(){
    var _this = this;
    setTimeout(function(){$(_this).parent('span').next('.list-layer').hide();},100);
    if($(this).val() == '' || $(this).val() == null){
        $(this).parents('.form-inner').next('button').addClass('disabled');
        $(this).parents('.form-inner').next('button').prop('disabled',true);
    }else{
        $(this).parents('.form-inner').next('button').removeClass('disabled');
        $(this).parents('.form-inner').next('button').prop('disabled',false);
    }
});

$('.used-wrap .c-input-outline').next('.list-layer').find('.list-item a').on('click',function(){
    $(this).parents('.list-layer').prev('.c-input-outline').find('input').val($(this).text());
});

$('.used-wrap .c-input-outline input').keyup(function(){
    if($(this).val() == '' || $(this).val() == null){
        $(this).parent('span').next('button').addClass('disabled');
        $(this).parent('span').next('button').prop('disabled',true);
    }else{
        $(this).parent('span').next('button').removeClass('disabled');
        $(this).parent('span').next('button').prop('disabled',false);
    }
}).focus(function(){
    if($(this).val() == '' || $(this).val() == null){
        $(this).parent('span').next('button').addClass('disabled');
        $(this).parent('span').next('button').prop('disabled',true);
    }else{
        $(this).parent('span').next('button').removeClass('disabled');
        $(this).parent('span').next('button').prop('disabled',false);
    }
}).blur(function(){
    if($(this).val() == '' || $(this).val() == null){
        $(this).parent('span').next('button').addClass('disabled');
        $(this).parents('.form-inner').next('button').prop('disabled',true);
    }else{
        $(this).parent('span').next('button').removeClass('disabled');
        $(this).parent('span').next('button').prop('disabled',false);
    }
});

/*function popMd(url, name) {
	popupWindow = window.open(url, name,'width=700, height=600, scrollbars=yes, resizable=no, toolbar=no');
}

function popSm(url, name) {
	popupWindow = window.open(url, name,'width=480, height=436, scrollbars=yes, resizable=no, toolbar=no');
}*/

//?곕? ?? 諛??
if ($('.popup-phone-return').length) {
    $('.return-request .c-rdo:eq(0)').on('click', function(){
        $('.rating-check').show();
    });

    $('.return-request .c-rdo:eq(1)').on('click', function(){
        $('.rating-check').hide();
    });

    $('#_qTab1').closest('.c-rdo').on('click', function(){
        $('#_qPanel1').show();
        $('#_qPanel2').hide();
    });

    $('#_qTab2').closest('.c-rdo').on('click', function(){
        $('#_qPanel1').hide();
        $('#_qPanel2').show();
    });

    $('.rating-check .btn-area .btn-primary').on('click', function(){
        $('.rating-check .btn-area').hide();
        $('.rating-check .result-area').show();
    });
}

//留ㅼ?寃???
$('.search-result-wrap .btn-trigger').on('click', function() {
    $(this).closest('.h-area').toggleClass('active');
    $(this).closest('.h-area').next('.cont-area').toggle();
});

$('.search-filter-area .auto-complete').prevAll('div.c-input-outline').find('input').keyup(function(){
    if($(this).val() == '' || $(this).val() == null){
        $(this).parents('.search-filter-area').removeClass('active');
    }else{
        $(this).parents('.search-filter-area').addClass('active');
    }
}).focus(function(){
    if($(this).val() == '' || $(this).val() == null){
        $(this).parents('.search-filter-area').removeClass('active');
    }else{
        $(this).parents('.search-filter-area').addClass('active');
    }
}).blur(function(){
    var _this = this;
    setTimeout(function(){$(_this).parents('.search-filter-area').removeClass('active');},100);
    if($(this).val() == '' || $(this).val() == null){
        $(this).parents('.search-filter-area').removeClass('active');
    }else{
        $(this).parents('.search-filter-area').addClass('active');
    }
});

$('.search-filter-area .auto-complete li.result-item a').on('click',function(){
    $(this).parents('.search-filter-area').find('.c-input-outline input').val($(this).text());
});


//????????
$('.add-service .form-group > .c-rdo').each(function(){
    var radioNum = $(this).index();
    $(this).find('>input').click(function(){
        $(this).parent().parent().find('.tab-radio-con').removeClass('active').eq(radioNum).addClass('active');
    });
});

$('.charge-area > .c-rdo').click(function(){
    $(this).parent().parent().addClass('active').siblings('li').removeClass('active');
});

$('.popup-phone-charge .service-detail-wrap .btn-trigger').on('click', function() {
    $(this).closest('.service-detail-wrap').toggleClass('active');
});

$('.phone-charge-type li').click(function(){
    $(this).toggleClass('on');
    $(this).siblings('li').removeClass('on');
    var text = $(this).children('a').text();
    if(!$(this).hasClass('on') && text == '#??━誘몄?' ){
        text = 'ALL'
    };
    //console.log(text);
    $(this).parent('ul').next('h3.phone-charge-type').text(text);
});

//ui-components sample
$('.ui-font-test h3').on('click', function(){
    $(this).parents('.ui-font-test').toggleClass('active');
});

/* ===============================================================
//?고?踰?? 議고? ?????? input ????? ????? 寃???? ??? 踰?? UI
================================================================*/
if($('.c-input-outline input').val()) {
    $('.c-input-outline .btn-delete').show();
}

$('.c-input-outline input').on('input', function () {
    $('.c-input-outline .btn-delete').toggle(!!this.value);
});

$('.c-input-outline .btn-delete').on('touchstart click', function() {
    $('.c-input-outline input').val('').trigger('input');
});

//?닿?怨?Ⅸ 蹂댁??⑦?吏?
$('.filter-item').on('click', function () {
    if ($(this).siblings().hasClass('active')) {
        $(this).addClass('active').siblings().removeClass('active');
    }
});