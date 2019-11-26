
// 그래프 데이터
function graphData (){
    return {
        graph1:[
            {
                x: graph1x,
                y: graph1y[0],
                name: '기변',
                type: 'bar',
                text:graph1text[0],
                textposition:'inside'
            },
            {
                x: graph1x,
                y: graph1y[1],
                name: '번호이동',
                type: 'bar',
                text:graph1text[1],
                textposition:'inside'
            },
            {
                x: graph1x,
                y: graph1y[2],
                name: '신규',
                type: 'bar',
                text:graph1text[2],
                textposition:'inside'
            },
            {
                x: graph1x,
                y: graph1y[3],
                type: 'scatter',
                name: '추세',
                line:{
                    dash:'dot',
                    color:'#000',
                    width: 1
                },
                mode:'lines'
            }
        ],
        graph2: [{
            values: graph2val,
            labels: graph2label,
            hole: .65,
            rotation:'200',
            type: 'pie',
            textinfo: 'label',
            hoverinfo:'label',
            sort:false,
            textposition:'outside',
            textfont:{
                size:'10'
            }
        }],
        graph2table:[{
            type: 'table',
            header:{
                values:[ ['<b>제조사</b>'], ['<b>판매량</b>'],['<b>비율(%)</b>'] ],
                align: "center",
                line: {width: 1, color: 'white'},
                fill: {color: "rgb(243, 83, 47)"},
                font: {family: "Arial", size: 14, color: "white"},
                height:'30'
            },
            cells: {
                values: [
                    graph2label,
                    ['155건', '38건', '27건', '17건'],
                    graph2val,
                ],
                align: "center",
                line: {color: "white", width: 1},
                font: {family: "Arial", size: 12, color: ["black"]},
                fill: {
                    color: 'rgb(242, 242, 242)'
                },
                height: '30',
            }
        }],
        graph3: [{
            values: graph3val,
            labels: graph3label,
            hole: .65,
            type: 'pie',
            rotation:'40',
            textinfo: 'label',
            hoverinfo:'label',
            sort:false,
            textposition:'outside',
            textfont:{
                size:'10'
            }
        }],
        graph3table:[{
            type: 'table',
            header:{
                values:[ ['<b>제조사</b>'], ['<b>판매량</b>'],['<b>비율(%)</b>'] ],
                align: "center",
                line: {width: 1, color: 'white'},
                fill: {color: "rgb(243, 83, 47)"},
                font: {family: "Arial", size: 14, color: "white"},
                height:'30'
            },
            cells:{
                values:[
                    graph3label,
                    ['41건', '39건', '38건', '33건','29건','52건'],
                    graph3val
                ],
                align: "center",
                line: {color: "white", width: 1},
                font: {family: "Arial", size: 12, color: ["black"]},
                fill:{
                    color: 'rgb(242, 242, 242)'
                },
                height:'30'
            }

        }],
        graph4: [{
            values: graph4val ,
            labels: graph4label,
            hole: .65,
            rotation:'-90',
            type: 'pie',
            textinfo: 'label',
            hoverinfo:'label',
            sort:false,
            textposition:'outside',
            textfont:{
                size:'10'
            }

        }],
        graph4table:[{
            type: 'table',
            y:50,
            header:{
                values:[ ['<b>제조사</b>'], ['<b>판매량</b>'],['<b>비율(%)</b>']],
                align: "center",
                line: {width: 1, color: 'white'},
                fill: {color: "rgb(243, 83, 47)"},
                font: {family: "Arial", size: 14, color: "white"},
                height:'30'
            },
            cells:{
                values:[
                    graph4label,
                    ['112건', '45건', '43건', '25건','6건','1건'],
                    graph4val
                ],
                align: "center",
                line: {color: "white", width: 1},
                font: {family: "Arial", size: 12, color: ["black"]},
                fill:{
                    color: 'rgb(242, 242, 242)'
                },
                height:'30'
            },


        }],
        graph5:[{
            type: 'scatterpolar',
            r: [10, 50, 8, 15, 15, 9],
            theta: ['사무실','주거지역','공업지역', '학원가', '번화가', '기타'],
            fill: 'toself',
            fillcolor: 'rgba(255, 212, 79, 0.5)',
            line:{
                color: 'rgb(255, 212, 79)',
                dash:'solid',
                shape:'linear'
            }

        }],
        graphFill:[
            {
                x: graphFillx,
                y: graphFilly[0],
                fill: 'tozeroy',
                fillcolor:'rgba(255, 247, 202, .8)',
                type: 'scatter',
                name:'유동인구',
                line :{
                    width: '1',
                    color:'rgba(242, 231, 144, .8)'
                },
                mode:'lines'
            },
            {
                x: graphFillx,
                y: graphFilly[1],
                fill: 'tozeroy',
                fillcolor:'rgba(255, 222, 180,.8)',
                type: 'scatter',
                name: '구매고객',
                line :{
                    width: '1',
                    color:'rgba(255, 198, 49,.8)'
                },
                mode:'lines'

            },
            {
                x: graphFillx,
                y: graphFilly[2],
                fill: 'tozeroy',
                fillcolor:'rgba(255, 169, 123, .8)',
                type: 'scatter',
                name: '내방고객',
                line :{
                    width: '1',
                    color:'rgba(255, 52, 14,.8)'
                },
                mode:'lines'
            },
        ],
        graph6: [{
            x: [.05, .12, .25],
            y: [ '갤럭시<br>S9', '갤럭시<br>WIDE3', '갤럭시<br>노트9'],
            orientation: 'h',
            outsidetextfont:'10',
            marker: {
                width: 1,
                color: barcolorset
            },
            type: 'bar',
            text:['5% (1253건)', '12% (2683건)', '25% (5422건)'],
            textposition:'outside',
        }],
        graph7: [{
            x: [.2, .14, .23],
            y: [ '갤럭시<br>S9', '갤럭시<br>WIDE3', '아이폰X'],
            orientation: 'h',
            outsidetextfont:'10',
            marker: {
                color: barcolorset,
                width: 1
            },
            type: 'bar',
            text:['7% (4건)', '16% (9건)', '21% (12건)'],
            textposition:'outside'
        }],
        graph8: [{
            x: [.12, .12, .16],
            y: ['j5<br>2017', '갤럭시<br>노트9', '갤럭시<br>WIDE3'],
            outsidetextfont:'10',
            orientation: 'h',
            marker: {
                color: barcolorset,
                width: 1
            },
            type: 'bar',
            text:['12% (3건)', '12% (3건)', '16% (4건)'],
            textposition:'outside',
        }],
        graph9: [{
            x: ['29이하<br>요금제', '47<br>요금제', '51<br>요금제','59<br>요금제','69<br>요금제','80 이상<br>요금제','기타<br>요금제'],
            y: [.45, .18, 0.01,.14,.15,.3,0],
            orientation: 'v',
            outsidetextfont:'10',
            marker: {
                color: '#fad587',
                width: 1
            },
            type: 'bar',
            text:['45%','18%','1%','14%','15%','3%','0%' ],
            textposition:'outside',
        }],
        graph10: [{
            x: ['29이하<br>요금제', '47<br>요금제', '51<br>요금제','59<br>요금제','69<br>요금제','80 이상<br>요금제','기타<br>요금제'],
            y: [.28, .33, .01, .12, .17,.05,0],
            orientation: 'v',
            outsidetextfont:'10',
            marker: {
                color: '#fad587',
                width: 1
            },
            type: 'bar',
            text:['28%','33%','1%','12%','17%','5%','0%' ],
            textposition:'outside',
        }],
        graph11: [{
            x: ['29이하<br>요금제', '47<br>요금제', '51<br>요금제','59<br>요금제','69<br>요금제','80 이상<br>요금제','기타<br>요금제'],
            y: [.25,.41,0,.16,.08,.08,0],
            orientation: 'v',
            outsidetextfont:'10',
            marker: {
                color: '#fad587',
                width: 1
            },
            type: 'bar',
            text:['25%','41%','0%','16%','8%','8%','0%' ],
            textposition:'outside',
        }],
        graph12: [{
            x: [.08, .12, .12,.12,.16],
            y: ['아이폰8', '갤럭시 S8', 'j5 2017', '갤럭시 노트9', '갤럭시 WIDE3'],
            orientation: 'h',
            marker: {
                color: barcolorset,
                width: 1
            },
            type: 'bar',
            text:['8% (2건)', '12% (3건)', '12% (3건)', '12% (3건)','16% (4건)'],
            textposition:'outside'
        }],
        graph13: [{
            x: [.04,.06, .1, .12, .3],
            y: ['Q7', '갤럭시 A8 Star', '아이폰8', '아이폰X', '갤럭시 노트9'],
            orientation: 'h',
            marker: {
                color: barcolorset,
                width: 1
            },
            type: 'bar',
            text:['4% (5건)', '6% (7건)', '10% (12건)', '12% (14건)','30% (34건)'],
            textposition:'outside'
        }],
        graph14: [{
            values: [ '49' , '51'],
            labels: ['도매','소매'],
            title:'소매비율<br>49%',
            hole: .65,
            type: 'pie',
            textinfo: 'none',
            rotation:90,
        }],
        graph15: [{
            x: [.75, .65, .86, .67, .83],
            y: ['가', '나', '다','라','마'],
            outsidetextfont:'10',
            orientation: 'h',
            marker: {
                color:barcolorset,
                width: 1
            },
            insidetextfont:{
                color:'#fff'
            },
            type: 'bar',
            text:['75% (12건)', '65% (13건)', '86% (19건)', '67% (19건)', '83% (41건)'],
            textposition:'inside',
        }],
        graph16: [{
            x: [.26, .43, .36, .62, .73],
            y: ['가', '나', '다','라','마'],
            outsidetextfont:'10',
            orientation: 'h',
            marker: {
                color: barcolorset,
                width: 1
            },
            insidetextfont:{
                color:'#fff'
            },
            color:'#fff',
            type: 'bar',
            text:['75% (12건)', '65% (13건)', '86% (19건)', '67% (19건)', '83% (41건)'],
            textposition:'inside',
        }],
    }
}
function graphLayout (option) {
    switch (option) {
        case 'graph1':
            return {
                layout: {
                    barmode: 'stack',
                    height:'300',
                    legend: {
                        x:'.02',
                        y:'.96',
                        borderwidth:.5,
                        bordercolor: '#ddd',
                        bgcolor:'rgba(255, 255, 255, 0.7)'
                    },
                    xaxis:{
                        type:'category',
                        mirror:true,
                        showgrid:false,
                        showline:true,
                        ticks:'outside',
                        zeroline:false,
                    },
                    yaxis:{
                        range:['0', '190'],
                        dtick: 25,
                        nticks:6,
                        mirror:true,
                        showgrid:false,
                        showline:true,
                        zeroline:false,
                        ticks:'outside',
                    },
                    colorway:['#99d4d7','#fad587','#f3532f'],
                    margin:{
                        t:'20',
                        l:'50',
                        r:'50',
                        b:'50'
                    }
                }
            };
            break;
        case 'graph2':
            return {
                layout: {
                    showlegend: false,
                    title:'제조사별 실적 분석',
                    width:'238',
                    height: '340',
                    colorway:['#99d4d7','#fad587','#f3532f','#be4639', '#8c4543','#e0e0e0'],
                    margin: {
                        l:'40',
                        r:'40'
                    }
                }
            }
            break;
        case 'graph3':
            return {
                layout: {
                    showlegend: false,
                    title:'연령대별 실적 분석',
                    width:'238',
                    height: '340',
                    colorway:['#99d4d7','#fad587','#f3532f','#be4639', '#8c4543','#e0e0e0'],
                    margin: {
                        l:'40',
                        r:'40'
                    }
                }
            };
            break;
        case 'graph4':
            return {
                layout: {
                    showlegend: false,
                    title:'요금제별 실적 분석',
                    width:'238',
                    height: '340',
                    colorway:['#99d4d7','#fad587','#f3532f','#be4639', '#8c4543','#e0e0e0'],
                    margin: {
                        l:'40',
                        r:'40'
                    }
                }
            };
            break;
        case 'graphTable1':
            return {
                layout: {
                    top: '10',
                    height: '250',
                    margin:{
                        t:'0',
                        l:'20',
                        r:'20',
                        b:'0',
                    }
                }
            };
            break;
        case 'graph5':
            return {
                layout: {
                    title:'해당 지역 상권 특성(주변 업종 기반)',
                    height:'400',
                    polar: {
                        radialaxis: {
                            visible: true,
                            range: [0, 50]
                        }
                    },
                    showlegend: false,
                    margin:{
                        t:'100',
                        l:'50',
                        r:'50',
                        b:'20'
                    }
                }
            };
            break;
        case 'graphFill':
            return {
                layout: {
                    title:'해당 지역 내 연령별 유동/구매/내방 고객 분포',
                    titlefont:{
                        size:'14'
                    },
                    width:'1000',
                    height:'350',
                    legend: {
                        x:'-.02',
                        y:'1.07',
                        borderwidth:.5,
                        bordercolor: '#ddd'
                    },
                    xaxis: {
                        type:'category',
                        mirror:true,
                        showgrid:false,
                        showline:true,
                        ticks:'outside',
                        zeroline:false,
                    },
                    yaxis:{
                        range:['0', '24'],
                        dtick: 5,
                        nticks:4,
                        mirror:true,
                        showgrid:false,
                        showline:true,
                        zeroline:false,
                        ticks:'outside',
                        ticksuffix	:'%',
                        showticksuffix:'all'
                    },
                    margin:{
                        t:'80',
                        b:'60',
                        l:'100',
                        r:'100',
                        pad: '20',
                    }
                }
            };
            break;
        case 'graph6':
            return {
                layout: {
                    title:'단말기 판매 Top 3',
                    height:'280',
                    bargap:.2,
                    margin:{
                        t:'30',
                        r: '20',
                        l: '50',
                        b:'40'
                    },
                    xaxis:{
                        range:['0' , '1'],
                        dtick:'.2',
                        showtickprefix:'first',
                        tickprefix:'0.',
                        showticksuffix:'last',
                        ticksuffix	: '.0',
                        mirror:true,
                        showgrid:false,
                        showline:true,
                        zeroline:false,
                        ticks:'outside',
                    },
                    yaxis: {
                        mirror:true,
                        showgrid:false,
                        showline:true,
                        zeroline:false,
                        ticks:'outside',
                    }
                }
            };
            break;
        case 'graph9':
            return {
                layout: {
                    title:'요금제 유치율',
                    height:'300',
                    bargap:'.2',
                    margin:{
                        t: '30',
                        r: '10',
                        l: '40'
                    },
                    xaxis:{
                        type:'category',
                        mirror:true,
                        showgrid:false,
                        showline:true,
                        zeroline:false,
                        ticks:'outside'
                    },
                    yaxis:{
                        range:['0' , '1'],
                        dtick: .2,
                        mirror:true,
                        showgrid:false,
                        showline:true,
                        zeroline:false,
                        ticks:'outside',
                        showtickprefix:'first',
                        showticksuffix	:'last',
                        tickprefix:'0.',
                        ticksuffix	: '.0'
                    },
                    colorway:['#99d4d7','#fad587','#f3532f','#be4639', '#8c4543','#e0e0e0'],
                }
            };
            break;
        case 'graph12':
            return {
                layout: {
                    height:'300',
                    bargap:.2,
                    margin:{
                        t:'30',
                        r: '80',
                        l: '100',
                        b:'30'
                    },
                    xaxis:{
                        range:['0' , '1'],
                        dtick:'.2',
                        dtick:'.2',
                        showtickprefix:'first',
                        tickprefix:'0.',
                        showticksuffix:'last',
                        ticksuffix	: '.0',
                        mirror:true,
                        showgrid:false,
                        showline:true,
                        zeroline:false,
                        ticks:'outside',
                    },
                    yaxis: {
                        mirror:true,
                        showgrid:false,
                        showline:true,
                        zeroline:false,
                        ticks:'outside',
                    }
                }
            };
            break;
        case 'graph14':
            return {
                layout: {
                    showlegend: false,
                    width:'250',
                    height: '180',
                    colorway:['#f7f7f7','#fad587'],
                    margin:{
                        t:'0',
                        l:'0',
                        r:'50',
                        b:'0',
                    }
                }
            };
            break;
        case 'graph15':
            return {
                layout: {
                    title:'기변 비율',
                    width: '260',
                    height:'220',
                    bargap:.2,
                    margin:{
                        t:'30',
                        r: '10',
                        l: '10',
                        b: '30'
                    },
                    xaxis:{
                        range:['0' , '1'],
                        dtick:'.2',
                        showtickprefix:'first',
                        tickprefix:'0.',
                        showticksuffix:'last',
                        ticksuffix	: '.0',
                        mirror:true,
                        showgrid:false,
                        showline:true,
                        zeroline:false,
                        ticks:'outside',
                    },
                    yaxis: {
                        type:'category',
                        mirror:true,
                        showgrid:false,
                        showline:true,
                        zeroline:false,
                        showticklabels:false
                    },
                }
            };
            break;
        default:
            break
    }
}
// tmap1

