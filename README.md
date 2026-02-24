 Learning Management System (LMS)

Overview

A full‑stack Learning Management System built with:

Backend: Node.js, Express, Mongoose (MongoDB)

Frontend: React + Vite

Authentication: JWT/session based

Features: User roles (Admin, Teacher, Student), course management, enrollment, reporting, and payment integration (planned).

🚀 Getting Started

Prerequisites

Node.js (v18+ recommended)

MongoDB (local or Atlas)

Git

Installation

# Clone the repo
git clone https://github.com/mahaknanotechsoftwares/LMS.git

# Navigate to backend
cd LMS/backend
npm install

# Navigate to frontend
cd ../frontend
npm install

Environment Variables

Create .env files in both backend and frontend:

Backend .env.example

PORT=5000
MONGO_URI=mongodb://localhost:27017/lms
JWT_SECRET=your_secret_key
PAYMENT_API_KEY=your_payment_key

Frontend .env.example

VITE_API_URL=http://localhost:5000/api

🛠️ Running the Project

# Start backend
cd backend
npm run dev

# Start frontend
cd frontend
npm run dev

Backend runs on http://localhost:5000Frontend runs on http://localhost:5173

📑 API Documentation

Postman collection available in /docs/postman_collection.json

Swagger/OpenAPI planned for future release

👥 Contribution Guidelines

Branch naming: feature/<name>, fix/<name>

Commit messages: use conventional commits (feat:, fix:, docs:)

Pull requests must include description + screenshots if UI changes

✅ Roadmap

Basic backend setup (Express, Mongoose)

Authentication (JWT)

Role-based access control

Course management APIs

Frontend integration (React + Vite)

Payment gateway integration

Reporting & analytics

CI/CD with GitHub Actions