# RentHub – Property & Room Rental Management System

![RentHub Banner](https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=400&fit=crop)

A production-ready full-stack web application for property and room rental management, connecting landlords and tenants seamlessly.

## 🚀 Features

### For Tenants
- 🔍 **Advanced Search** – Filter rooms by city, rent range, room type
- 📋 **Booking System** – Send booking requests to landlords
- 💳 **Payment Tracking** – View rent payment history
- 📊 **Dashboard** – Manage bookings and active rentals

### For Landlords
- 🏠 **Property Management** – Add/edit/delete properties and rooms
- 📝 **Booking Management** – Approve or reject tenant requests
- 💰 **Rent Tracking** – Record and confirm payments
- 🔔 **Notifications** – Get alerts for new bookings

### General
- 🔐 **Secure Authentication** – JWT-based login with role-based access
- 📱 **Responsive Design** – Works on desktop, tablet, and mobile
- 🎨 **Modern UI** – Glassmorphism design with Tailwind CSS

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js + Vite, Tailwind CSS, React Router |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB + Mongoose |
| **Auth** | JWT + bcrypt |
| **API** | RESTful Architecture |

---

## 📁 Project Structure

```
renthub/
├── server/                 # Backend
│   ├── config/            # DB connection
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Auth, error handling
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── seed/              # Sample data
│   └── server.js          # Entry point
│
├── client/                 # Frontend
│   ├── src/
│   │   ├── api/           # Axios client
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Auth context
│   │   ├── pages/         # Page components
│   │   └── routes/        # Protected routes
│   └── index.html
│
└── README.md
```

---

## 🚦 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/renthub.git
cd renthub

# 2. Install backend dependencies
cd server
npm install

# 3. Install frontend dependencies
cd ../client
npm install

# 4. Configure environment variables
# Server: Copy server/.env.example to server/.env
cp ../server/.env.example ../server/.env

# 5. Seed the database with sample data
cd ../server
npm run seed

# 6. Start the application
# Terminal 1: Start backend
cd server
npm run dev

# Terminal 2: Start frontend
cd client
npm run dev
```

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

---

## 👥 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@renthub.com | admin123 |
| Landlord | rajesh@landlord.com | landlord123 |
| Landlord | priya@landlord.com | landlord123 |
| Tenant | amit@tenant.com | tenant123 |
| Tenant | sneha@tenant.com | tenant123 |

---

## 📚 API Documentation

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Properties
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | List all properties |
| POST | `/api/properties` | Create property (Landlord) |
| GET | `/api/properties/:id` | Get property details |

### Rooms
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/rooms` | List vacant rooms with filters |
| POST | `/api/rooms` | Create room (Landlord) |
| GET | `/api/rooms/:id` | Get room details |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Create booking request |
| PUT | `/api/bookings/:id/approve` | Approve booking (Landlord) |
| PUT | `/api/bookings/:id/reject` | Reject booking (Landlord) |

---

## 🎨 Screenshots

### Home Page
Modern landing page with search functionality and feature highlights.

### Tenant Dashboard
View active rentals, pending bookings, and find new rooms.

### Landlord Dashboard
Manage properties, rooms, and tenant booking requests.

---

## 🔮 Future Scope

1. **Real Payment Gateway** – Razorpay/Stripe integration
2. **Document Management** – Rental agreement uploads
3. **Video Tours** – Virtual property tours
4. **Chat System** – Real-time messaging
5. **Reviews & Ratings** – Tenant reviews for properties
6. **Mobile App** – React Native companion app
7. **AI Recommendations** – ML-based property suggestions

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Built with ❤️ for university evaluation and portfolio showcase.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
