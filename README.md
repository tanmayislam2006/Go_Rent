# 🚗 Go Rent Server

Welcome to the backend server for **Go Rent**, a modern and efficient vehicle rental platform. This API powers the Go Rent application, handling everything from user authentication to vehicle fleet management and booking coordination.

**🌐 Live Server:** [https://go-rent-server.vercel.app](https://go-rent-server.vercel.app)

---

## ✨ Features

The Go Rent Server provides a robust RESTful API designed with role-based access control to ensure secure and organized operations.

### 🔐 Authentication
Secure user access management using JWT.
- **Sign Up:** Register new users seamlessly.
- **Sign In:** Authenticate users and issue secure access tokens.

### 🚙 Vehicle Management
Comprehensive fleet control for administrators and easy browsing for customers.
- **Browse Fleet:** Public access to view all available vehicles and their details.
- **Fleet Admin:** Administrators can **Add**, **Update**, and **Remove** vehicles from the system.

### 📅 Booking System
Streamlined reservation process.
- **Book a Ride:** Customers can easily book their desired vehicles.
- **Manage Bookings:** Both Admins and Customers can view and update booking statuses.

### 👥 User Administration
Tools for managing the user base (Admin only).
- **User Overview:** View all registered users.
- **Account Management:** Update user roles or profile data.
- **User Removal:** Remove accounts when necessary.

---

## 🛠️ Technology Stack

Built with modern, scalable technologies:

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM/Driver:** [node-postgres (pg)](https://node-postgres.com/)
- **Authentication:** [JWT](https://jwt.io/) & [Bcrypt](https://www.npmjs.com/package/bcryptjs)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Setup & Usage Instructions

Follow these steps to get the server running on your local machine.

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14 or higher)
- **PostgreSQL** database

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd go-rent-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file in the root directory. Add the following variables with your specific configuration:

```env
PORT=5000
CONNECTION_STR=postgresql://<username>:<password>@localhost:5432/<database_name>
ACCESS_TOKEN_SECRET=<your_secure_jwt_secret>
```

### 4. Run the Server

Start the development server with hot-reloading:

```bash
npm start
```
The server will launch at `http://localhost:5000`.

### 5. Build for Production

Compile the TypeScript code to JavaScript:

```bash
npm run build
```

---

## 📡 API Endpoints Overview

| Module | Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/v1/auth/signup` | Register new user | Public |
| | `POST` | `/api/v1/auth/signin` | Login user | Public |
| **Vehicles** | `GET` | `/api/v1/vehicles` | List all vehicles | Public |
| | `GET` | `/api/v1/vehicles/:id` | Get vehicle details | Public |
| | `POST` | `/api/v1/vehicles` | Create vehicle | Admin |
| | `PUT` | `/api/v1/vehicles/:id` | Update vehicle | Admin |
| | `DELETE` | `/api/v1/vehicles/:id` | Delete vehicle | Admin |
| **Bookings** | `GET` | `/api/v1/bookings` | Get bookings | Auth |
| | `POST` | `/api/v1/bookings` | Create booking | Auth |
| | `PUT` | `/api/v1/bookings/:id` | Update booking | Auth |
| **Users** | `GET` | `/api/v1/users` | List all users | Admin |
| | `PUT` | `/api/v1/users/:id` | Update user | Admin |
| | `DELETE` | `/api/v1/users/:id` | Delete user | Admin |

---

Made with ❤️ by the Go Rent Team.
