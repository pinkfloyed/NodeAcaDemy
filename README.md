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

**1. Clone the repository :**

```bash
git clone https://github.com/your-username/NodeAcademy.git
cd NodeAcademy
```
**2. Install dependencies :**
```bash
npm install
```

**3. Configure environment variables in backend/.env :**
```text
MONGO_URI=<your-mongodb-atlas-connection-string>
PORT=5000
JWT_SECRET=<your-secret-key>
```

🔑 Make sure to replace <your-mongodb-atlas-connection-string> with the connection string from your MongoDB Atlas cluster.

**4. Start the backend server (make sure you have server.js or your backend setup running) :**
```bash
npm start
```
**5. Open index.html in your browser (or serve it via a local server)**

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

## 🖥️ Screenshots 

<img width="629" height="494" alt="nodereg" src="https://github.com/user-attachments/assets/c9b83168-658b-495a-bfde-3b07181dd48c" />

**Figure 1 : User Registration Page**

<img width="634" height="497" alt="nodelog" src="https://github.com/user-attachments/assets/f94e2e52-da61-4141-b11d-1b237da9fbca" />

**Figure 2 : User Login Page**

<img width="1235" height="556" alt="node1" src="https://github.com/user-attachments/assets/ec24634d-1975-4d64-84d1-1484b394552c" />

**Figure 3 : Dashboard displayed after successful login**

<img width="1220" height="574" alt="node2" src="https://github.com/user-attachments/assets/e5e607f9-ad3f-4d01-a56b-9a6a93c06279" />

**Figure 4 : Admin – Add Student Information**

<img width="1247" height="631" alt="node3" src="https://github.com/user-attachments/assets/d37006ac-7150-4dd1-8818-b5bd00594aa5" />

**Figure 5 : Admin – View Student Information List**

<img width="1226" height="616" alt="node4" src="https://github.com/user-attachments/assets/b69b0c02-5aec-439a-ae81-c9cd7c2d0b59" />

**Figure 6 : Admin – Update Student Information**

<img width="1250" height="603" alt="node7" src="https://github.com/user-attachments/assets/9fc9b779-d830-415d-bb07-a3b456a97b01" />
<img width="1235" height="585" alt="node6" src="https://github.com/user-attachments/assets/aaf7de05-f85c-4a6e-b942-4f944cfe4da6" />

**Figure 7 : Admin – Delete Student Information**

<img width="1218" height="587" alt="node5" src="https://github.com/user-attachments/assets/379ef641-6cc2-4d49-8c3e-b17fa7e9e12b" />

**Figure 8 : User – Filter by Name (Ascending) order**

<img width="964" height="494" alt="nodedec" src="https://github.com/user-attachments/assets/9dc1193a-473d-49d5-9917-a2cb357b31c1" />

**Figure 9 : User – Search by Email (Ascending/Descending) order**

<img width="1365" height="608" alt="nodeview" src="https://github.com/user-attachments/assets/b015a16b-6bc6-4a8e-82f4-0e69ce6060c9" />

**Figure 10 : Viewer – Search and View Student Information**

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


