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

function updateCateList() {
    const categoryList = document.getElementById("categorySelect");
    categoryList.innerHTML = "";

    get(child(dbRef, "category"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const categories = snapshot.val();

                // Check if categories is an object, then convert it to an array of objects
                const categoriesArray = Array.isArray(categories) ? categories : Object.values(categories);

                categoryList.innerHTML = `
            <option value="all">Tất cả danh mục</option>
            ${categoriesArray
                    .map((category) => {
                        return `<option value="${category.name}">${category.name}</option>`;
                    })
                    .join("")}
          `;
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

updateCateList();

