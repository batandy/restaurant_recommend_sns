
function onGeoSuccess(position){
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log("You live it", lat, lng);

    var mapDiv = document.getElementById('map');
    var map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(lat, lng),
        zoom: 17
    });
    var marker1 = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        map: map
    });

}
function onGeoError(){
    alert("Can't find you. No locate for you.")
}
navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);

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