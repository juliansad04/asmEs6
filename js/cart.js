document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  displayCartItems(cart);

  document.addEventListener("click", function (event) {
    const target = event.target;

    const decreaseBtn = target.closest(".decrease-quantity");
    const increaseBtn = target.closest(".increase-quantity");
    const deleteBtn = target.closest(".delete-product");

    if (decreaseBtn) {
      const productId = decreaseBtn
        .closest(".cart-item")
        .getAttribute("data-product-id");
      decreaseQuantity(productId);
    } else if (increaseBtn) {
      const productId = increaseBtn
        .closest(".cart-item")
        .getAttribute("data-product-id");
      increaseQuantity(productId);
    } else if (deleteBtn) {
      const productId = deleteBtn
        .closest(".cart-item")
        .getAttribute("data-product-id");
      deleteProduct(productId);
    }
  });

  function displayCartItems(cart) {
    const cartItemsContainer = document.querySelector("tbody");
    const totalRow = document.querySelector(".total-row");
    cartItemsContainer.innerHTML = "";

    let totalAmount = 0;

    for (const productId in cart) {
      const product = cart[productId];
      const totalPrice =
        product.quantity * parseFloat(product.price.replace(/[^\d.]/g, ""));
      totalAmount += totalPrice;

      const html = `
          <tr class="cart-item" data-product-id="${productId}">
            <td class="align-middle">${product.name}</td>
            <td class="align-middle">
              <div class="d-flex flex-row">
                <button class="btn btn-link px-2 decrease-quantity">
                 <i class="fa-solid fa-minus"></i>
                </button>
                <input class="form-control form-control-sm quantity-input" min="0" name="quantity" value="${
                  product.quantity
                }" type="number" style="width: 50px; margin-bottom: 0" />
                <button class="btn btn-link px-2 increase-quantity">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </td>
            <td class="align-middle">${product.price}</td>
            <td class="align-middle">${totalPrice.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}</td>
            <td class="edit--cart align-middle">
              <button type="button" class="btn btn-danger delete-product">
                Xóa
              </button>
            </td>
          </tr>
        `;
      cartItemsContainer.innerHTML += html;
    }

    totalRow.innerHTML = `
        <td colspan="3" class="text-end h5">Tổng tiền:</td>
        <td class="h5">${totalAmount.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}</td>
        <td></td>
      `;
  }

  function decreaseQuantity(productId) {
    console.log(productId);
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[productId] && cart[productId].quantity > 0) {
      cart[productId].quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCartItems(cart);
    }
  }

  function increaseQuantity(productId) {
    console.log(productId);
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[productId]) {
      cart[productId].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCartItems(cart);
    }
  }

  function deleteProduct(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[productId]) {
      delete cart[productId];
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCartItems(cart);
    }
  }
});
