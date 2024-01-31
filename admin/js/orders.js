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

const ordersList = document.querySelector(".list__order");
console.log(ordersList);
function listOrders() {
  ordersList.innerHTML = "";
  get(child(dbRef, "orders"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const orders = snapshot.val();
        console.log(orders);
        orders.forEach((order) => {
          const row = document.createElement("tr");
          row.classList.add("list__product-tr");
          row.innerHTML = `
                                            <td>${order.id}</td>
                                            <td>${order.customer_name}</td>
                                            <td>${order.customer_email}</td>
                                            <td>${order.customer_phone}</td>
                                            <td>${order.customer_address}</td>
                                            <td>${order.order_date}</td>
                                            <th>${order.status}</th>
                                            <td><a href="./order_detail.html">Xem chi tiết</a></td>`;

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

//order detail
