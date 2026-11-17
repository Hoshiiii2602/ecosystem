# API SPECIFICATION

## 1. Base URL
- Local: `http://localhost:3000`
- Production (Ngrok): `https://<your-ngrok-subdomain>.ngrok-free.app`

## 2. Authentication
- `POST /auth/register-store`: Đăng ký cửa hàng mới.
- `POST /auth/login`: Đăng nhập.
- `POST /auth/refresh-token`: Lấy access token mới.
- `POST /auth/logout`: Đăng xuất.

## 3. Product Management
- `GET /products`: Lấy danh sách sản phẩm.
- `POST /products`: Tạo sản phẩm mới.
- `GET /products/:id`: Chi tiết sản phẩm.
- `PATCH /products/:id`: Cập nhật sản phẩm.
- `DELETE /products/:id`: Xóa sản phẩm.

## 4. POS & Orders
- `POST /orders`: Tạo đơn hàng mới (Checkout).
- `GET /orders`: Lịch sử đơn hàng.
- `GET /orders/:id`: Chi tiết đơn hàng.

## 5. Inventory
- `GET /inventory`: Xem tồn kho.
- `POST /inventory/adjust`: Điều chỉnh tồn kho.
- `POST /inventory/check`: Phiếu kiểm kho.

## 6. Standards
- Định dạng dữ liệu: JSON.
- Response structure:
  ```json
  {
    "success": true,
    "data": {},
    "message": "Success",
    "meta": { "total": 100, "page": 1 }
  }
  ```
- Error codes: 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Internal Server Error).
