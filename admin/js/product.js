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
        Object.values(products).forEach((product) => {
          const row = document.createElement("tr");
          row.classList.add("list__product-tr");

          console.log(product);

          row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.cate_id}</td>
            <td>${product.detail}</td>
            <td>${product.price}</td>
            <td><img src="${product.image}" alt="..." width="100px" height="150px"></td>
            <td>
                <button class="btn btn-warning btn-sm">
            <a href="edit-product.html?id=${product.id}"
                style="color: white; text-decoration: none;">Chỉnh sửa</a>
               </button>
                 <button class="btn btn-danger btn-sm"
                    onclick="deleteRow('${product.id}')">Xóa</button>
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

window.deleteRow = function (productId) {
  const isConfirmed = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");

  if (isConfirmed) {
    const productRef = child(dbRef, `products/${productId}`);

    console.log(productRef);

    remove(productRef)
      .then(() => {
        console.log("Product deleted successfully!");
        listProduct();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  }
};
