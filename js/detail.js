import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
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
    appId: "1:96233696774:web:b47da30031cc6231269d87",
};

initializeApp(firebaseConfig);

const dbRef = ref(getDatabase());

//chitietsanpham

// Trang chitietsp.html
function getProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    console.log(productId);

    get(child(dbRef, `products/${productId}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const product_detail = snapshot.val();
                // Hiển thị chi tiết sản phẩm theo product_detail
                const detailList = document.querySelector(".product_detail");
                detailList.innerHTML = "";
                detailList.innerHTML = "";

                const div = document.createElement("div");
                div.classList = `wrapper row`;
                let htmls = `<div class="preview col-md-6">
              <div class="preview-pic tab-content">
                <div class="tab-pane active" id="pic-1"><img src="images/vanhoc${product_detail.id}.jpg" alt="..." width="100%" height="700px"></div>
              </div>
          </div>
          <div class="details col-md-6">
              <h3 class="product-title">${product_detail.name}</h3>
              <h5 class="id-sp">Mã sản phẩm: ${product_detail.id}</h5>
              <h5 class="id-cate">Loại sản phẩm : ${product_detail.cate_id}</h5>
              <div class="rating">
                  <div class="stars">
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                  </div>
                  <span class="review-no">41 reviews</span>
              </div>
              <p class="product-description">${product_detail.detail}</p>
              <h3 class="price-product">Giá:</h3>
              <h3 class="price-value">${product_detail.price} VND</h3>
              <div class="action">
                  <button class="add-to-cart btn btn-default" type="button">Thêm vào giỏ</button>
                  <button class="like btn btn-default" type="button"><span class="fa fa-heart"></span></button>
              </div>
              <div class="splienquan">
                                            <h1>Sản phẩm liên quan</h1>
                                            <div class="container-fluidf">
                                                <div class="row">
                                                    <div class="product-lienquan col-md-4">
                                                        <div class="product-img">
                                                            <div class="label-offer bg-red"></div>
                                                            <a href="chitietsp.html"><img src="images/vanhoc2.jpg" alt="..." width="" height="260px"></a>
                                                            <div class="product-cart">
                                                                <button id="add-cart">Thêm vào giỏ</button>
                                                            </div>
                                                        </div>
                                                        <div class="product-info">
                                                            <a href="#!">Sp liên quan 1</a>
                                                            <p class="price text-center m-0">
                                                                <span class="product_price">Giá: 180.000</span>
                                                            </p>
                                                        </div>
                                                      </div>
                                                      <!-- splienquan2 -->
                                                      <div class="product-lienquan col-md-4">
                                                        <div class="product-img">
                                                            <div class="label-offer bg-red"></div>
                                                            <a href="chitietsp.html"><img src="images/vanhoc3.jpg" alt="..." width="" height="260px"></a>
                                                            <div class="product-cart">
                                                                <button id="add-cart">Thêm vào giỏ</button>
                                                            </div>
                                                        </div>
                                                        <div class="product-info">
                                                            <a href="#!">Sp liên quan 2</a>
                                                            <p class="price text-center m-0">
                                                                <span class="product_price">Giá: 199.000</span>
                                                            </p>
                                                        </div>
                                                      </div>
                                                </div>
                                            </div>
                                          </div>
          </div>`;
                div.innerHTML = htmls;
                detailList.appendChild(div);
            } else {
                console.log("Product not found");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

getProductDetail();