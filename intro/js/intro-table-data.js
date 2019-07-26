const colOption1 = [
    {key:'num', headline:'Num', width:'40px'},
    {key:'file', headline:'파일',width:'auto'},
    {key:'etc', headline:'비고',width:'150px'}
];
const rowData1 = [
    {'file':'Twd 기획전 템플릿 가이드', 'url':'http://150.24.218.42:8080/temp', 'target':'_blank', 'etc':'·'},
    {'file':'Css 공통 가이드', 'url':'http://150.24.218.42:8080/css', 'target':'_blank', 'etc':'·'},
    {'file':'반응형 컴퍼넌트 가이드', 'url':'http://150.24.218.42:8080/resp', 'target':'_blank', 'etc':'·'},
    {'file':'스와이퍼 돔컨트롤 사용 가이드', 'url':'http://150.24.218.42:8080/swiper', 'target':'_blank', 'etc':'·'},
    {'file':'Twd 운영 가이드', 'url':'http://150.24.218.42:8080/twd', 'target':'_blank', 'etc':'·'},
    {'file':'가이드1', 'url':'http://150.24.218.42:8080/guide', 'target':'_blank', 'etc':'·'},
    {'file':'아웃룩', 'url':'http://150.24.218.42:8080/out', 'target':'_blank', 'etc':'·'},
    {'file':'주작 톡', 'url':'http://150.24.218.42:8080/talk', 'target':'_blank', 'etc':'·'},
    {'file':'Flex 가이드', 'url':'http://150.24.218.42:8080/flex', 'target':'_blank', 'etc':'·'},
    {'file':'이미지 포지션 값 추출기', 'url':'http://150.24.218.42:8080/img', 'target':'_blank', 'etc':'·'},
    {'file':'Console Error 정리', 'url':'http://150.24.218.42:8080/error', 'target':'_blank', 'etc':'·'},
];

const rowTableColOption = [
    {key:'ths', width:'150px', align:'center', valign:'middle'},
    {key:'content',width:'auto', align:'left',valign:'top'},
];
const rowData2 = [
    {'ths':'필수', 'content':'이미지(그림, 사진, 로고, 차트, 다이어그램, 배경처리된 이미지, 동적으로 제공하는 이미지, 플래시의 Name값 등)에 적절한 대체 텍스트를 제공하는가?'},
    {'ths':'-', 'content': 'table에 caption이 적절하게 선언되었는가?'},
    {'ths':'-', 'content':'thead,tbody,tfoot으로 그룹핑 되어 있는가? (th로 그룹핑 안될경우 thead생략가능, tbody만 있을 경우 tbody생략 가능)'},
    {'ths':'-', 'content':'표의 머릿글은 th로 마크업 했으며 scope 속성을 제공하는가?'},
    {'ths':'-', 'content':'콘텐츠가 논리적인 순서로 되어 있는가?'},
    {'ths':'-', 'content':'HTML 코드에 주언어 관련 속성(lang)이 선언되어 있는가?'},
    {'ths':'필수', 'content':'포커스가 논리적인 순서로 이동하는가?'},
    {'ths':'필수', 'content':'포커스를 시각적으로 구별할 수 있는가?'},
    {'ths':'-', 'content':'프레임이 사용될 때 프레임의 제목이 title 속성 값에 제대로 반영이 되었는가?'},
    {'ths':'-', 'content':'주요 콘텐츠 블록의 제목을 h1~h6 로 마크업했는가?'},
    {'ths':'-', 'content':'링크 텍스트가 단독으로 사용될 때도 정확한 의미 파악이 가능한가?'},
    {'ths':'-', 'content':'폼 콘트롤 요소에는 적절한 label을 제공하며, 폼 콘트롤 요소의 id값과 label의 for값을 동일하게 제공하는가?'},
];

const rowData3 = [
    {'ths':'필수', 'content':'[권고] 이미지(그림, 사진, 로고, 차트, 다이어그램, 배경처리된 이미지, 동적으로 제공하는 이미지, 플래시의 Name값 등)를 제공하는 서비스의 운영 어드민에 대체 텍스트 입력을 위한 입력필드가 마련되어 있는가?'},
    {'ths':'필수', 'content':'정보전달을 위한 영상 및 음성 정보에 텍스트(자막, 원고) 또는 수화를 제공하는가?'},
    {'ths':'필수', 'content':'캡차 사용 시, 이미지 캡차 이외에도 다른 대체 수단(음성,이메일,OTP인증 등)을 제공하는가?'},
    {'ths':'-', 'content':'색상, 크기, 방향, 위치, 음향효과 만으로 정보를 전달하고 있는 콘텐츠는 없는가?'},
    {'ths':'-', 'content':'W3C Validation을 통과하는가?'},
    {'ths':'-', 'content':'3초이상 자동으로 재생되는 음성을 제공할 경우, 사전에 제어가 가능한가?'},
    {'ths':'-', 'content':'서비스 특성상 시간 제한이 있는 경우, 시간 제한이 있는 콘텐츠임을 사전에 공지하고 있으며 남은 시간에 대해 알려주고 있는가?'},
    {'ths':'-', 'content':'자동으로 갱신되는 콘텐츠를 제어할 수 있거나 전체 내용을 모두 확인할 수 있는가?'},
    {'ths':'-', 'content':'1초에 3회 이상 깜박거리는 콘텐츠를 제공하지는 않는가?'},
    {'ths':'필수', 'content':'특정 장치에 의존적이거나 복잡한 누르기 동작은 단순한 키 조작 또는 터치로도 가능한가?'},
    {'ths':'-', 'content':'웹페이지의 제목이 웹브라우저의 제목으로 사용되었는가?'},
    {'ths':'-', 'content':'반복되는 콘텐츠(메뉴 등)가 있을 경우 이를 건너뛸 수 있는 링크를 제공하며, 키보드로도 접근이 가능한가?'},
    {'ths':'-', 'content':'사용자가 의도하지 않은 기능(초점 변화, 서식 전송, 새 창, 팝업, 레이어)이 실행된 곳은 없는가?'},
];

const rowData4 = [
    {'ths':'-', 'content':'프레임이 사용될 때 프레임의 제목이 title 속성 값에 제대로 반영이 되었는가?'},
    {'ths':'-', 'content':'사용자 입력 오류가 발생했을 시, 사용자에게 알려주고 수정이 필요한 곳에 포커스가 이동하는가?'},
];


