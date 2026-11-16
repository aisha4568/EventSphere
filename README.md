# EventSphere – MERN Expo & Event Management System

Pakistan's premier platform for professional expos, conferences & exhibitions.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Backend Setup
```bash
cd backend
cp .env.example .env      # Edit with your MongoDB URI + JWT secret
npm install
npm run seed              # ⚠️ This wipes existing data + seeds Pakistani sample data
npm run dev               # Runs on http://localhost:5000