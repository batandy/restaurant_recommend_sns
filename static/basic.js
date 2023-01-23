var src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=fxqxlpqj6o"


function onGeoSuccess(position){
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log("You live it", lat, lng);

    var mapDiv = document.getElementById('map');
    var map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(lat, lng),
        zoom: 17
    });
    var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        map: map
    });
}
function onGeoError(){
    alert("Can't find you. No locate for you.")
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);

