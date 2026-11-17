# ECOSYSTEM - Hệ Thống Quản Lý Bán Hàng Đa Nền Tảng

Dự án quản lý bán hàng (Retail Management Ecosystem) bao gồm Backend (NestJS), CMS (Next.js) và Mobile App (Flutter).

## 🚀 Khởi động nhanh với Docker

Toàn bộ hệ thống (trừ Flutter) có thể khởi chạy bằng Docker Compose:

```bash
# Bắt đầu hệ thống
./scripts/start.sh

# Dừng hệ thống
./scripts/stop.sh
```

Hệ thống bao gồm:
- **Backend API**: http://localhost:3000
- **CMS Admin**: http://localhost:3001
- **Database**: PostgreSQL
- **Cache**: Redis
- **Storage**: MinIO
- **Tunnel**: Ngrok (Expose API ra Internet cho Mobile App)

## 📱 Hướng dẫn chạy App Mobile (Flutter)

Để chạy ứng dụng Mobile, hãy đảm bảo bạn đã cài đặt Flutter SDK.

### 1. Cấu hình API URL
Mở file `mobile/lib/core/api/api_client.dart` và cập nhật `baseUrl` thành URL Ngrok của bạn (nếu chạy trên thiết bị thật) hoặc `http://10.0.2.2:3000` (nếu chạy trên Android Emulator).

### 2. Cài đặt thư viện
```bash
cd mobile
flutter pub get
```

### 3. Sinh code tự động (Freezed, JSON Serializable)
Ứng dụng sử dụng Freezed để sinh code model. Chạy lệnh sau để sinh các file `.freezed.dart` và `.g.dart`:

```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

### 4. Chạy ứng dụng
```bash
flutter run
```

## 🛠 Cấu trúc thư mục

- `/backend`: NestJS API Server (Prisma ORM, PostgreSQL).
- `/cms`: Next.js Web Administration.
- `/mobile`: Flutter Mobile Application.
- `/scripts`: Các script vận hành hệ thống.

## 🔑 Tài khoản mặc định
Sau khi đăng ký cửa hàng trên CMS, tài khoản đầu tiên sẽ có quyền **Owner** (Toàn quyền).

## 📝 Ghi chú
- Đảm bảo đã copy `.env.example` thành `.env` và điền `NGROK_AUTHTOKEN`.
- Backend tự động migrate database khi khởi động.
