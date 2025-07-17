## 📁 Project Folder Structure

```
feedback-collection-platform/
│
├── backend/                      # Backend code (Node.js + Express)
│   ├── controllers/             # Route handler logic
│   ├── middleware/              # Custom middlewares (e.g., auth, error handling)
│   ├── models/                  # Mongoose schemas and models
│   ├── routes/                  # API route definitions
│   ├── utils/                   # Utility/helper functions
│   ├── .env.example             # Sample environment variables
│   ├── server.js                # Entry point for the backend server
│   └── package.json             # Backend dependencies and scripts
│
└── frontend/                    # Frontend code (Next.js + Tailwind CSS)
    ├── app/                     # App directory with routes and pages
    │   ├── dashboard/           # Dashboard interface
    │   ├── form/                # Feedback form logic and UI
    │   ├── f/                   # (Temporary folder or unused – consider cleanup)
    │   ├── login/               # Login page
    │   ├── register/            # Registration page
    │   ├── layout.jsx           # Root layout for Next.js
    │   ├── page.jsx             # Main landing page
    │   └── globals.css          # Global styles
    ├── components/              # Reusable UI components
    ├── context/                 # React context for state management
    ├── package.json             # Frontend dependencies
    ├── tailwind.config.js       # Tailwind CSS configuration
    └── postcss.config.js        # PostCSS configuration
```


---

## ⚙️ Getting Started

### 1. **Clone the Repository**

```sh
git clone https://github.com/pritamchaudhary/feedback-collection-platform.git
cd feedback-collection-platform
```

### 2. **Backend Setup**

```sh
cd backend
cp .env.example .env   # Fill in your MongoDB URI and JWT secret
npm install
npm run dev            # Starts backend on http://localhost:5000
```

### 3. **Frontend Setup**

```sh
cd ../frontend
npm install
npm run dev            # Starts frontend on http://localhost:3000
```

---

## 📝 Usage

- **Register** as an admin and log in.
- **Create a new feedback form** (3-5 questions, text or MCQ).
- **Share the public link** with your customers.
- **Users submit feedback** (no login required).
- **View responses** in your dashboard (table and summary).
- **Export responses as CSV** for further analysis.

---

## 🧩 Design Decisions

- **JWT Auth** for secure admin access.
- **Public forms** for frictionless user feedback.
- **Flexible data models** for customizable questions.
- **Modern, responsive UI** with Tailwind CSS.
- **Clear user feedback** for all actions (login, logout, errors).

---

## 🛡️ Security & Edge Cases

- Passwords are hashed with bcryptjs.
- All admin routes are protected with JWT.
- Form/question/option validation on both frontend and backend.
- Handles empty states (no forms, no responses).
- Error messages for invalid login, missing fields, etc.

---

## 📄 License

MIT

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [nanoid](https://github.com/ai/nanoid)
- [json2csv](https://github.com/zemirco/json2csv)

---

> **Built with ❤️ and modern web technologies.**
