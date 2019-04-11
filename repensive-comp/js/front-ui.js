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
    dim.remove();
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
    var notice = document.querySelector('.scroll-notice');
    notice.classList.add('is-hide');
}
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

window.onload = function() {
    var oSideBtn = document.querySelector('.open-side-nav-btn');
    var cSideBtn = document.querySelector('.close-side-nav-btn');
    var oSubNav = document.querySelector('.open-sub-nav-btn');
    var cSubNav = document.querySelector('.close-sub-nav-btn');
    var colTable =  document.querySelector('.col-table-group');
    oSideBtn.addEventListener('click', openSideNav);
    cSideBtn.addEventListener('click', closeSideNav);
    oSubNav.addEventListener('click', openSubNav);
    cSubNav.addEventListener('click', closeSubNav);
    colTable.addEventListener('scroll', scrollStartChexk)
};