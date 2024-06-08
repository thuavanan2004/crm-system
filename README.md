# Hướng dẫn Triển khai Ứng dụng trên Máy chủ

## Bước 1: Chuẩn bị môi trường

Cài đặt Node.js và npm

Tải Node.js từ Node.js và cài đặt theo hướng dẫn trên trang web.
Kiểm tra phiên bản Node.js và npm đã cài đặt:
bash
Sao chép mã
node -v
npm -v
Cài đặt MongoDB

Tải MongoDB từ MongoDB và cài đặt theo hướng dẫn trên trang web.
Khởi động MongoDB:
bash
Sao chép mã
mongod

## Bước 2: Lấy mã nguồn và cài đặt các gói cần thiết

Clone repository

bash
Sao chép mã
git clone https://github.com/username/your-repo.git
cd your-repo
Cài đặt các gói npm

bash
Sao chép mã
npm install

## Bước 3: Cấu hình môi trường

Tạo file .env và thêm các biến môi trường cần thiết
bash
Sao chép mã
PORT=3002
MONGO_URI=mongodb://localhost:27017/your-database
SESSION_SECRET=your-session-secret

## Bước 4: Khởi động ứng dụng

Chạy ứng dụng

bash
Sao chép mã
npm start
Kiểm tra ứng dụng trên trình duyệt

Truy cập http://localhost:3002/admin để vào giao diện quản trị.

# Ví dụ về mẫu dữ liệu API

## Account bên Admin

### 1. Đăng nhập

Request:
POST /api/v1/auth/login
Content-Type: application/json
Response:
{
"code": 200,
"message": "Đăng nhập thành công!",
"token": "PpuE9iA0Xh7f9d15AZBmkMTc0Qt02P"
}

### 2. Đăng ký

Request:
POST /api/v1/auth/register
Content-Type: application/json
Response:
{
"code": 200,
"message": "Tạo tài khoản thành công!"
}

### 3. Lấy thông tin chi tiết tài khoản

Request:
GET /api/v1/auth/detail/:id
Response:
"account": {
"\_id": "6663aaef710cc9cfe6070685",
"fullName": "Thừa Văn An",
"email": "thuavanan@gmail.com",
"password": "e10adc3949ba59abbe56e057f20f883e",
"token": "PpuE9iA0Xh7f9d15AZBmkMTc0Qt02P",
"phone": "+0868936041",
"avatar": "https://example.com/avatars/charlie.jpg",
"status": "active",
"deleted": false,
"createdAt": "2024-06-08T00:50:55.682Z",
"updatedAt": "2024-06-08T00:50:55.682Z",
"\_\_v": 0
}

### 4. Xóa tài khoản

Request:
DELETE /api/v1/auth/delete/:id
Accept: application/json
