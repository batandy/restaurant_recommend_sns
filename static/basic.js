const API_KEY = "7ab08d887f92df7bd79920dcb019c6a2"; //날씨 api키

function onGeoSuccess(position){
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    let userAddress = null;
    naver.maps.Service.reverseGeocode({
        coords: new naver.maps.LatLng(lat, lng),
    }, function(status, response) {
        if (status !== naver.maps.Service.Status.OK) {
            return alert('Something wrong!');
        }

        var result = response.v2, // 검색 결과의 컨테이너
            address = result.address; // 검색 결과로 만든 주소
        userAddress = address.jibunAddress;
    });
    
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`; //날씨 api가져옴
    fetch(weatherUrl)
        .then(res => res.json())
        .then(data => {
            const temp = data.main.temp;
            const weathers = data.weather[data.weather.length -1];
            const weatherLocate = document.getElementById("weatherLocate");
            const weatherSpan = document.getElementById("weatherData");
            const weatherIcon = document.getElementById("weatherIcon");

            weatherLocate.innerText= userAddress;
            weatherSpan.innerHTML = `온도: ${temp}&#176;C 날씨:${weathers.main}`;
            weatherIcon.src = `https://openweathermap.org/img/wn/${weathers.icon}@2x.png`;
        });


    var mapDiv = document.getElementById('map');  //네이버 지도
    var map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(lat, lng),
        zoom: 17
    });
    var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        map: map
    });
};
function onGeoError(){
    alert("Can't find you. No locate for you.")
};

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);

