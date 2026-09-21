# Việc cần làm - Lesson 5

Ứng dụng Todo List được xây dựng bằng React, Hooks, PropTypes và Tailwind CSS. Ứng dụng hỗ trợ thêm, hoàn thành, xóa, lọc, tìm kiếm và lưu công việc vào `localStorage`.

## Chạy dự án

Yêu cầu Node.js 20+ và npm.

```bash
npm install
npm start
```

Mở `http://localhost:3000`. Các lệnh khác:

```bash
npm run test:ci
npm run build
```

## Tính năng

- Thêm công việc, từ chối nội dung trống và hiển thị lỗi accessible.
- Đánh dấu hoàn thành bằng checkbox, xóa từng công việc hoặc xóa tất cả có xác nhận.
- Lọc theo Tất cả, Chưa xong và Đã xong.
- Tìm kiếm theo thời gian thực, không phân biệt chữ hoa/thường.
- Thống kê tổng số, chưa xong và đã xong.
- Tải/lưu dữ liệu qua `localStorage` với xử lý JSON hỏng và lỗi storage.
- Dark mode có lưu lựa chọn.
- Responsive từ màn hình 320px đến desktop.
- Label, ARIA, live region, focus-visible và touch target cho keyboard/screen reader.

## Cấu trúc

```text
src/
├── App.jsx                 # State và luồng nghiệp vụ chính
├── App.test.jsx            # Test hành vi chính
├── index.css               # Tailwind và global styles
├── utils.js                # localStorage và tạo ID
└── components/
    ├── FilterBar.jsx
    ├── SearchBar.jsx
    ├── Stats.jsx
    ├── TodoItem.jsx
    └── TodoList.jsx
```

## Bốn lần lặp

1. **Scaffolding:** tạo App, TodoList, TodoItem, checkbox, delete và PropTypes.
2. **Interactivity:** thêm form, validation, filter, search, statistics và empty states.
3. **Styling:** chuyển giao diện sang Tailwind với responsive layout, màu sắc, typography và focus states.
4. **Polish:** thêm localStorage guard, loading state, dark mode, ARIA, test và quy trình deploy.

## Deploy qua GitHub Actions và Vercel

1. Tạo repository GitHub mới và push toàn bộ thư mục `todo-app`.
2. Trên Vercel, chọn **New Project > Import Git Repository**, chọn repository và tạo project.
3. Trong Vercel project, lấy `Project ID`; trong phần Team lấy `Team ID`/Organization ID.
4. Tạo Vercel token tại **Account Settings > Tokens**.
5. Vào GitHub repository: **Settings > Secrets and variables > Actions > New repository secret** và thêm:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
6. Push vào branch `main` hoặc chạy workflow `Test and Deploy Todo App` bằng **Run workflow**.

Workflow tại `.github/workflows/deploy.yml` sẽ chạy test, build và deploy production. Không commit token hoặc file `.env` thật.

## Công nghệ

React 18, React Hooks, PropTypes, Tailwind CSS v3, Create React App, Testing Library, localStorage, GitHub Actions và Vercel.

## Hỗ trợ AI

AI hỗ trợ tạo scaffold, tách component, đề xuất ARIA, viết test và thiết lập CI/CD. Mọi phần vẫn cần kiểm tra thủ công vì AI không tự xác nhận được contrast, hành vi trình duyệt, responsive thực tế hoặc cấu hình secrets của tài khoản.
