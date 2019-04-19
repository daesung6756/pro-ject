function validate() {
    var re = /^[a-zA-Z0-9]{4,12}$/ // 아이디와 패스워드가 적합한지 검사할 정규식
    var re2 = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    // 이메일이 적합한지 검사할 정규식

    var id = document.getElementById("id");
    var pw = document.getElementById("pw");
    var email = document.getElementById("email");
    var num1 = document.getElementById("num1");
    var num2 = document.getElementById("num2");

    var arrNum1 = new Array(); // 주민번호 앞자리숫자 6개를 담을 배열
    var arrNum2 = new Array(); // 주민번호 뒷자리숫자 7개를 담을 배열

    // ------------ 이메일 까지 -----------

    if(!check(re,id,"아이디는 4~12자의 영문 대소문자와 숫자로만 입력")) {
        return false;
    }

    if(!check(re,pw,"패스워드는 4~12자의 영문 대소문자와 숫자로만 입력")) {
        return false;
    }

    if(join.pw.value != join.checkpw.value) {
        alert("비밀번호가 다릅니다. 다시 확인해 주세요.");
        join.checkpw.value = "";
        join.checkpw.focus();
        return false;
    }

    if(email.value=="") {
        alert("이메일을 입력해 주세요");
        email.focus();
        return false;
    }

    if(!check(re2, email, "적합하지 않은 이메일 형식입니다.")) {
        return false;
    }

    if(join.name.value=="") {
        alert("이름을 입력해 주세요");
        join.name.focus();
        return false;
    }

    // -------------- 주민번호 -------------

    for (var i=0; i<num1.value.length; i++) {
        arrNum1[i] = num1.value.charAt(i);
    } // 주민번호 앞자리를 배열에 순서대로 담는다.

    for (var i=0; i<num2.value.length; i++) {
        arrNum2[i] = num2.value.charAt(i);
    } // 주민번호 뒷자리를 배열에 순서대로 담는다.

    var tempSum=0;

    for (var i=0; i<num1.value.length; i++) {
        tempSum += arrNum1[i] * (2+i);
    } // 주민번호 검사방법을 적용하여 앞 번호를 모두 계산하여 더함

    for (var i=0; i<num2.value.length-1; i++) {
        if(i>=2) {
            tempSum += arrNum2[i] * i;
        }
        else {
            tempSum += arrNum2[i] * (8+i);
        }
    } // 같은방식으로 앞 번호 계산한것의 합에 뒷번호 계산한것을 모두 더함

    if((11-(tempSum%11))%10!=arrNum2[6]) {
        alert("올바른 주민번호가 아닙니다.");
        num1.value = "";
        num2.value = "";
        num1.focus();
        return false;
    }else{
        // ------------ 생일 자동 등록 -----------
        if(arrNum2[0]==1 || arrNum2[0]==2) {
            var y = parseInt(num1.value.substring(0,2));
            var m = parseInt(num1.value.substring(2,4));
            var d = parseInt(num1.value.substring(4,6));
            join.years.value = 1900 + y;
            join.month.value = m;
            join.day.value = d;
        }
        else if(arrNum2[0]==3 || arrNum2[0]==4) {
            var y = parseInt(num1.value.substring(0,2));
            var m = parseInt(num1.value.substring(2,4));
            var d = parseInt(num1.value.substring(4,6));
            join.years.value == 2000 + y;
            join.month.value = m;
            join.day.value = d;
        }
    }

    // 관심분야, 자기소개 미입력시 하라는 메시지 출력
    if(join.inter[0].checked==false &&
        join.inter[1].checked==false &&
        join.inter[2].checked==false &&
        join.inter[3].checked==false &&
        join.inter[4].checked==false) {
        alert("관심분야를 골라주세요");
        return false;
    }

    if(join.self.value=="") {
        alert("자기소개를 적어주세요");
        join.self.focus();
        return false;
    }

    alert("회원가입이 완료되었습니다.");
}
function check(re, what, message) {
    if(re.test(what.value)) {
        return true;
    }
    alert(message);
    what.value = "";
    what.focus();
    //return false;
}
function openSideNav(e) {
    e.preventDefault();
    var nav = document.querySelector('.side-nav');
    var div = document.createElement('div');
    var body = document.getElementsByTagName('body')[0];
    var dim = document.querySelector('.dimmed');
    div.classList.add('dimmed');
    body.appendChild(div);
    nav.classList.add('is-show');
}
function closeSideNav(e) {
    e.preventDefault();
    var nav = document.querySelector('.side-nav');
    var dim = document.querySelector('.dimmed');
    nav.classList.remove('is-show');
    dim.parentNode.removeChild(dim);
}
function openSubNav(e) {
    e.preventDefault();
    var nav = document.querySelector('.sub-nav');
    nav.classList.add('is-show');
}
function closeSubNav(e) {
    e.preventDefault();
    var nav = document.querySelector('.sub-nav');
    nav.classList.remove('is-show');
}
function scrollStartChexk (e){
    e.preventDefault();
    var notice = this.querySelector('.scroll-notice');
    notice.classList.add('is-hide');
}
function Tabs (el) {
    this.el = document.querySelector(el);

    this.init();
}
Tabs.prototype = {
    init : function () {
        this.naviControl();
    },
    naviControl : function () {
        var navi = this.el.querySelector('.tab-navi').querySelectorAll('a');
        var container = this.el.querySelector('.tab-container');
        var contents = container.querySelectorAll('.tab-content');

        for (var i = 0; i < navi.length ; i++) {
            (function(i){
                navi[i].addEventListener('click', function(e){
                    var windowW = window.innerWidth;
                    var btnHeight = this.parentNode.offsetHeight;
                    var parent = this.parentNode.parentNode;
                    var parents = this.parentNode.parentNode.parentNode;
                    var thisTarget = this.parentNode;
                    e.preventDefault();
                    if(parents.classList.contains('scroll-vertical') && (windowW < 767)){
                        parents.scrollTop = i * btnHeight
                    }
                    parent.querySelector('.is-active').classList.remove('is-active');
                    thisTarget.classList.add('is-active');
                    container.querySelector('.is-show').classList.remove('is-show');
                    contents[i].classList.add('is-show');
                }, false);
            })(i);
        }
    },
};
//다음 주소찾기 api
function sample4_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 도로명 조합형 주소 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }
            // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
            if(fullRoadAddr !== ''){
                fullRoadAddr += extraRoadAddr;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample4_postcode').value = data.zonecode; //5자리 새우편번호 사용
            document.getElementById('sample4_roadAddress').value = fullRoadAddr;
            document.getElementById('sample4_jibunAddress').value = data.jibunAddress;

            // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
            if(data.autoRoadAddress) {
                //예상되는 도로명 주소에 조합형 주소를 추가한다.
                var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                document.getElementById('guide').innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';

            } else if(data.autoJibunAddress) {
                var expJibunAddr = data.autoJibunAddress;
                document.getElementById('guide').innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';

            } else {
                document.getElementById('guide').innerHTML = '';
            }
        }
    }).open();
}

function frontInit () {
   var tabs1 = new Tabs('.test1');
   var tabs2 = new Tabs('.test2');
}

window.onload = function() {
    frontInit();
    var oSideBtn = document.querySelector('.open-side-nav-btn');
    var cSideBtn = document.querySelector('.close-side-nav-btn');
    var oSubNav = document.querySelector('.open-sub-nav-btn');
    var cSubNav = document.querySelector('.close-sub-nav-btn');
    var colTable =  document.querySelector('.col-table-group');
    var tabVertical = document.querySelector('.scroll-vertical');
    oSideBtn.addEventListener('click', openSideNav);
    cSideBtn.addEventListener('click', closeSideNav);
    oSubNav.addEventListener('click', openSubNav);
    cSubNav.addEventListener('click', closeSubNav);
    colTable.addEventListener('scroll', scrollStartChexk);
    tabVertical.addEventListener('scroll', scrollStartChexk);
};