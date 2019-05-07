function FirebaseChat(){ //FirebaseChat ES5 클래스
    this.init();
    this.initEvent();
}
FirebaseChat.prototype = {
    init:function(){ // 초기 필드 변수 할당
        this.auth = firebase.auth();
        this.liGoogleBtn = document.getElementById('liGoogleBtn');
    },
    initEvent:function() { //초기 이벤트 바인딩
        this.liGoogleBtn.addEventListener('click', this.onGoogleBtnClick.bind(this));
        this.auth.onAuthStateChanged(this.onAuthChange.bind(this));
    },
    onGoogleBtnClick : function() { // Google 로그인 버튼 클릭
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        this.auth.signInWithPopup(googleProvider).then(function (result) {
            console.log('로그인 성공')
        }).catch(function (error) {
            alert('로그인에 실패하였습니다');
            console.error('구글 로그인 과정 에러', error);
        });
    },
    onAuthChange : function(user) { //인증 정보가 변화 되었을 시에 변화
        if (user) {
            console.log('user로그인 : ', JSON.stringify(user));
        } else {
            console.log('로그아웃');
        }
    }
};
