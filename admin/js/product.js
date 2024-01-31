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

const productList = document.querySelector(".list__product");
console.log(productList);
function listProduct() {
  productList.innerHTML = "";
  get(child(dbRef, "products"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const products = snapshot.val();
        console.log(products);
        products.forEach((product) => {
          const row = document.createElement("tr");
          row.classList.add("list__product-tr");

          row.innerHTML = `
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.cate_id}</td>
          <td>${product.detail}</td>
          <td>${product.price}</td>
          <td><img src="../images/vanhoc${product.id}.jpg" alt="..." width="100px" height="150px"></td>
          <td>
              <button class="btn btn-warning btn-sm">
                  <a href="edit-product.html"
                      style="color: white; text-decoration: none;">Chỉnh sửa</a>
              </button>
              <button class="btn btn-danger btn-sm"
                  onclick="deleteRow()">Xóa</button>
          </td>`;

          productList.appendChild(row);
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

listProduct();