# LandMark Real Estate — Full Stack Web App

A complete real estate management system for buying and selling plots/land.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (free) for image uploads

---

## ⚙️ Backend Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` with your values:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/realestate
JWT_SECRET=any_random_secret_string_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_EMAIL=admin@yourbusiness.com
ADMIN_PASSWORD=YourPassword123
```

Start the server:
```bash
npm run dev
```

**First time only** — create the admin account:
```
POST http://localhost:5000/api/auth/setup
```
(Run this once from Postman or browser, then it's disabled)

---

## 🎨 Frontend Setup

```bash
cd client
npm install
npm start
```

The React app runs on **http://localhost:3000**

---

## 📁 Project Structure

```
real-estate-project/
│
├── server/
│   ├── models/          # MongoDB schemas (Plot, Customer, Admin)
│   ├── controllers/     # Business logic
│   ├── routes/          # API endpoints
│   ├── middleware/       # Auth & file upload
│   └── index.js         # Entry point
│
└── client/
    └── src/
        ├── pages/
        │   ├── Home.js
        │   ├── Plots.js
        │   ├── PlotDetail.js
        │   ├── Contact.js
        │   └── admin/
        │       ├── AdminLogin.js
        │       ├── AdminDashboard.js
        │       ├── AdminPlots.js
        │       ├── AdminPlotForm.js
        │       └── AdminCustomers.js
        ├── components/   # Navbar, Footer, PlotCard, AdminLayout
        ├── context/      # Auth state
        └── utils/        # Axios API instance
```

---

## 🌐 Pages

### Public (Customer-facing)
| Page | URL |
|------|-----|
| Home | `/` |
| All Plots | `/plots` |
| Plot Detail | `/plots/:id` |
| Contact | `/contact` |

### Admin (Password protected)
| Page | URL |
|------|-----|
| Login | `/admin/login` |
| Dashboard | `/admin` |
| Manage Plots | `/admin/plots` |
| Add Plot | `/admin/plots/new` |
| Edit Plot | `/admin/plots/edit/:id` |
| Customers | `/admin/customers` |

---

## 🔌 API Endpoints

### Auth
```
POST /api/auth/setup     → Create first admin (run once)
POST /api/auth/login     → Login → returns JWT token
GET  /api/auth/me        → Get logged-in admin info
```

### Plots (Public)
```
GET  /api/plots           → All plots (with ?search= ?status= ?type= filters)
GET  /api/plots/:id       → Single plot
```

### Plots (Admin)
```
POST   /api/plots         → Add plot (with images)
PUT    /api/plots/:id     → Edit plot
DELETE /api/plots/:id     → Delete plot
GET    /api/plots/stats/summary → Dashboard stats
```

### Customers (Admin only)
```
GET    /api/customers     → All customers
GET    /api/customers/:id → Single customer
POST   /api/customers     → Add customer
PUT    /api/customers/:id → Update customer
DELETE /api/customers/:id → Delete customer
```

---

## 🔮 Future Features (V2)
- Google Maps integration
- WhatsApp auto-reply bot
- Site visit booking system
- OTP login for customers
- Price trend charts
- PDF brochure generation

---

## 🛠 Tech Stack
- **Frontend**: React, React Router, Axios, react-hot-toast
- **Backend**: Node.js, Express
- **Database**: MongoDB + Mongoose
- **Auth**: JWT
- **Images**: Cloudinary + Multer
- **Fonts**: Cormorant Garamond + DM Sans (Google Fonts)
