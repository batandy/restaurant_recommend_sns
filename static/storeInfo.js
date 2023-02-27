import fetchData from "./basic.js";
const productsContainer = document.getElementById('store_detail');

fetchData().then((fetch_datas) => {  //basic.js로 넘어온 데이터 가공 후 띄우기  
    const params = new URLSearchParams(location.search);
    const id = params.get('nameid');
    const data = fetch_datas[id];  // i번째 객체

    const name = document.createElement('h3');
    name.textContent = data.name;
    productsContainer.appendChild(name);

    const locate = document.createElement('p');
    locate.textContent = data.address;
    productsContainer.appendChild(locate);

    const num = document.createElement('p');
    num.textContent = data.number;
    productsContainer.appendChild(num);

    const cat = document.createElement('p');
    cat.textContent = data.cat;
    productsContainer.appendChild(cat);

    const blank = document.createElement('br')
    productsContainer.appendChild(blank);

    var map = window.map;
    console.log(map)
    // var loc = new naver.maps.LatLng(data.lat, data.lng);
    map.setCenter(new naver.maps.LatLng(data.lat, data.lng));
}).catch((error) => {
    console.log(error);
});