var tmapciCcleLayer = function() {
    return {
        map1:[
            {
                point: new Tmap.Geometry.Point(126.652051,37.395258).transform("EPSG:4326", "EPSG:3857"),
                style: style_green(120)
            },
            {
                point: new Tmap.Geometry.Point(126.649727, 37.396695).transform("EPSG:4326", "EPSG:3857"),
                style: style_red(80)
            },
            {
                point: new Tmap.Geometry.Point(126.649043, 37.392637).transform("EPSG:4326", "EPSG:3857"),
                style: style_red(80)
            },
            {
                point: new Tmap.Geometry.Point(126.640830, 37.394117).transform("EPSG:4326", "EPSG:3857"),
                style: style_red(80)
            },
            {
                point: new Tmap.Geometry.Point(126.672488, 37.406704).transform("EPSG:4326", "EPSG:3857"),
                style: style_red(80)
            },
            {
                point: new Tmap.Geometry.Point(126.663740, 37.385551).transform("EPSG:4326", "EPSG:3857"),
                style: style_red(80)
            },
        ]
    }
}
var tmapMultiMarker = function () {
    return {
        map1:[
            {
                title: 'SKT 송도직영점',
                lonlat: new Tmap.LonLat(126.652051,37.395258).transform("EPSG:4326", "EPSG:3857"),
                msrc:'images/icons/tmap_maker.png',
                size:'24,24'
            },
            {
                title: 'skt 다른대리점',
                lonlat: new Tmap.LonLat(126.649727, 37.396695).transform("EPSG:4326", "EPSG:3857"),
                msrc:'images/icons/tmap_maker_grey.png',
                size:'20,20'
            },
            {
                title: 'skt 다른대리점2',
                lonlat: new Tmap.LonLat(126.649043, 37.392637).transform("EPSG:4326", "EPSG:3857"),
                msrc:'images/icons/tmap_maker_grey.png',
                size:'20,20'
            },
            {
                title: 'skt 다른대리점3',
                lonlat: new Tmap.LonLat(126.640830, 37.394117).transform("EPSG:4326", "EPSG:3857"),
                msrc:'images/icons/tmap_maker_grey.png',
                size:'20,20'
            },
            {
                title: 'skt 다른대리점4',
                lonlat: new Tmap.LonLat(126.672488, 37.406704).transform("EPSG:4326", "EPSG:3857"),
                msrc:'images/icons/tmap_maker_grey.png',
                size:'20,20'
            },
            {
                title: 'skt 다른대리점5',
                lonlat: new Tmap.LonLat(126.663740, 37.385551).transform("EPSG:4326", "EPSG:3857"),
                msrc:'images/icons/tmap_maker_grey.png',
                size:'20,20'
            }
        ]
    }
}


