# Mobile Shop Backend - Fake Data API

Backend API for Mobile Shop ReactJS với dữ liệu giả để phát triển frontend trước.

## Cài đặt

### 1. Cài đặt Dependencies

```bash
cd backend
npm install
```

### 2. Chạy Server

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

Server sẽ chạy trên `http://localhost:3000`

## Tài khoản Test

Bạn có thể đăng nhập bằng các tài khoản sau:

### Admin Account

- Email: `admin@example.com`
- Password: `admin123`

### User Accounts

- Email: `john@example.com` | Password: `john123`
- Email: `jane@example.com` | Password: `jane123`

## API Endpoints

### User Routes

| Method | Endpoint                    | Auth | Mô tả                    |
| ------ | --------------------------- | ---- | ------------------------ |
| POST   | `/api/user/sign-up`         | No   | Đăng ký user mới         |
| POST   | `/api/user/sign-in`         | No   | Đăng nhập                |
| GET    | `/api/user/get-details/:id` | Yes  | Lấy thông tin user       |
| GET    | `/api/user/getAll`          | Yes  | Lấy tất cả users (Admin) |
| PUT    | `/api/user/update-user/:id` | Yes  | Cập nhật thông tin user  |
| DELETE | `/api/user/delete-user/:id` | Yes  | Xóa user                 |
| POST   | `/api/user/delete-many`     | Yes  | Xóa nhiều users          |
| POST   | `/api/user/refresh-token`   | No   | Refresh token            |
| POST   | `/api/user/log-out`         | No   | Đăng xuất                |

### Product Routes

| Method | Endpoint                       | Auth | Mô tả                                           |
| ------ | ------------------------------ | ---- | ----------------------------------------------- |
| GET    | `/api/product/get-all`         | No   | Lấy danh sách sản phẩm (có search & pagination) |
| GET    | `/api/product/get-all-type`    | No   | Lấy tất cả loại sản phẩm                        |
| GET    | `/api/product/get-details/:id` | No   | Lấy chi tiết sản phẩm                           |
| POST   | `/api/product/create`          | Yes  | Tạo sản phẩm mới                                |
| PUT    | `/api/product/update/:id`      | Yes  | Cập nhật sản phẩm                               |
| DELETE | `/api/product/delete/:id`      | Yes  | Xóa sản phẩm                                    |
| POST   | `/api/product/delete-many`     | Yes  | Xóa nhiều sản phẩm                              |

### Order Routes

| Method | Endpoint                           | Auth | Mô tả                       |
| ------ | ---------------------------------- | ---- | --------------------------- |
| POST   | `/api/order/create/:userId`        | Yes  | Tạo đơn hàng                |
| GET    | `/api/order/get-all-order/:id`     | Yes  | Lấy đơn hàng của user       |
| GET    | `/api/order/get-details-order/:id` | Yes  | Lấy chi tiết đơn hàng       |
| GET    | `/api/order/get-all-order`         | Yes  | Lấy tất cả đơn hàng (Admin) |
| DELETE | `/api/order/cancel-order/:id`      | Yes  | Hủy đơn hàng                |

## Cấu trúc Project

```
backend/
├── server.js                    # Entry point
├── package.json
├── .env
├── README.md
└── src/
    ├── controllers/
    │   ├── userController.js
    │   ├── productController.js
    │   └── orderController.js
    ├── routes/
    │   ├── userRoutes.js
    │   ├── productRoutes.js
    │   └── orderRoutes.js
    ├── middleware/
    │   └── authMiddleware.js
    └── data/
        └── fakeData.js          # Tất cả fake data ở đây
```

## Fake Data

Tất cả dữ liệu fake được lưu trong `src/data/fakeData.js`:

- **Products**: 8 sản phẩm điện thoại (iPhone, Samsung, Xiaomi, OPPO, Realme, Vivo)
- **Users**: 3 users (1 admin + 2 customers)
- **Orders**: 2 đơn hàng mẫu
- **Product Types**: 7 loại sản phẩm khác nhau

## Authentication

- Sử dụng JWT (JSON Web Tokens)
- Token được gửi trong header: `Authorization: Bearer <token>`
- Token có hiệu lực 7 ngày

## Lưu ý

⚠️ **ĐÂY LÀ FAKE BACKEND CHỈ DÙNG ĐỀ PHÁT TRIỂN**

- Tất cả dữ liệu được lưu trong memory (sẽ mất khi restart server)
- Không có database thực sự
- Passwords không được hash
- Token không được verify nghiêm ngặt
- Dùng cho phát triển frontend trước, sau này sẽ thay bằng backend thực

## Tiếp theo

Khi sẵn sàng triển khai backend thực:

1. Kết nối MongoDB hoặc database khác
2. Hash password với bcrypt
3. Implement proper validation
4. Thêm error handling tốt hơn
5. Thêm rate limiting
6. Implement proper JWT verification
7. Thêm logging
8. Deploy lên server

## Support

Nếu có vấn đề gì, hãy check lại:

- Port 3000 có sẵn không?
- Node.js đã được cài đặt?
- Dependencies đã được cài đặt chưa (npm install)?
- Frontend .env có đúng API URL không? (`http://localhost:3000/api`)
