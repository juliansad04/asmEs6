import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
    get,
    child,
    push,
    update,
    remove,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyBPWp2ha8zD9ZnbOv7dSbSELGCe86iytAY",
    authDomain: "thanhnppcecma.firebaseapp.com",
    databaseURL: "https://thanhnppcecma-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "thanhnppcecma",
    storageBucket: "thanhnppcecma.appspot.com",
    messagingSenderId: "96233696774",
    appId: "1:96233696774:web:b47da30031cc6231269d87"

};

initializeApp(firebaseConfig);

const dbRef = ref(getDatabase());

function updateCateList() {
    const categoryList = document.getElementById("categorySelect");
    categoryList.innerHTML = "";

    get(child(dbRef, "category"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const categories = snapshot.val();

                categoryList.innerHTML = `
        <option value="all">Tất cả danh mục</option>
        ${categories
                    .map((category) => {
                        return `<option value="${category.name}">${category.name}</option>`;
                    })
                    .join("")}
      `;
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

updateCateList();


function updateProductList() {
    const productList = document.querySelector(".product__wrap");
    productList.innerHTML = "";

    get(child(dbRef, "products"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const products = snapshot.val();

                products?.map((product) => {
                    const div = document.createElement("div");
                    div.classList = `col-11 col-sm-6 col-lg-6 col-xl-3 mt-5`;

                    let htmls = `<div class="product-details">
            <div class="product-img">
                <div class="label-offer bg-red"></div>
                <a href="chitietsp.html?id=${product.id}"><img src="images/vanhoc${product.id}.jpg" alt="..." width="100%" height="260px"></a>
                <div class="product-cart">
                    <button id="add-cart">Thêm vào giỏ</button>
                </div>
            </div>

            <div class="product-info">
                <a href="#!">${product.name}</a>
                <p class="price text-center m-0">
                    <span class="product_price">Giá: ${(product.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                </p>
            </div>
          </div>`;

                    div.innerHTML = htmls;

                    // Thêm sự kiện click cho hình ảnh sản phẩm
                    const imgElement = div.querySelector('img');
                    imgElement.addEventListener('click', () => {
                        // Chuyển đến trang chi tiết với id sản phẩm
                        window.location.href = `chitietsp.html?id=${product.id}`;
                    });

                    productList.appendChild(div);
                });
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

updateProductList();
