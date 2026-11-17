# PROJECT PLAN: RETAIL MANAGEMENT ECOSYSTEM

## 1. Project Overview
Xây dựng hệ sinh thái quản lý bán hàng đa nền tảng tương tự KiotViet, bao gồm Backend (NestJS), CMS Web (Next.js) và Mobile App (Flutter).

## 2. Roadmap (Phases)

### Phase 1: Project Foundation (Current)
- [ ] Khởi tạo cấu trúc Monorepo.
- [ ] Thiết lập Docker Compose (PostgreSQL, Redis, MinIO, Ngrok).
- [ ] Khởi tạo Backend NestJS.
- [ ] Khởi tạo CMS Next.js.
- [ ] Khởi tạo Flutter App.
- [ ] Cấu hình CI/CD cơ bản (Scripts start/stop).

### Phase 2: Authentication & Multi-tenancy
- [ ] Đăng nhập, Đăng ký cửa hàng.
- [ ] Quản lý User, Role, Permission (RBAC).
- [ ] Cơ chế Tenant Isolation (Multi-tenant).

### Phase 3: Core Business Modules
- [ ] Quản lý Sản phẩm & Danh mục.
- [ ] Quản lý Tồn kho & Kiểm kho.
- [ ] Quản lý Khách hàng & Nhà cung cấp.

### Phase 4: POS & Order Management
- [ ] Giao diện bán hàng POS.
- [ ] Thanh toán, In hóa đơn.
- [ ] Quản lý Đơn hàng, Trả hàng.

### Phase 5: Advanced Features & Reporting
- [ ] Dashboard & Báo cáo doanh thu.
- [ ] Quản lý Khuyến mãi.
- [ ] Hệ thống Thông báo (Notification).

### Phase 6: Finalization & Testing
- [ ] Tối ưu UI/UX Mobile & Web.
- [ ] Viết Unit/Integration Tests.
- [ ] Security Audit & Performance Tuning.

## 3. Tech Stack
- **Backend:** NestJS, Prisma, PostgreSQL, Redis.
- **CMS:** Next.js, Tailwind CSS, TanStack Query.
- **Mobile:** Flutter, Riverpod, Clean Architecture.
- **Infrastructure:** Docker, Ngrok, MinIO.
