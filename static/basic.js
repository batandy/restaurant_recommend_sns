let markers= new Array();
let infowindows= new Array();
const markers_x= [];
let markers_y= new Array();
let markers_name= new Array();
var position_test=[];
var db = "{{restaurant_db}}";
let lat=0;
let lng=0;
var position_test=0;
var locations = "{{restaurant_db}}".replace(/&quot;/g, '"');
var test_data=locations
const API_KEY = "7ab08d887f92df7bd79920dcb019c6a2"; //날씨 api키
console.log(locations,test_data)
for(i in test_data){
    console.log(test_data[i])
}

function getLocate(lat, lng){  //위치정보와 날씨 가져오기
    naver.maps.Service.reverseGeocode({
        coords: new naver.maps.LatLng(lat, lng),
    }, function(status, response) {
        if (status !== naver.maps.Service.Status.OK) {
            return alert("주소가 잘못되었습니다. 다시입력해주세요");
        }
        var result = response.v2, // 검색 결과의 컨테이너
            address = result.address; // 검색 결과로 만든 주소
        
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`; //날씨 api가져옴
        fetch(weatherUrl)
            .then(res => res.json())
            .then(data => {
                const temp = data.main.temp;
                const weathers = data.weather[data.weather.length -1];
                const weatherSpan = document.getElementById("weatherData");
                const weatherLocate = document.getElementById("weatherLocate");
                const weatherIcon = document.getElementById("weatherIcon");
                
                weatherLocate.innerText= address.jibunAddress;
                weatherSpan.innerHTML = `온도: ${temp}&#176;C 날씨:${weathers.main}`;
                weatherIcon.src = `https://openweathermap.org/img/wn/${weathers.icon}@2x.png`;
        });
        var map = new naver.maps.Map('map', {
            center: new naver.maps.LatLng(lat,lng),
            zoom: 17
            });
        var marker1 = new naver.maps.Marker({
            position: new naver.maps.LatLng(lat, lng),
            map: map
        });
        $.ajax({
        url: "/getdata/",
        dataType: "json",
        success: function (data) {
            console.log(data)
            for (var i = 0; i < data.length; i++) {
                markers_x.push(data[i].fields.x)
                markers_y.push(data[i].fields.y)
                markers_name.push(data[i].fields.name)
            }

            for (var i=0; i<data.length;i++){
                if(lat-0.05<=markers_x[i]&&markers_x[i]<=lat+0.050 && lng-0.050 <= markers_y[i] && markers_y[i] <= lng+0.050){
                    console.log(markers_y[i],markers_name[i])
                    var marker=new naver.maps.Marker({
                        position: new naver.maps.LatLng(markers_x[i],markers_y[i]),
                        map: map,
                        title:markers_name[i]
                    });
                    var infowindow=new naver.maps.InfoWindow({
                        content:'<div style="width:200px;height:200px;text-align:center;padding:10px;"><b>'+markers_name[i]+'</b><br>-네이버 지도-</div>'
                    });
                    markers.push(marker);
                    infowindows.push(infowindow);
                }
            }

            function getClickHandler(seq) {
                console.log("test")
                return function(e) {  // 마커를 클릭하는 부분
                    var marker = markers[seq], // 클릭한 마커의 시퀀스로 찾는다.
                        infoWindow = infowindows[seq]; // 클릭한 마커의 시퀀스로 찾는다
                    console.log(marker,infoWindow)
                    if (infoWindow.getMap()) {
                        infoWindow.close();
                    } else {
                        infoWindow.open(map, marker); // 표출
                    } 
                }
            }
            for (var i=0, ii=markers.length; i<ii; i++) {
                console.log(markers[i] , getClickHandler(i));
                naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i)); // 클릭한 마커 핸들러
            }
        },
        error: function (request, status, error) {
            console.log('실패');
        }
    });
    });
}


function onGeoSuccess(position){
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    sessionStorage.setItem("location", JSON.stringify({ lat, lng }));
    getLocate(lat,lng); 
}
function onGeoError(){
    alert("Can't find you. No locate for you.")
}
if(sessionStorage.getItem("location")){
    const location = JSON.parse(sessionStorage.getItem("location"));
    getLocate(location.lat, location.lng);
}else{
    navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
}

document.getElementById("locateModify").addEventListener("click", function(){  //지역수정
    var modifyAddress = prompt("현재 접속 중인 지역이 아니면 지역을 입력해주세요.");
    naver.maps.Service.geocode({
        address: modifyAddress
    }, function(status, response) {
        if (status !== naver.maps.Service.Status.OK) {
            return alert('Something wrong!!!!');
        }
        var result = response.result, // 검색 결과의 컨테이너
            items = result.items; // 검색 결과의 배열
        if(items[0] === undefined)
            return alert("주소를 잘못 입력하셨습니다. 다시 입력해주세요");
        const lng = parseFloat(items[0].point.x);
        const lat = parseFloat(items[0].point.y);
        sessionStorage.setItem("location", JSON.stringify({ lat, lng }));
        getLocate(lat,lng);
    });
});

console.log(markers_x,markers_y)
console.log(position_test)
//export default markers;  //이거 들가니까 왜 오류..? 이거 해결해봐





//
//const mysql = require('sns');
//
//var db = mysql.createConnection({
//  host : 'localhost',
//  user : 'root',
//  password : '1234',
//  database : 'sns'
//});
//
//db.connect();

//var sql = 'SELECT * FROM topic';
//db.query(sql,(err,rows,fields)=>{
//    if(err){
//        console.log(err);
//    }else{
//        console.log('rows',rows);
//    }
//})
//db.end();
//var restaurant_db = "{{restaurant_db}}";
//var try1=JSON.parse(restaurant_db);
//console.log("test",restaurant_db);
//
//var mapDiv = document.getElementById('map');
//var map = new naver.maps.Map('map', {
//    center: new naver.maps.LatLng(37.3595704, 127.105399),
//    zoom: 10
//});
//var marker = new naver.maps.Marker({
//    position: new naver.maps.LatLng(37.50604909629275,127.00322896918819),
//    map: map
//});
//var Markers=[]
//for (a in restaurant_db){
//    Markers.push(new naver.maps.Marker({
//            map: map,
//            position: new naver.maps.LatLng(parseFloat(a.x), parseFloat(a.y))
//    }));
//}