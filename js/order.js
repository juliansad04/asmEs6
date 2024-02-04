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

document.addEventListener("DOMContentLoaded", function () {
  const orderButton = document.querySelector(".thanh-toan");
  orderButton.addEventListener("click", handleOrder);

  function handleOrder() {
    console.log("click");
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const cart = JSON.parse(localStorage.getItem("cart")) || {};

    const order = {
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      customer_address: address,
      order_date: new Date().toISOString(),
      status: "Đang xử lý",
    };

    const newOrderRef = push(ref(getDatabase(), "orders"), order);

    const orderId = newOrderRef.key;

    Object.keys(cart).forEach((productId) => {
      const product = cart[productId];
      const orderDetailData = {
        order_id: orderId,
        product_id: productId,
        quantity: product.quantity,
        unit_price: product.price.replace("Giá: ", "").replace(",", ""),
      };

      push(ref(getDatabase(), "order_detail"), orderDetailData);
    });

    localStorage.removeItem("cart");

    Swal.fire({
      title: "Thành công",
      text: "Bạn đã đặt hàng thành công",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "index.html";
      } else {
        window.location.href = "index.html";
      }
    });
  }
});
