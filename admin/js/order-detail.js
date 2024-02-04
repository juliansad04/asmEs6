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

const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get("id");

function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

async function populateOrderDetails(orderId) {
  const orderDetailsContainer = document.getElementById("orderDetails");

  if (orderDetailsContainer) {
    const snapshot = await get(child(dbRef, `order_detail`));

    if (snapshot.exists()) {
      const inputData = snapshot.val();
      const filteredData = Object.keys(inputData)
        .filter((key) => inputData[key].order_id === orderId)
        .reduce((result, key) => {
          result[key] = inputData[key];
          return result;
        }, {});

      const orderDetails = Object.values(filteredData);

      const orderSnapshot = await get(child(dbRef, `orders/${orderId}`));

      if (orderSnapshot.exists()) {
        const orderData = orderSnapshot.val();

        let html = `
              <h5 class="font-weight-bold mb-4">Thông tin đơn hàng ${orderId}</h5>
              <ul class="list-unstyled">
                <li><strong>Tên khách hàng:</strong> ${orderData.customer_name}</li>
                <li><strong>Email:</strong> ${orderData.customer_email}</li>
                <li><strong>Số điện thoại:</strong> ${orderData.customer_phone}</li>
                <li><strong>Địa chỉ:</strong> ${orderData.customer_address}</li>
                <li><strong>Ngày đặt hàng:</strong> ${orderData.order_date}</li>
                <li><strong>Trạng thái:</strong> ${orderData.status}</li>
              </ul>
              <h5 class="font-weight-bold mb-4">Danh sách sản phẩm</h5>
              <table class="table table-bordered" id="orderItemsTable">
                <thead>
                  <tr>
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
            `;

        if (orderDetails) {
          for (const item of orderDetails) {
            if (item.product_id) {
              const productsSnapshot = await get(child(dbRef, `products`));

              if (productsSnapshot.exists()) {
                const product_detail = productsSnapshot.val();
                for (const productId in product_detail) {
                  const product = product_detail[productId];
                  const product_id = productId;
                  const product_name = product.name;
                  if (
                    product_id.toLocaleLowerCase() ===
                    item.product_id.toLocaleLowerCase()
                  ) {
                    item.product_name = product_name;
                  }
                }
              }
            }
          }
        }

        orderDetails.forEach((item) => {
          console.log(item);
          html += `
            <tr>
              <td>${item.product_id}</td>
              <td>${item.product_name}</td>
              <td>${item.quantity}</td>
              <td>${formatCurrency(item.unit_price)}</td>
              <td>${formatCurrency(item.quantity * item.unit_price)}</td>
            </tr>
          `;
        });

        html += `
            </tbody>
          </table>
        `;

        orderDetailsContainer.innerHTML = html;
      }
    } else {
      console.log("No order details available");
    }
  }
}

populateOrderDetails(orderId);