var style_red = function (size) {
    return {
        fillColor:"#FF0000",
        fillOpacity:0.2,
        strokeColor: "#FF0000",
        strokeWidth: 2,
        strokeDashstyle: "solid",
        pointRadius: size,
        title: "this is a red line"
    }
};
var style_green = function (size) {
    return {
        fillColor:"#2bb14b",
        fillOpacity:0.2,
        strokeColor: "#0f9b00",
        strokeWidth: 3,
        strokeDashstyle: "solid",
        pointRadius: size,
        title: "this is a red line"
    }
};

// 한개 혹은 여러개 마커 작성
function markerMap(id , xx, yy , positions , circle) {

    var positions = positions;
    var circle = circle;

    var obj_name = new Tmap.Map({div: id, width: '100%', height: '100%'});
    markerLayer = new Tmap.Layer.Markers();//마커 레이어 생성
    obj_name.addLayer(markerLayer);//map에 마커 레이어 추가

    var size = new Tmap.Size(24, 24);//아이콘 크기 설정
    var offset = new Tmap.Pixel(-(size.w / 2), -(size.h));//아이콘 중심점 설정

    if ( positions && ( !circle || circle == null || circle == undefined || circle == '')) {
        console.log('포지션만 있어요');

        for ( var i = 0; i < positions.length; i++) {//for문을 통하여 배열 안에 있는 값을 마커 생성
            var size = new Tmap.Size(positions[i].size);
            var icon = new Tmap.Icon(positions[i].msrc , size, offset);//마커 아이콘 설정
            var lonlat = positions[i].lonlat;//좌표값

            marker = new Tmap.Marker(lonlat, icon);//마커 생성
            markerLayer.addMarker(marker); //마커 레이어에 마커 추가

            obj_name.setCenter(positions[1],15);
        }

    } else if( positions && circle ){
        console.log('둘다 있어요.');

        var vector_layer = new Tmap.Layer.Vector('TmapVectorLayer'); // 백터 레이어 생성
        obj_name.addLayers([vector_layer]); // 지도에 백터 레이어 추가

        for ( var i = 0; i < positions.length; i++) {//for문을 통하여 배열 안에 있는 값을 마커 생성
            var size = new Tmap.Size(positions[i].size);
            var icon = new Tmap.Icon(positions[i].msrc , size, offset);//마커 아이콘 설정
            var lonlat = positions[i].lonlat;//좌표값
            var targetView =  new Tmap.LonLat( xx,yy ).transform("EPSG:4326", "EPSG:3857");//좌표 설정;

            marker = new Tmap.Marker(lonlat, icon);//마커 생성
            markerLayer.addMarker(marker); //마커 레이어에 마커 추가

            obj_name.setCenter(targetView,14);
        }

        for ( var i = 0; i < circle.length; i++) {

            point = circle[i].point;
            style_name = circle[i].style;
            pointFeature = new Tmap.Feature.Vector(point, null, style_name ); // 백터 생성
            vector_layer.addFeatures([pointFeature]); // 백터 레이어에 백터 추가
        }

    } else if ((!positions || position == null || position == undefined || position == '') && circle){

        console.log('한개의 좌표와 한개의 서클');

        var vector_layer = new Tmap.Layer.Vector('TmapVectorLayer'); // 백터 레이어 생성
        obj_name.addLayers([vector_layer]); // 지도에 백터 레이어 추가

        var icon = new Tmap.Icon('images/icons/tmap_maker.png',size, offset);//마커 아이콘 설정
        var lonlat = new Tmap.LonLat( xx,yy ).transform("EPSG:4326", "EPSG:3857");//좌표 설정

        marker = new Tmap.Marker(lonlat, icon);//마커 생성
        markerLayer.addMarker(marker);//레이어에 마커 추가

        obj_name.setCenter(lonlat,15);

        for ( var i = 0; i < circle.length; i++) {

            point = circle[i].point;
            style_name = circle[i].style;
            pointFeature = new Tmap.Feature.Vector(point, null, style_name ); // 백터 생성
            vector_layer.addFeatures([pointFeature]); // 백터 레이어에 백터 추가
        }


    } else if (!positions && !circle) {
        console.log('한개의 좌표만 있어요');
        var icon = new Tmap.Icon('images/icons/tmap_maker.png',size, offset);//마커 아이콘 설정
        var lonlat = new Tmap.LonLat( xx,yy ).transform("EPSG:4326", "EPSG:3857");//좌표 설정

        marker = new Tmap.Marker(lonlat, icon);//마커 생성
        markerLayer.addMarker(marker);//레이어에 마커 추가

        obj_name.setCenter(lonlat,15);
    }
}

