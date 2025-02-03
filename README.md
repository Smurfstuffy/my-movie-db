# 🎮 Movie App

A **full-stack movie management app** built with **React (Vite + TypeScript) & Express (Node.js + MongoDB Atlas)**.

## 🚀 Features
- Add, edit, delete movies
- Search & filter movies by genres, rating, and release year
- Mark movies as favorites
- Pagination support

---

## 🛠️ Tech Stack
**Frontend:** React (Vite + TypeScript), Tailwind CSS, Redux Toolkit  
**Backend:** Node.js, Express, MongoDB (Mongoose)
**Deployment:** Render (Client + Server)

---

## 🏰️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Smurfstuffy/my-movie-db.git
cd my-movie-db
```

### 2️⃣ Set Up the Backend (Server)
#### 🔹 Install Dependencies
```bash
cd server
npm install
```

#### 🔹 Create `.env` File
Copy `.env.example` to `.env`
```bash
cp .env.example .env  
```
**⚠️ Note:** Use the MongoDB Atlas connection string in MONGO_URL (provided separately).

#### 🔹 Run the Server
```bash
npm run dev
```
_Server will start at **http://localhost:4000**_

---

### 3️⃣ Set Up the Frontend (Client)
#### 🔹 Install Dependencies
```bash
cd ../client
npm install
```

#### 🔹 Create `.env.development` File
Copy `.env.example` to `.env.development`
```bash
cp .env.example .env.development 
```

#### 🔹 Run the Client
```bash
npm run dev
```
_Client will start at **http://localhost:5173**_
