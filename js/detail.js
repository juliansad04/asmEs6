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
  databaseURL:
    "https://thanhnppcecma-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "thanhnppcecma",
  storageBucket: "thanhnppcecma.appspot.com",
  messagingSenderId: "96233696774",
  appId: "1:96233696774:web:b47da30031cc6231269d87",
};

initializeApp(firebaseConfig);

const dbRef = ref(getDatabase());

//chitietsanpham
function getRelatedProducts(cateId) {
  return get(child(dbRef, "products"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const allProducts = snapshot.val();
        const relatedProducts = [];

        // Lọc ra các sản phẩm có cùng cate_id
        for (const key in allProducts) {
          if (allProducts[key].cate_id === cateId) {
            relatedProducts.push(allProducts[key]);
          }
        }

        return relatedProducts;
      } else {
        console.log("No product data available");
        return [];
      }
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
}
// Trang chitietsp.html
function getProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  get(child(dbRef, `products/${productId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const product_detail = snapshot.val();

        getRelatedProducts(product_detail.cate_id).then((relatedProducts) => {
          console.log("Các sản phẩm cùng loại:", relatedProducts);

          const detailList = document.querySelector(".product_detail");
          detailList.innerHTML = "";

          const div = document.createElement("div");
          div.classList = `wrapper row`;
          let htmls = `<div class="preview col-md-6">
                <div class="preview-pic tab-content">
                  <div class="tab-pane active" id="pic-1"><img src="${
                    product_detail.image
                  }.jpg" alt="..." width="100%" height="700px"></div>
                </div>
            </div>
            <div class="details col-md-6">
                <h3 class="product-title">${product_detail.name}</h3>
                <p class="product-desc mb-2">${product_detail.detail}</p>
                <p class="price" style="width: fit-content">
          <span class="product_price">Giá: ${Number(
            product_detail.price
          ).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}</span>
        </p>
                <div class="action">
                    <button class="add-to-cart btn btn-default" type="button">Thêm vào giỏ</button>
                    <button class="like btn btn-default" type="button"><span class="fa fa-heart"></span></button>
                </div>
                <div class="splienquan">
                  <h1>Sản phẩm liên quan</h1>
                  <div class="container-fluidf">
                    <div class="row">

                      <!-- Thay đổi ở đây để sử dụng dữ liệu từ relatedProducts -->
                      ${relatedProducts
                        .filter(
                          (relatedProduct) => relatedProduct.id !== productId
                        )
                        .slice(0, 3)
                        .map((relatedProduct) => {
                          return `
              <div class="product-lienquan col-md-4">
                <div class="product-img">
                  <div class="label-offer bg-red"></div>
                  <a href="chitietsp.html?id=${relatedProduct.id}">
                    <img src="${
                      relatedProduct.image
                    }.jpg" alt="..." width="" height="260px">
                  </a>
                  <div class="product-cart">
                    <button id="add-cart">Thêm vào giỏ</button>
                  </div>
                </div>
                <div class="product-info">
                  <a href="chitietsp.html?id=${relatedProduct.id}">${
                            relatedProduct.name
                          }</a>
                  <p class="price text-center m-0">
                    <span class="product_price">Giá: ${Number(
                      relatedProduct.price
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}</span>
                  </p>
                </div>
              </div>
            `;
                        })
                        .join("")}
                      <!-- Kết thúc phần thay đổi -->
                    </div>
                  </div>
                </div>
            </div>`;
          div.innerHTML = htmls;
          detailList.appendChild(div);
        });
      } else {
        console.log("Product not found");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

getProductDetail();
