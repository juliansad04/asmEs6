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

let page = 1;
const productsPerPage = 4;
let totalPages;

function updateProductList() {
  const productList = document.querySelector(".product__wrap");
  productList.innerHTML = "";

  get(child(dbRef, "products"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const products = snapshot.val();

        console.log(products);

        const startIndex = (page - 1) * productsPerPage;
        const endIndex = page * productsPerPage;

        Object.values(products)
          .slice(startIndex, endIndex)
          .map((product) => {
            const div = document.createElement("div");
            div.classList = `col-11 col-sm-6 col-lg-6 col-xl-3 mt-5`;
            div.setAttribute("data-product-id", product.id);

            let htmls = `<div class="product-details">
            <div class="product-img">
                <div class="label-offer bg-red"></div>
                <a href="chitietsp.html?id=${product.id}"><img src="${
              product.image
            }" alt="..." width="100%" height="260px"></a>
                <div class="product-cart">
                    <button id="add-cart">Thêm vào giỏ</button>
                </div>
            </div>

            <div class="product-info">
                <a href="#!">${product.name}</a>
                <p class="price text-center m-0">
                    <span class="product_price">Giá: ${product.price.toLocaleString(
                      "vi-VN",
                      { style: "currency", currency: "VND" }
                    )}</span>
                </p>
            </div>
          </div>`;

            div.innerHTML = htmls;

            const imgElement = div.querySelector("img");
            imgElement.addEventListener("click", () => {
              window.location.href = `chitietsp.html?id=${product.id}`;
            });

            productList.appendChild(div);
          });

        renderPagination(Object.values(products).length);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function renderPagination(totalProducts) {
  totalPages = Math.ceil(totalProducts / productsPerPage);
  const paginationElement = document.getElementById("pagination");
  paginationElement.innerHTML = "";

  paginationElement.innerHTML += `
        <li class="page-item">
            <a class="page-link bg-danger text-white" href="#" onclick="changePage(${
              page - 1
            })" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>`;

  for (let i = 1; i <= totalPages; i++) {
    const activeClass = i === page ? "active" : "";

    paginationElement.innerHTML += `
            <li class="page-item ${activeClass}"> 
                <a class="page-link bg-danger text-white" href="#" onclick="changePage(${i})">${i}</a>
            </li>`;
  }

  paginationElement.innerHTML += `
        <li class="page-item">
            <a class="page-link bg-danger text-white" href="#" onclick="changePage(${
              page + 1
            })" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>`;
}

window.changePage = function (newPage) {
  event.preventDefault();
  if (newPage >= 1 && newPage <= totalPages) {
    page = newPage;
    updateProductList();
  }
};

updateProductList();

/* ------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  const productList = document.querySelector(".product__wrap");
  productList.addEventListener("click", function (event) {
    const target = event.target;
    if (target.id === "add-cart") {
      const productElement = target.closest(".col-11");
      const productId = productElement.getAttribute("data-product-id");
      const productName =
        productElement.querySelector(".product-info a").innerText;
      const productPrice =
        productElement.querySelector(".product_price").innerText;

      addToCart(productId, productName, productPrice);
    }
  });
});

function addToCart(productId, productName, productPrice) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  const productIdLowerCase = productId.toLowerCase();

  if (cart[productIdLowerCase]) {
    cart[productIdLowerCase].quantity += 1;
  } else {
    cart[productIdLowerCase] = {
      name: productName,
      price: productPrice,
      quantity: 1,
    };
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showNotification(productName);
}

function showNotification(productName) {
  FuiToast.success(`Đã thêm ${productName} vào giỏ hàng!`);
}


