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
