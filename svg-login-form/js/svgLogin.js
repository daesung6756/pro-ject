var svgLogin = {
    init: function() {
        this.controller();
    },
    controller : function(){
        var coins = 0;
        var span = document.querySelector('#coins');
        var reset =  document.querySelector('#coinReset');
        var selectProducts = document.querySelector("#selectProducts");
        var productsLists = document.querySelectorAll('.products-list li');
        var output = document.querySelector("#output");
        var pocketCoin = document.querySelectorAll('.money');
        var productsArray = [];
        var prices = [];

        for (var i=0; i < productsLists.length; i++){
           var productClass = productsLists[i].classList.add('product' + i);
            productsArray.push(productsLists[i].getAttribute('class'));
        }
        
        // 음료 버튼 클릭 이벤트
        for (var j=0; j < productsArray.length ; j ++){
            var productButton =  document.querySelector('.'+ productsArray[j]).querySelector('button');
            var price = productButton.value;
            var buttonText = productButton.innerText;

            prices.push(price);

            productButton.addEventListener('click', function(){
                selectProducts.innerText = this.innerText + " : " + this.value + '원';
                if(coins !== 0 && coins >= this.value ){
                    selectProducts.innerText = this.innerText + " : " + this.value + '원';
                    coins -= this.value;
                    span.innerHTML = "잔액 : " + coins + '원';
                    output.innerHTML ="<span class='cup is-show'><img src='images/paper-cup.png' alt=''></span>";
                } else if (coins === 0){
                    span.innerHTML = "잔액 : " + coins + '원';
                    return false;
                } else {
                    span.innerHTML = "잔액 : " + coins + '원';
                    alert ("잔액이 부족합니다.");
                    return false;
                }
            }, false);

        }
        
        //동전 반환 버튼
        reset.addEventListener('click', function(){
            if (coins !== 0){
                reset.style.transform = "rotate(10deg)";
                setTimeout(function(){
                    reset.style.transform = "rotate(-5deg)";
                },300);
                coins = parseInt(0);
                span.innerHTML = "잔액 : " + coins + '원';
            } else {
                alert("잔액이 없습니다.");
                return false;
            }
        }, false);
        
        //동전 클릭으로 입력
        for (var d = 0 ; d < pocketCoin.length ; d++){
            pocketCoin[d].addEventListener('click', function(e){
                coins += parseInt(this.getAttribute('value'));
                span.innerHTML = "잔액 : " + coins + '원';
            });
        }
    },
};

svgLogin.init();