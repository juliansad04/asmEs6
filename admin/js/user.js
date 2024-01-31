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

const userList = document.querySelector(".list__user");
console.log(userList);
function listCategory() {
  userList.innerHTML = "";
  get(child(dbRef, "users"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        console.log(users);
        users.forEach((user) => {
          const row = document.createElement("tr");
          row.classList.add("list__user-tr");

          row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>${user.password}</td>
          <td>${user.role}</td>
          <td>
              <button class="btn btn-warning btn-sm">
                  <a href="edit-account.html"
                      style="color: white; text-decoration: none;">chỉnh sửa</a>
              </button>
              <button class="btn btn-danger btn-sm"
                  onclick="deleteRow()">Xóa</button>
          </td>
          `;

          userList.appendChild(row);
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

listCategory();