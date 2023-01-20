var src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=fxqxlpqj6o"


var mapDiv = document.getElementById('map');
var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10
});
var marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(37.3595704, 127.105399),
    map: map
});
