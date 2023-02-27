let markers= new Array();
let infowindows= new Array();
const markers_x= [];
let markers_y= new Array();
let markers_name= new Array();
const datas=[];
var position_test=[];
var db = "{{restaurant_db}}";
let lat=0;
let lng=0;
var position_test=0;
var locations = "{{restaurant_db}}".replace(/&quot;/g, '"');
var test_data=locations
const API_KEY = "7ab08d887f92df7bd79920dcb019c6a2"; //날씨 api키

//for fetchData
const data_name=[]
const data_x=[]
const data_y=[]
const data_add=[]
const data_num=[]
const fetch_datas=[]
const data_cat=[]


const fetchData = () => {    //데이터 가공 해서 fetch_datas로 넘기기
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/getdata/",
            dataType: "json",
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    data_x.push(result[i].fields.x)
                    data_y.push(result[i].fields.y)
                    data_name.push(result[i].fields.name)
                    data_add.push(result[i].fields.market_address)
                    data_num.push(result[i].fields.market_number)
                    data_cat.push(result[i].fields.food_category)
                }
            
                let lat;
                let lng;
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
                for (var i=0; i<result.length;i++){                    //현재 위치기준으로 매장선별
                    if(lat-0.05<=data_x[i]&&data_x[i]<=lat+0.050 && lng-0.050 <= data_y[i] && data_y[i] <= lng+0.050){
                        const dataset = {
                            name: data_name[i],
                            address: data_add[i],
                            number: data_num[i],
                            lat: data_x[i],
                            lng: data_y[i],
                            cat: data_cat[i]
                        };
                        fetch_datas.push(dataset);
                    }
                }

                // 내 위치에서 해당 위치까지의 거리를 계산하는 함수
                function distance(lats, lngs) {
                    const R = 6371; // 지구의 반지름(단위: km)
                    const dLat = (lats - lat) * Math.PI / 180;
                    const dLng = (lngs - lng) * Math.PI / 180;
                    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                            Math.cos(lat * Math.PI / 180) * Math.cos(lats * Math.PI / 180) *
                            Math.sin(dLng/2) * Math.sin(dLng/2);
                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                    const d = R * c;
                    return d;
                }

                fetch_datas.sort((a, b) => distance(a.lat, a.lng) - distance(b.lat, b.lng)); //거리순으로 정렬
                resolve(fetch_datas);
        },
        error: function (error) {
            reject(error);
        },
    });
    });
};

export default fetchData;


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
            map: map,
            title:'현재 위치'
        });
        fetchData().then((fetch_datas) => { 
            for (var i=0; i<fetch_datas.length;i++){
                const data = fetch_datas[i];
                var marker=new naver.maps.Marker({
                    position: new naver.maps.LatLng(data.lat,data.lng),
                    map: map,
                    title:data.name
                });
                var infowindow=new naver.maps.InfoWindow({
                    content:'<div style="width:200px;height:200px;text-align:center;padding:10px;"><b>'+markers_name[i]+'</b><br>-네이버 지도-</div>'
                });
                // markers.push(marker);
                infowindows.push(infowindow);
            }
        }).catch((error) => {
        console.log(error);
    });
})};


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

