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
function getProductIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}
let productData;
function populateProductForm(productId) {
  const productRef = child(dbRef, `products/${productId}`);

  get(productRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        productData = snapshot.val();
        console.log(productData);
        document.getElementById("productName").value = productData.name;
        document.getElementById("category").value = productData.cate_id;
        document.getElementById("description").value = productData.detail;
        document.getElementById("price").value = productData.price;

        const preview = document.getElementById("imagePreview");
        const label = document.querySelector(".custom-file-label");
        preview.src = productData.image;
        preview.style.display = "block";
        label.innerHTML = productData.image;

        listCategory();
      } else {
        console.log("Product not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching product:", error);
    });
}

document
  .getElementById("addProductForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const productId = getProductIdFromURL();

    if (!productId) {
      console.error("Product ID not found in URL");
      return;
    }

    const productRef = child(dbRef, `products/${productId}`);
    const productName = document.getElementById("productName").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;

    const newImageFile = document.getElementById("image").files[0];

    if (newImageFile) {
      const storage = getStorage();
      const storageReference = storageRef(
        storage,
        `images/${newImageFile.name}`
      );

      await uploadBytes(storageReference, newImageFile);

      const imageUrl = await getDownloadURL(storageReference);

      const updatedProductData = {
        name: productName,
        cate_id: category,
        detail: description,
        price: price,
        image: imageUrl,
      };

      update(productRef, updatedProductData)
        .then(() => {
          console.log("Product updated successfully!");
          window.location.href = "products.html";
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    } else {
      const updatedProductData = {
        name: productName,
        cate_id: category,
        detail: description,
        price: price,
      };

      update(productRef, updatedProductData)
        .then(() => {
          console.log("Product updated successfully!");
          window.location.href = "products.html";
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    }
  });

const productId = getProductIdFromURL();
if (productId) {
  populateProductForm(productId);
} else {
  console.error("Product ID not found in URL");
}

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

          if (Number(category.id) === Number(productData.cate_id)) {
            listItem.selected = true;
          }

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
