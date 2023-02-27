
let lat=0;
let lng=0;

if(sessionStorage.getItem("location")){                                 //위치확인
    const location = JSON.parse(sessionStorage.getItem("location"));
    lat=location.lat;
    lng=location.lng
}else{
    navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
    });
}
console.log(lat,lng);

var mylat=document.getElementById("my-lat");
var mylng=document.getElementById("my-lng");
mylat.textContent = lat;
mylng.textContent = lng;