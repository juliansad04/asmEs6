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
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

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

function getCateIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}
let cateData;

function populateCateForm(cateId) {
  const cateRef = child(dbRef, `category/${cateId}`);

  get(cateRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        cateData = snapshot.val();
        console.log(cateData);
        document.getElementById("categoryName").value = cateData.name;
      } else {
        console.log("Cate not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching cate:", error);
    });
}

const cateId = getCateIdFromURL();
if (cateId) {
  populateCateForm(cateId);
} else {
  console.error("Cate ID not found in URL");
}

document
  .getElementById("categoryForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const cateId = getCateIdFromURL();

    if (!cateId) {
      console.error("Category ID not found in URL");
      return;
    }

    const cateRef = child(dbRef, `category/${cateId}`);
    const categoryName = document.getElementById("categoryName").value;

    const updatedCateData = {
      name: categoryName,
    };

    update(cateRef, updatedCateData)
      .then(() => {
        console.log("Category updated successfully!");
        window.location.href = "category.html";
      })
      .catch((error) => {
        console.error("Error updating category:", error);
      });
  });
