# 💰 Personal Expense Tracker (Full-Stack MERN)

A full-stack personal expense tracker built using **React**, **Node.js**, **Express**, and **MongoDB**.  
The application is designed to handle real-world scenarios like **network retries, page refreshes, idempotent APIs**, filtering, sorting, pagination, and validations.

---

## 🚀 Features

### Backend
- POST `/expenses` – Create a new expense (idempotent)
- GET `/expenses` – Fetch expenses
  - Filter by category
  - Sort by date (newest first)
- Prevents duplicate entries on request retries
- Input validation (amount, category, date required)
- DAO → Service → Controller architecture
- MongoDB persistence using Mongoose

### Frontend
- Add expenses using a form
- Expense list with:
  - Category filter
  - Date sorting
  - Pagination (20 items per page)
- Displays total of visible expenses
- Loading & error states
- Clean UI using manual CSS
- Environment-based API configuration

---

## 🧱 Tech Stack

**Frontend**
- React
- CSS
- Axios

**Backend**
- Node.js
- Express
- MongoDB
- Mongoose
- ES Modules
- Jest + Supertest

**Deployment**
- Render
- MongoDB Atlas

---



---

## 🔁 API Idempotency

To safely handle retries caused by slow networks or page refreshes:

- The frontend generates a unique `expenseId`
- The backend checks if an expense with the same `expenseId` already exists
- If it exists, the API returns the existing record instead of creating a duplicate

This ensures:
- No duplicate expenses
- Safe request retries
- Stable user experience

---

## 🔗 API Endpoints

### Create Expense


POST /expenses


**Request Body**
```json
{
  "expenseId": "uuid",
  "amount": 250,
  "category": "Food",
  "description": "Lunch",
  "date": "2026-02-01"
}

Get Expenses
GET /expenses?category=Food&sort=datedesc


⚙️ Environment Variables
Backend (back-end/.env)
MONGO_URI=your_mongodb_connection_string
PORT=5000

Frontend (front-end/.env)
REACT_APP_API_URL=https://your-backend.onrender.com/expenses

🌍 Deployment (Render)
Backend

Type: Web Service

Root Directory: back-end

Build Command: npm install

Start Command: npm run start

Frontend

Type: Static Site

Root Directory: front-end

Build Command: npm install && npm run build

Publish Directory: build

📌 Future Enhancements

Authentication (JWT)

Monthly expense analytics

Charts & insights

CSV export

Mobile-first UI

👨‍💻 Author

Anand Vyas


---
