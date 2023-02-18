// .products 클래스를 가진 요소를 찾습니다.
import fetchData from "./basic.js";

const productsContainer = document.getElementById('divstores');
// const location = JSON.parse(sessionStorage.getItem("location"));
const datas_name=[]
const datas_x=[]
const datas_y=[]
const datas=[]



fetchData().then((result) => {  //basic.js로 넘어온 데이터 가공 후 띄우기
    for (var i = 0; i < result.length; i++) {
        datas_x.push(result[i].fields.x)
        datas_y.push(result[i].fields.y)
        datas_name.push(result[i].fields.name)
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
        if(lat-0.05<=datas_x[i]&&datas_x[i]<=lat+0.050 && lng-0.050 <= datas_y[i] && datas_y[i] <= lng+0.050){
            const dataset = {
                name: datas_name[i],
                lat: datas_x[i],
                lng: datas_y[i],
            };
            datas.push(dataset);
        }
    }
    
    for (let i = 0; i < datas.length; i++) {        //띄우기
        const data = datas[i];  // i번째 객체
        const name = document.createElement('h3');
        name.textContent = data.name;
        productsContainer.appendChild(name);

        const latlng = document.createElement('p');
        // naver.maps.Service.reverseGeocode({                   //위치변환인데 너무 오래걸림
        //     coords: new naver.maps.LatLng(data.lat, data.lng),
        // }, function(status, response) {
        //     var result = response.v2, // 검색 결과의 컨테이너
        //         address = result.address; // 검색 결과로 만든 주소
        //         latlng.textContent = address.jibunAddress;
        //         console.log(latlng)
        //         productsContainer.appendChild(latlng);
        //     }
        // );
        latlng.textContent = `${data.lat}, ${data.lng}`;
        productsContainer.appendChild(latlng);

        const blank = document.createElement('br')
        productsContainer.appendChild(blank);
    }
    console.log(productsContainer)
}).catch((error) => {
    console.log(error);
});


