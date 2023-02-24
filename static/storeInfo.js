import fetchData from "./basic.js";

fetchData().then((fetch_datas) => {  //basic.js로 넘어온 데이터 가공 후 띄우기  
    const params = new URLSearchParams(location.search);
    const id = params.get('nameid');
    const data = fetch_datas[id];

    console.log(data)
    
}).catch((error) => {
    console.log(error);
});
