// .products 클래스를 가진 요소를 찾습니다.
import fetchData from "./basic.js";

const productsContainer = document.getElementById('divstores');
console.log(productsContainer)
// const location = JSON.parse(sessionStorage.getItem("location"));
const data_name=[]
const data_x=[]
const data_y=[]
const datas=[]
const data_add=[]
const data_num=[]

fetchData().then((result) => {  //basic.js로 넘어온 데이터 가공 후 띄우기
    console.log(result)
    for (var i = 0; i < result.length; i++) {
        data_x.push(result[i].fields.x)
        data_y.push(result[i].fields.y)
        data_name.push(result[i].fields.name)
        data_add.push(result[i].market_address)
        data_num.push(result[i].market_number)
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
                lat: data_x[i],
                lng: data_y[i],
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
        latlng.textContent = `${data.lat}, ${data.lng}`;
        productsContainer.appendChild(latlng);

        const blank = document.createElement('br')
        productsContainer.appendChild(blank);
    }
    console.log(productsContainer)
}).catch((error) => {
    console.log(error);
});


