# DATABASE DESIGN

## 1. Entity Relationship Diagram (ERD) Concepts

### Core Tables
- `stores`: Quản lý thông tin cửa hàng (Tenant).
- `users`: Người dùng hệ thống.
- `roles` & `permissions`: Phân quyền RBAC.
- `branches`: Chi nhánh của cửa hàng.

### Product & Inventory
- `products`: Thông tin sản phẩm.
- `product_variants`: Các biến thể của sản phẩm (màu sắc, kích thước).
- `categories`: Danh mục sản phẩm.
- `inventories`: Số lượng tồn kho theo chi nhánh.
- `inventory_transactions`: Lịch sử nhập/xuất/kiểm kho.

### Sales & Orders
- `orders`: Thông tin hóa đơn bán hàng.
- `order_items`: Chi tiết sản phẩm trong đơn hàng.
- `payments`: Thông tin thanh toán.
- `customers`: Thông tin khách hàng.

### Supply Chain
- `suppliers`: Nhà cung cấp.
- `purchase_orders`: Đơn nhập hàng.
- `purchase_order_items`: Chi tiết đơn nhập hàng.

## 2. Multi-tenancy Strategy
- Mọi bảng liên quan đến nghiệp vụ (products, orders, customers,...) đều có cột `store_id`.
- Index sẽ được tạo trên `store_id` để tối ưu hóa truy vấn.

## 3. Data Integrity
- Sử dụng Database Transactions cho các nghiệp vụ POS và Inventory.
- Soft delete cho các dữ liệu quan trọng.
- Decimal cho các trường tiền tệ.
