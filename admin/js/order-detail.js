const orderDetailData = {
  orderId: "DH123456",
  customerName: "Nguyen Van A",
  email: "nguyenvana@example.com",
  phoneNumber: "0123456789",
  address: "123 Example Street, City",
  orderDate: "2024-02-01",
  status: "Đã giao hàng",
  orderItems: [
    {
      productId: "P001",
      productName: "Product A",
      quantity: 2,
      unitPrice: 150000,
      totalPrice: 300000,
    },
    {
      productId: "P002",
      productName: "Product B",
      quantity: 1,
      unitPrice: 200000,
      totalPrice: 200000,
    },
  ],
};

function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

function populateOrderDetails() {
  const orderDetailsContainer = document.getElementById("orderDetails");

  if (orderDetailsContainer) {
    let html = `
                <h5 class="font-weight-bold mb-4">Thông tin đơn hàng ${orderDetailData.orderId}</h5>
                <ul class="list-unstyled">
                    <li><strong>Tên khách hàng:</strong> ${orderDetailData.customerName}</li>
                    <li><strong>Email:</strong> ${orderDetailData.email}</li>
                    <li><strong>Số điện thoại:</strong> ${orderDetailData.phoneNumber}</li>
                    <li><strong>Địa chỉ:</strong> ${orderDetailData.address}</li>
                    <li><strong>Ngày đặt hàng:</strong> ${orderDetailData.orderDate}</li>
                    <li><strong>Trạng thái:</strong> ${orderDetailData.status}</li>
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

    orderDetailData.orderItems.forEach((item) => {
      html += `
                    <tr>
                        <td>${item.productId}</td>
                        <td>${item.productName}</td>
                        <td>${item.quantity}</td>
                        <td>${formatCurrency(item.unitPrice)}</td>
                        <td>${formatCurrency(item.totalPrice)}</td>
                    </tr>
                `;
    });

    html += `
                    </tbody>
                </table>
            `;

    orderDetailsContainer.innerHTML = html;

    $(document).ready(function () {
      $("#orderItemsTable").DataTable();
    });
  }
}

populateOrderDetails();
