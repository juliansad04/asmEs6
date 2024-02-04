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

window.updateStatus = function (key) {
  const selectedStatus = document.querySelector(
    `input[name="status_${key}"]:checked`
  );

  if (selectedStatus) {
    const newStatus = selectedStatus.value;

    update(child(dbRef, `orders/${key}`), { status: newStatus })
      .then(() => {
        console.log("Trạng thái đã được cập nhật thành công.");
        listOrders();
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật trạng thái:", error);
      });
  } else {
    console.error("Vui lòng chọn trạng thái.");
  }
};

const ordersList = document.querySelector(".list__order");
console.log(ordersList);
function listOrders() {
  ordersList.innerHTML = "";
  get(child(dbRef, "orders"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const orders = snapshot.val();
        console.log(orders);
        Object.entries(orders).forEach(([key, order]) => {
          const row = document.createElement("tr");
          row.classList.add("list__product-tr");
          row.innerHTML = `
            <td>${key}</td>
            <td>${order.customer_name}</td>
            <td>${order.customer_email}</td>
            <td>${order.customer_phone}</td>
            <td>${order.customer_address}</td>
            <td>${order.order_date}</td>
            <td>
                            <div class="status-options">
    <label>
        <input type="radio" name="status_${key}" value="Đang xử lý" ${
            order.status === "Đang xử lý" ? "checked" : ""
          }>
        Đang xử lý
    </label>
    <label>
        <input type="radio" name="status_${key}" value="Đang vận chuyển" ${
            order.status === "Đang vận chuyển" ? "checked" : ""
          }>
        Đang vận chuyển
    </label>
    <label>
        <input type="radio" name="status_${key}" value="Đã giao hàng" ${
            order.status === "Đã giao hàng" ? "checked" : ""
          }>
        Đã giao hàng
    </label>
</div>
<button class="btn btn-primary" onclick="updateStatus('${key}')">Cập nhật</button>
                        </td>
            <td><a href="./order_detail.html?id=${key}">Xem chi tiết</a></td>`;

          ordersList.appendChild(row);
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

listOrders();
