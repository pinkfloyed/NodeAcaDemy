# 🎓 NodeAcademy - Student Management System

A simple web application to manage student records with authentication and role-based access control. Built with **Node.js**, **Express**, and **Vanilla JavaScript** on the frontend. Admins can create, update, delete, and view students, while viewers can only view.

---

## 🚀 Features

- 🔐 User registration and login with JWT-based authentication
- 🛡️ Role-based access:
  - **Admin**: Full CRUD access to student records
  - **Viewer**: Read-only access
- ➕ Add, ✏️ edit, 🗑️ delete single or all students
- 🔍 Search, 🔢 sort, and 📄 pagination for student list
- 📱 Responsive UI built with **Bootstrap 5**

---

## 📂 Project Structure

```text
NODEACADEMY/
│
├── backend/
│   ├── middleware/          # Middleware functions (e.g., auth check)
│   │   └── authMiddleware.js
│   │   └── roleMiddleware.js    
│   ├── models/              # MongoDB Mongoose models
│   │   ├── Student.js
│   │   └── User.js          
│   ├── routes/              # API route handlers
│   │   ├── studentRoutes.js
│   │   └── authRoutes.js        
│   ├── .env                 # Environment variables (Mongo URI, port, etc.)
│   └── server.js            # Express server entry point
│
├── frontend/
│   ├── 404.html             # Not found page
│   ├── auth.js              # JS for auth/login/register
│   ├── index.html           # Dashboard/home page
│   ├── login.html           # Login page
│   ├── main.js              # Dashboard JS logic
│   ├── register.html        # Registration page
│   ├── register.js          # JS for registration
│   └── style.css            # Shared CSS
│
├── node_modules/            
├── package.json             
├── package-lock.json        
├── .gitignore
├── README.md
└── LICENSE
```


---

## ⚡ Getting Started

### 🛠️ Prerequisites

- Node.js (v14+ recommended)
- npm
- 🌐 MongoDB Atlas account

### 📥 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/NodeAcademy.git
cd NodeAcademy
```
2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in backend/.env:
```text
MONGO_URI=<your-mongodb-atlas-connection-string>
PORT=5000
JWT_SECRET=<your-secret-key>
```

🔑 Make sure to replace <your-mongodb-atlas-connection-string> with the connection string from your MongoDB Atlas cluster.

4. Start the backend server (make sure you have server.js or your backend setup running):
```bash
npm start
```
5. Open index.html in your browser (or serve it via a local server).

---

## 🎮 Usage

- Register a new user at `register.html`.
- Login using the registered credentials at `login.html`.

**Admin users can:**
- ➕ Add new students
- ✏️ Edit existing students
- 🗑️ Delete single or all students

**Viewer users can only:**
- 👀 View student records

- 🔍 Search, 🔢 sort, and 📄 paginate through the list

---

## 🛠️ API Endpoints

> Assumes backend runs on `http://localhost:5000`

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /students` - Get list of students
- `POST /students` - Add a new student (admin only)
- `PUT /students/:id` - Update a student (admin only)
- `DELETE /students/:id` - Delete a student (admin only)
- `DELETE /students` - Delete all students (admin only)

---

## 🖥️ Frontend Features

- **🔐 Authentication**: JWT stored in `localStorage`
- **🛡️ Role-based UI**: Hide or show buttons based on user role
- **🔍 Search and Sort**: Real-time filtering of students
- **📄 Pagination**: 5 students per page
- **💬 Alerts**: Success or error messages displayed dynamically

---

## 🛠️ Technologies Used

- HTML, CSS, JavaScript
- Bootstrap 5
- Fetch API for HTTP requests
- Node.js / Express (backend)

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "feat: description"`
4. Push to the branch: `git push origin feature-name`
5. Create a Pull Request

---

## 📄 License

This project is licensed under the MIT License.


