import fetchData from "./basic.js";

const productsContainer = document.getElementById('divstores');


fetchData().then((fetch_datas) => {  //basic.js로 넘어온 데이터 가공 후 띄우기
    const params = new URLSearchParams(location.search);
    const kw = params.get('search_res');
    if (kw===null){
        for (let i = 0; i < fetch_datas.length; i++) {        //띄우기
            const data = fetch_datas[i];  // i번째 객체
            let baseUrl = window.location.href.includes("main/") ? "" : "main/";

            const name = document.createElement('a');
            name.id=`name${i}`;
            name.href = `${baseUrl}store_detail?nameid=${i}`;
            name.textContent = data.name;
            productsContainer.appendChild(name);

            const locate = document.createElement('p');
            locate.textContent = data.address;
            productsContainer.appendChild(locate);

            const blank = document.createElement('br')
            productsContainer.appendChild(blank);
        }
    }else{
        for (let i = 0; i < fetch_datas.length; i++) {        //띄우기
            const data = fetch_datas[i];
            if(data.name.indexOf(kw)!=-1){
                  // i번째 객체
                let baseUrl = window.location.href.includes("main/") ? "" : "main/";

                const name = document.createElement('a');
                name.id=`name${i}`;
                name.href = `${baseUrl}store_detail?nameid=${i}`;
                name.textContent = data.name;
                productsContainer.appendChild(name);

                const locate = document.createElement('p');
                locate.textContent = data.address;
                productsContainer.appendChild(locate);

                const blank = document.createElement('br')
                productsContainer.appendChild(blank);
            }
        }
    }

    
}).catch((error) => {
    console.log(error);
});

