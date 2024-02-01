import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  get,
  child,
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
  storageBucket: "thanhnppcecma.appspot.com",
};

initializeApp(firebaseConfig);

const dbRefProduct = ref(getDatabase(), "products");

window.addProduct = async function (event) {
  event.preventDefault();

  const imageFile = document.getElementById("image").files[0];

  const storage = getStorage();
  const storageReference = storageRef(storage, `images/${imageFile.name}`);

  await uploadBytes(storageReference, imageFile);

  const imageUrl = await getDownloadURL(storageReference);

  const productsRef = ref(getDatabase(), "products");
  const newProductRef = push(productsRef);

  const productData = {
    id: newProductRef.key,
    name: document.getElementById("productName").value,
    cate_id: document.getElementById("category").value,
    detail: document.getElementById("description").value,
    price: document.getElementById("price").value,
    image: imageUrl,
  };

  set(newProductRef, productData);

  window.location.href = "products.html";

  console.log(productData);
  console.log("Product added successfully!");
};

/* ----------------------------------------------------------- */

const dbRef = ref(getDatabase());

const categoryList = document.querySelector("#category");

function listCategory() {
  categoryList.innerHTML = "";

  get(child(dbRef, "category"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const categories = snapshot.val();

        Object.values(categories).forEach((category) => {
          const listItem = document.createElement("option");
          listItem.classList.add("option-item");

          listItem.value = category.id;
          listItem.textContent = category.name;

          categoryList.appendChild(listItem);
        });

        console.log(categoryList);
      } else {
        console.log("No category available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

listCategory();
