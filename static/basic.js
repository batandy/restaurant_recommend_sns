const API_KEY = "7ab08d887f92df7bd79920dcb019c6a2"; //날씨 api키

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
    });
    var mapDiv = document.getElementById('map');  //네이버 지도
//    var map = new naver.maps.Map('map', {
//        center: new naver.maps.LatLng(lat, lng),
//        zoom: 17
//    });
//    var marker1 = new naver.maps.Marker({
//        position: new naver.maps.LatLng(lat, lng),
//        map: map
//    });
}

function onGeoSuccess(position){
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    sessionStorage.setItem("location", JSON.stringify({ lat, lng }));
    getLocate(lat,lng);
};
function onGeoError(){
    alert("Can't find you. No locate for you.")
};

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