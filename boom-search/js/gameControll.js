var boomSearch = {
    init: function() {
        this.drawBoomMap();
        this.maxLengthInput();
    },
    drawBoomMap: function() {
        var makeGame = false;
        var games = false;
        var tbody = document.querySelector('.draw-inner table tbody');
        var boomTableSet = [];
        var countNumber = 100;

        document.querySelector("#optionInputBtn").addEventListener('click', function(){

            if(makeGame === false || games === false) {
                var tableRow = parseInt(document.querySelector("#tableRow").value);
                var tableCol = parseInt(document.querySelector("#tableCol").value);
                var boomNum = parseInt(document.querySelector("#boomNum").value);
                var sum = tableRow * tableCol;

                if( !isNaN(tableRow) && !isNaN(tableCol) && !isNaN(boomNum)) {
                    document.querySelector('.draw-table').classList.add('is-show');

                    // 시간 카운트
                    var countTimer = setInterval(function(){
                        countNumber -= 1;
                        document.querySelector('#gameTimer').textContent = countNumber;
                        if(countNumber === 0 ){
                            clearInterval(countTimer);
                        }
                    }, 1000);

                    makeGame = true;
                    games = true; //

                    // 지뢰 배열 생성 중요.
                    var rendomNumberArray = Array(sum)
                        .fill()
                        .map(function (value, index) {
                            return index;
                        });

                    // 지뢰 숫자 만큼 랜덤 숫자 뽑기
                    var getNumberArray = [];
                    while (rendomNumberArray.length > parseInt(sum - boomNum)) {
                        var moveNumber = rendomNumberArray.splice(Math.floor(Math.random() * rendomNumberArray.length), 1)[0];
                        getNumberArray.push(moveNumber);
                    }

                    // 지뢰 테이블 만듣기
                    for (var i = 0; i < tableCol; i += 1) {
                        var arr = [];
                        var tr = document.createElement('tr');
                        boomTableSet.push(arr);
                        for (var j = 0; j < tableRow; j += 1) {
                            arr.push(1);
                            var td = document.createElement('td');
                            var button =  document.createElement("button");
                            tr.appendChild(td);
                            td.appendChild(button);
                            button.addEventListener('click', function(){
                                if(this.nextSibling !== null){
                                    console.log(td);
                                    document.querySelector('span.count').classList.add('is-end');
                                    clearInterval(countTimer);
                                    games = false;
                                    boomTableSet = [];
                                    alert("게임이 종료 되었습니다.");
                                    return false;
                                }
                            },false );
                        }
                        tbody.appendChild(tr);
                    }

                    for (var k = 0; k < getNumberArray.length; k++) {
                        var col = Math.floor(getNumberArray[k] / 10);
                        var row = getNumberArray[k] % 10;
                        var boom = document.createElement("span");
                        tbody.children[col].children[row].appendChild(boom).textContent = 'x';
                        boomTableSet[col][row] = 'X';
                    }

                } else {
                    alert("값을 입력 해주세요.");
                    return false;
                }

            } else {
                alert("이미 게임이 생성 되었습니다.");
                return false;
            }

        }, false);
    },
    maxLengthInput : function() {
        var inputs = document.querySelectorAll("input[type='number']");

        var inputNumberGroup = [];
        for (var i=0; i < inputs.length; i++) {
            inputNumberGroup.push(inputs[i].getAttribute('id'));
        }

        for (var j=0; j < inputNumberGroup.length; j++){
            var input = document.getElementById(inputNumberGroup[j]);
            input.addEventListener('keyup', function(){
                var _this = this;
                if(_this.value.length > _this.maxLength){
                    _this.value = _this.value.slice(0, _this.maxLength);
                }
            })
        }
    }

};

boomSearch.init();