var graph1x = [ '2018.02', '2018.03', '2018.04', '2018.05', '2018.06', '2018.07', '2018.08', '2018.09', '2018.10<br>예상치'],
    graph1y = [ [73, 115 , 90 ,99, 105,94,104,101, 80 ],[24, 20,19,28,20,15,14, 18,9],[ 5, 48, 25,26,35,24,25,27,23],[165,155,150,145,140,135,130,125,120]],
    graph1text =[['73건','115건','90건','99건','105건','94건','104건','101건','80건'],['24건','20건','19건','28건','20건','15건','14건','18건','9건'],['45건','48건','25건','26건','35건','24건','25건','27건','23건']],
    graph2val = [ 67.7, 13.1,11.8,7.4],
    graph2label = ['삼성','LG', '애플', 'etc'],
    graph3val = [17.7,16.8, 16.4, 14.2, 12.5, 22.4],
    graph3label =  ['10대','40대','50대','30대','20대','기타'],
    graph4val = [48.3, 19.4, 18.5, 10.8, 2.6,.4],
    graph4label= ['29이하','36~47','69 계열','59 계열','80이상','기타'],
    graphFillx= ['0대','10대','20대','30대','40대','50대','60대','70대','80대'],
    graphFilly= [[4,17,15,19,23,6,2,2,2],[7,21,13,13,12,18,8,4,2],[4,16,14,18,20,7,3,1,1]],
    barcolorset = [ '#99d4d7','#fad587','#f3532f','#be4639', '#8c4543','#e0e0e0'];

