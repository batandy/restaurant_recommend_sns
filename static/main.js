// .products 클래스를 가진 요소를 찾습니다.
const productsContainer = document.querySelector('.stores');

// markers 배열을 순회하면서 제품 정보를 출력하는 함수입니다.
function renderProducts() {
    console.log(datas)
    datas.forEach(store => {
        const storeItem = document.createElement('div');
        storeItem.classList.add('store-item');
        storeItem.innerHTML = `
            <h3>${store.name}</h3>
        `;
        productsContainer.appendChild(storeItem);
    });
}

// renderProducts 함수를 호출합니다.
renderProducts();