$(document).ready(function(){

    var graph = graphData(),
        graph1 = graph.graph1,
        graph2 = graph.graph2,
        graph2table = graph.graph2table,
        graph3 = graph.graph3,
        graph3table = graph.graph3table,
        graph4 = graph.graph4,
        graph4table = graph.graph4table,
        graph5 = graph.graph5,
        graphFill = graph.graphFill,

        graph6 = graph.graph6,
        graph7 = graph.graph7,
        graph8 = graph.graph8,
        graph9 = graph.graph9,
        graph10 = graph.graph10,
        graph11 = graph.graph11,
        graph12 = graph.graph12,
        graph13 = graph.graph13,
        graph14 = graph.graph14,
        graph15 = graph.graph15,
        graph16 = graph.graph16;

    Plotly.newPlot('graph1', graph1, graphLayout('graph1').layout);
    Plotly.newPlot('graph2', graph2, graphLayout('graph2').layout);
    Plotly.newPlot('graph2table', graph2table, graphLayout('graphTable1').layout);
    Plotly.newPlot('graph3', graph3, graphLayout('graph3').layout);
    Plotly.newPlot('graph3table', graph3table, graphLayout('graphTable1').layout);
    Plotly.newPlot('graph4', graph4, graphLayout('graph4').layout);
    Plotly.newPlot('graph4table', graph4table, graphLayout('graphTable1').layout);
    Plotly.newPlot('graph5', graph5, graphLayout('graph5').layout);

    Plotly.newPlot('graphFill', graphFill, graphLayout('graphFill').layout);

    Plotly.newPlot('graph6', graph6, graphLayout('graph6').layout);
    Plotly.newPlot('graph7', graph7, graphLayout('graph6').layout);
    Plotly.newPlot('graph8', graph8, graphLayout('graph6').layout);
    Plotly.newPlot('graph9', graph9 , graphLayout('graph9').layout);
    Plotly.newPlot('graph10', graph10, graphLayout('graph9').layout);
    Plotly.newPlot('graph11', graph11, graphLayout('graph9').layout);
    Plotly.newPlot('graph12', graph12, graphLayout('graph12').layout);
    Plotly.newPlot('graph13', graph13, graphLayout('graph12').layout);
    Plotly.newPlot('graph14', graph14, graphLayout('graph14').layout);
    Plotly.newPlot('graph15', graph15, graphLayout('graph15').layout);
    Plotly.newPlot('graph16', graph16, graphLayout('graph15').layout);

    // marker0Map();
    // marker1Map();
    // marker2Map();
    // marker3Map();
    markerMap('map_div_multi',126.652051,37.395258,tmapMultiMarker().map1,tmapciCcleLayer().map1);
    markerMap('map_div1',126.652051,37.395258);
    markerMap('map_div2',126.652051,37.395258);
    markerMap('map_div3',126.650114,37.392809);

});